
'use client';

import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit, Firestore } from 'firebase/firestore';
import { Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

/**
 * @fileOverview Displays a list of recent task activities for the user.
 * Shows status (Pending/Verified) and reward details.
 */

interface TaskHistoryProps {
  userId: string;
  firestore: Firestore;
}

export function TaskHistory({ userId, firestore }: TaskHistoryProps) {
  // Memoize the query for task completions
  const historyQuery = useMemoFirebase(() => {
    if (!firestore || !userId) return null;
    return query(
      collection(firestore, 'users', userId, 'taskCompletions'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [firestore, userId]);

  const { data: tasks, isLoading } = useCollection(historyQuery);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-card rounded-[2rem] p-12 text-center border-white/5 border-dashed">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No recent activity found</p>
        <p className="text-muted-foreground text-xs mt-2">Start a task above to see your progress here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const dateStr = task.createdAt 
          ? format(task.createdAt.toDate ? task.createdAt.toDate() : new Date(task.createdAt), 'MMM dd, HH:mm') 
          : 'Just now';

        return (
          <div 
            key={task.id}
            className="glass-card bg-[#0a0a0a] border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                task.status === 'Verified' 
                  ? "bg-green-500/10 border-green-500/20 text-green-500" 
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
              )}>
                {task.status === 'Verified' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white truncate uppercase tracking-tight text-sm">
                  {task.title || 'Untitled Task'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-white/40 font-bold uppercase">{dateStr}</span>
                  <span className="w-1 h-1 bg-white/10 rounded-full" />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    task.status === 'Verified' ? "text-green-500" : "text-yellow-500"
                  )}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className={cn(
                "text-lg font-black tabular-nums",
                task.status === 'Verified' ? "text-green-500" : "text-white/20"
              )}>
                {task.rewardAmount > 0 ? `+$${task.rewardAmount.toFixed(2)}` : '$0.00'}
              </p>
              <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">
                {task.status === 'Verified' ? 'Added' : 'Pending'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
