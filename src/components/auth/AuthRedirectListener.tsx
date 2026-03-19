'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * Handles Firebase Auth redirect results and ensures user profile exists in Firestore.
 * Performs automatic country detection and email synchronization.
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

          // Geolocation Detection
          let detectedCountry = 'Unknown';
          try {
            const geoRes = await fetch('https://ipapi.co/json/');
            const geoData = await geoRes.json();
            detectedCountry = geoData.country_name || 'Unknown';
          } catch (geoError) {
            console.warn("Geolocation API failed, defaulting to Unknown.");
          }

          // Email extraction
          const loginEmail = user.email || '';
          const defaultUsername = loginEmail.split('@')[0] || `player_${user.uid.slice(0, 5)}`;

          // Initialize user document if it doesn't exist
          if (!userSnap.exists()) {
            setDocumentNonBlocking(userRef, {
              id: user.uid,
              email: loginEmail,
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp(),
              balance: 0,
              totalEarnings: 0,
              pendingEarnings: 0,
              totalReferrals: 0,
              accountStatus: 'active',
              username: defaultUsername,
              country: detectedCountry,
              paypalEmail: loginEmail, // Automatically set to login email
              isAdmin: false
            }, { merge: true });
          } else {
            // Update email and country if they are missing or "Unknown"
            const existingData = userSnap.data();
            const updates: any = {};
            
            if (!existingData.email && loginEmail) updates.email = loginEmail;
            if (!existingData.country || existingData.country === 'Unknown') updates.country = detectedCountry;
            if (!existingData.paypalEmail && loginEmail) updates.paypalEmail = loginEmail;
            
            if (Object.keys(updates).length > 0) {
              setDocumentNonBlocking(userRef, updates, { merge: true });
            }
          }
          
          toast({ 
            title: `Session Synchronized`, 
            description: "Your rewards profile is ready." 
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