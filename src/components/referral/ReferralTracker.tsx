'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Background tracker for referral clicks.
 * Handled gracefully to prevent guest users from seeing permission errors.
 */
function ReferralTrackerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    // Save current referral ID to localStorage for signup association later
    localStorage.setItem('referralId', ref);
    
    // Optional: Log tracking hit locally
    console.log("Referral captured:", ref);
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