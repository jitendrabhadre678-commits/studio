
'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * Handles Firebase Auth redirect results and ensures user profile exists in Firestore.
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
              offersCompleted: 0,
              rewardsUnlocked: 0,
              accountStatus: 'active',
              username: '',
              preferredGiftCard: ''
            }, { merge: true });
          }
          
          toast({ 
            title: `Identity Verified`, 
            description: "Session successfully synchronized." 
          });
        }
      } catch (error: any) {
        console.error("Auth Listener Error:", error);
      }
    };

    handleRedirect();
  }, [auth, db, toast, router]);

  return null;
}
