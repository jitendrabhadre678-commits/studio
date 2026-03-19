'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirestore, setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { doc, increment, serverTimestamp, getDoc } from 'firebase/firestore';

/**
 * @fileOverview Background tracker for referral clicks.
 * Handled gracefully to prevent guest users from seeing permission errors.
 */

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
          // Check existence first to choose set vs update
          const docSnap = await getDoc(referralRef);
          
          if (docSnap.exists()) {
            updateDocumentNonBlocking(referralRef, {
              clicks: increment(1),
              lastUpdated: serverTimestamp()
            });
          } else {
            setDocumentNonBlocking(referralRef, {
              referrerId: ref,
              clicks: 1,
              lastUpdated: serverTimestamp()
            }, { merge: true });
          }
          
          // Prevent multiple counts from same device for this specific referrer
          localStorage.setItem(`refCounted_${ref}`, 'true');
        } catch (serverError: any) {
          // Background task error - handled silently to avoid disrupting visitor experience
          console.warn("Referral tracking background sync paused:", serverError.message);
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
