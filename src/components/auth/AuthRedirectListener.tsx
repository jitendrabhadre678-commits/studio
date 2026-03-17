'use client';

import { useEffect, useRef } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

/**
 * An invisible component that listens for results from a Firebase auth redirect.
 * It ensures the user profile is created/verified upon returning from Google Login.
 */
export function AuthRedirectListener() {
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!auth || !db || hasProcessed.current) return;

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          hasProcessed.current = true;
          const user = result.user;
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          // Ensure profile exists with all required fields from backend.json
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
            title: "Welcome to GameFlashX!", 
            description: "Successfully logged in with Google." 
          });
          
          router.push('/dashboard');
        }
      } catch (error: any) {
        // Only log/show errors that aren't the user closing the flow
        if (error.code !== 'auth/popup-closed-by-user') {
          console.error("Auth Redirect Error:", error);
          toast({ 
            variant: "destructive", 
            title: "Login Failed", 
            description: error.message 
          });
        }
      }
    };

    handleRedirectResult();
  }, [auth, db, router, toast]);

  return null;
}
