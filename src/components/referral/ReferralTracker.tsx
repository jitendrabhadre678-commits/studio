
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * @fileOverview Background tracker for referral clicks.
 * Captures ?ref from the URL and stores it for the signup flow.
 */
function ReferralTrackerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    // Save current referral code to localStorage
    localStorage.setItem('referralCode', ref);
    console.log("Referral Code Captured:", ref);
  }, [searchParams]);

  return null;
}

export function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <ReferralTrackerContent />
    </Suspense>
  );
}
