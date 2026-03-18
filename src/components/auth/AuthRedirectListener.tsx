'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Handles Firebase Auth redirect results and enforces mandatory username setup.
 */
export function AuthRedirectListener() {
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user = result.user;
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            setDocumentNonBlocking(userRef, {
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              balance: 0,
              totalEarnings: 0,
              offersCompleted: 0,
              accountStatus: 'active'
            }, { merge: true });
            
            router.push('/setup-username');
          } else {
            const data = userSnap.data();
            if (!data.username && pathname !== '/setup-username') {
              router.push('/setup-username');
            }
          }
          
          toast({ 
            title: `Welcome back! 👋`, 
            description: "Session successfully restored." 
          });
        }
      } catch (error: any) {
        console.error("Redirect Error:", error);
      }
    };

    handleRedirect();
  }, [auth, db, toast, router, pathname]);

  // Global username check guard
  useEffect(() => {
    const checkUsername = async () => {
      if (auth.currentUser && pathname !== '/setup-username' && pathname !== '/' && !pathname.startsWith('/blog') && !pathname.startsWith('/reviews')) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && !userSnap.data().username) {
          router.push('/setup-username');
        }
      }
    };
    checkUsername();
  }, [auth.currentUser, pathname, db, router]);

  return null;
}
