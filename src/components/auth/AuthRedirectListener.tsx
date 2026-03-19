
'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * Handles Firebase Auth redirect results and ensures user profile exists in Firestore.
 * Also performs automatic country detection via geolocation API.
 */
export function AuthRedirectListener() {
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        
        if (result?.user) {
          const user = result.user;
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          let detectedCountry = 'Unknown';
          try {
            const geoRes = await fetch('https://ipapi.co/json/');
            const geoData = await geoRes.json();
            detectedCountry = geoData.country_name || 'Unknown';
          } catch (geoError) {
            console.warn("Geolocation API failed, defaulting to Unknown.");
          }

          // Initialize user document if it doesn't exist
          if (!userSnap.exists()) {
            setDocumentNonBlocking(userRef, {
              id: user.uid,
              email: user.email,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp(),
              balance: 0,
              totalEarnings: 0,
              pendingEarnings: 0,
              totalReferrals: 0,
              accountStatus: 'active',
              username: user.email?.split('@')[0] || '',
              country: detectedCountry,
              paypalEmail: '',
              isAdmin: false
            }, { merge: true });
          } else {
            // Update country if missing or different (optional, keeps data fresh)
            const existingData = userSnap.data();
            if (!existingData.country || existingData.country === 'Unknown') {
              setDocumentNonBlocking(userRef, { country: detectedCountry }, { merge: true });
            }
          }
          
          toast({ 
            title: `Identity Verified`, 
            description: "Session successfully synchronized." 
          });
          
          router.push('/dashboard');
        }
      } catch (error: any) {
        console.error("Auth Listener Error:", error);
      }
    };

    handleRedirect();
  }, [auth, db, toast, router]);

  return null;
}
