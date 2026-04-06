
import { PageSkeleton } from '@/components/loading/PageSkeleton';

/**
 * @fileOverview Global loading handler for Next.js App Router.
 * Surfaces the premium GameFlashX skeleton during route transitions.
 */

export default function Loading() {
  return <PageSkeleton />;
}
