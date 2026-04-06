
'use client';

import { useEffect } from 'react';
import { useAuth, useFirestore, setDocumentNonBlocking, updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, increment, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Firebase Auth Redirect Handler.
 * Manages user profile creation and referral signup rewards.
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
            // 1. Create New Profile Data
            const referralCode = `GF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            const refCodeCaptured = localStorage.getItem('referralCode') || null;
            let referredByUserId = null;

            // 2. Logic: If referred, find the Referrer's UID
            if (refCodeCaptured) {
              const referrersRef = collection(db, 'users');
              const q = query(referrersRef, where('referralCode', '==', refCodeCaptured), limit(1));
              const refSnapshot = await getDocs(q);
              
              if (!refSnapshot.empty) {
                const referrerDoc = refSnapshot.docs[0];
                referredByUserId = referrerDoc.id;

                // 3. Logic: Pay Referrer Signup Bonus ($0.50)
                const SIGNUP_BONUS = 0.50;
                
                updateDocumentNonBlocking(referrerDoc.ref, {
                  availableBalance: increment(SIGNUP_BONUS),
                  referralEarnings: increment(SIGNUP_BONUS),
                  totalReferrals: increment(1),
                  updatedAt: serverTimestamp()
                });

                // Record the reward transaction
                addDocumentNonBlocking(collection(db, 'users', referredByUserId, 'rewards'), {
                  userId: referredByUserId,
                  amount: SIGNUP_BONUS,
                  description: `Referral Signup Bonus: ${defaultUsername}`,
                  type: 'referralSignupBonus',
                  status: 'completed',
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
                });
              }
            }

            // 4. Create User Document
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
              referredByUserId: referredByUserId,
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
