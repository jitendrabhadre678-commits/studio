
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, setDoc, updateDoc, increment, serverTimestamp, getDoc } from 'firebase/firestore';

function ReferralTrackerContent() {
  const searchParams = useSearchParams();
  const db = useFirestore();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref || !db) return;

    // Save current referral ID to localStorage for signup association later
    localStorage.setItem('referralId', ref);

    // Click tracking logic
    const refCounted = localStorage.getItem(`refCounted_${ref}`);
    
    if (!refCounted) {
      const trackClick = async () => {
        const referralRef = doc(db, 'referrals', ref);
        try {
          const docSnap = await getDoc(referralRef);
          
          if (docSnap.exists()) {
            await updateDoc(referralRef, {
              clicks: increment(1),
              lastUpdated: serverTimestamp()
            });
          } else {
            await setDoc(referralRef, {
              referrerId: ref,
              clicks: 1,
              lastUpdated: serverTimestamp()
            });
          }
          
          // Prevent multiple counts from same device for this specific referrer
          localStorage.setItem(`refCounted_${ref}`, 'true');
        } catch (error) {
          console.error("Referral tracking failed:", error);
        }
      };

      trackClick();
    }
  }, [searchParams, db]);

  return null;
}

export function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <ReferralTrackerContent />
    </Suspense>
  );
}
