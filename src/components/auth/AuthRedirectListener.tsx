'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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
          const userSnap = await getDoc(userRef);

          // If this is a new user, initialize their profile in Firestore
          if (!userSnap.exists()) {
            await setDoc(userRef, {
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
              accountStatus: 'active'
            }, { merge: true });
          }
          
          toast({ 
            title: `Welcome, ${user.displayName || user.email?.split('@')[0]}! 👋`, 
            description: "Successfully logged in with Google." 
          });
        }
      } catch (error: any) {
        // Ignore expected errors like when storage isn't available
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
