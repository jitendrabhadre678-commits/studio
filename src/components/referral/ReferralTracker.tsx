'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirestore, setDocumentNonBlocking, updateDocumentNonBlocking, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, increment, serverTimestamp, getDoc } from 'firebase/firestore';

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
          // Emit contextual permission error for better debugging
          const permissionError = new FirestorePermissionError({
            path: referralRef.path,
            operation: 'write'
          });
          errorEmitter.emit('permission-error', permissionError);
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
