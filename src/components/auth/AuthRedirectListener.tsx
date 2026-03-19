'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * Handles Firebase Auth redirect results and ensures user profile exists in Firestore.
 * Automatically generates referral codes and captures referredBy info.
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

          const loginEmail = user.email || '';
          const defaultUsername = loginEmail ? loginEmail.split('@')[0] : `player_${user.uid.slice(0, 5)}`;

          if (!userSnap.exists()) {
            const referralCode = `GF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            const referredBy = localStorage.getItem('referralId') || null;

            setDocumentNonBlocking(userRef, {
              id: user.uid,
              email: loginEmail,
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp(),
              availableBalance: 0,
              totalEarnings: 0,
              referralEarnings: 0,
              totalReferrals: 0,
              accountStatus: 'active',
              username: defaultUsername,
              paypalEmail: loginEmail,
              referralCode: referralCode,
              referredBy: referredBy,
              hasCompletedFirstTask: false,
              isAdmin: false,
              updatedAt: serverTimestamp()
            }, { merge: true });
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