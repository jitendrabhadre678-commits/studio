'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

/**
 * Handles the Firebase Auth redirect result when returning from Google login.
 */
export function AuthRedirectListener() {
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user = result.user;
          const userRef = doc(db, 'users', user.uid);
          
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            const referralId = typeof window !== 'undefined' ? localStorage.getItem('referralId') : null;
            const newUserCode = 'GFX-' + Math.random().toString(36).substring(2, 7).toUpperCase();

            setDocumentNonBlocking(userRef, {
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              balance: 0,
              totalEarnings: 0,
              offersCompleted: 0,
              rewardsUnlocked: 0,
              points: 0,
              referralsCount: 0,
              referralEarnings: 0,
              referralCode: newUserCode,
              referredBy: referralId || null,
              accountStatus: 'active'
            }, { merge: true });

            if (referralId && referralId !== user.uid) {
              const referrerRef = doc(db, 'users', referralId);
              getDoc(referrerRef).then(snap => {
                if (snap.exists()) {
                  updateDocumentNonBlocking(referrerRef, {
                    referralsCount: increment(1)
                  });
                }
              });
            }
          }
          
          toast({ 
            title: `Welcome, ${user.displayName || user.email?.split('@')[0]}! 👋`, 
            description: "Successfully logged in with Google." 
          });
        }
      } catch (error: any) {
        console.error("Redirect Error:", error);
      }
    };

    handleRedirect();
  }, [auth, db, toast]);

  return null;
}
