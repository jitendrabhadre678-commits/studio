'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

/**
 * Handles the Firebase Auth redirect result when returning from Google login.
 * This component should be mounted high in the tree (e.g., RootLayout).
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
          
          // Check if this is a new user
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            // Check for referral ID in localStorage
            const referralId = typeof window !== 'undefined' ? localStorage.getItem('referralId') : null;
            const newUserCode = 'GFX-' + Math.random().toString(36).substring(2, 7).toUpperCase();

            // Initialize profile (Non-blocking)
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

            // If referred, increment referrer's count (Non-blocking)
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
        if (error.code !== 'auth/web-storage-unsupported') {
           console.error("Auth redirect error:", error);
           toast({ 
             variant: "destructive", 
             title: "Authentication Error", 
             description: error.message 
           });
        }
      }
    };

    handleRedirect();
  }, [auth, db, toast]);

  return null;
}
