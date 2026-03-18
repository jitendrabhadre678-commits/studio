
'use client';

import { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle2, Loader2, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WithdrawalModalProps {
  balance: number;
  userRef: any;
  walletAddress?: string;
}

export function WithdrawalModal({ balance, userRef, walletAddress }: WithdrawalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const MIN_WITHDRAWAL = 10;
  const canWithdraw = balance >= MIN_WITHDRAWAL && !!walletAddress;

  const handleWithdraw = async () => {
    if (!canWithdraw || isProcessing || !firestore || !userRef) return;

    setIsProcessing(true);
    
    try {
      // 1. Create transaction record
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userRef.id,
        type: 'withdrawal',
        amount: balance,
        rewardName: `Crypto Withdrawal`,
        status: 'pending',
        walletAddress: walletAddress,
        createdAt: serverTimestamp()
      });

      // 2. Deduct balance immediately
      updateDocumentNonBlocking(userRef, {
        balance: 0,
        updatedAt: serverTimestamp()
      });

      setIsSuccess(true);
      toast({ 
        title: "Withdrawal Requested", 
        description: "Your funds are being processed and will arrive within 1-24 hours." 
      });
    } catch (e) {
      toast({ variant: "destructive", title: "Request Failed", description: "Could not process withdrawal. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => {
      setIsOpen(v);
      if (!v) {
        // Reset state after closing if it was successful
        setTimeout(() => setIsSuccess(false), 300);
      }
    }}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <Button 
            disabled={!canWithdraw}
            className={cn(
              "h-12 px-8 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl",
              canWithdraw 
                ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20" 
                : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
            )}
          >
            <Wallet className="w-4 h-4 mr-2" /> Withdraw
          </Button>
          {!canWithdraw && (
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
              {!walletAddress ? "Connect wallet to withdraw" : `Min. withdrawal $${MIN_WITHDRAWAL.toFixed(2)}`}
            </span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-[#020617] border-white/10 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
        <div className="p-10">
          {!isSuccess ? (
            <>
              <DialogHeader className="mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight text-center">
                  Confirm <span className="text-primary">Payout</span>
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground text-base mt-2">
                  Verify your withdrawal details before processing.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Amount</span>
                    <span className="text-xl font-black text-white">${balance.toFixed(2)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Destination Wallet</span>
                    <p className="text-xs font-mono text-primary break-all bg-primary/5 p-3 rounded-lg border border-primary/10">
                      {walletAddress}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                  <p className="text-[10px] text-yellow-500 font-bold leading-relaxed uppercase tracking-tight">
                    Payouts are processed within 1–24 hours. Most users receive their payout within 1 hour.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-14 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleWithdraw}
                    disabled={isProcessing}
                    className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payout"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6 animate-in zoom-in duration-300">
               <div className="w-24 h-24 bg-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                 <CheckCircle2 className="w-12 h-12 text-green-500" />
               </div>
               <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Request Sent!</h3>
               <p className="text-muted-foreground mb-10 leading-relaxed">
                 Your withdrawal of <span className="text-white font-bold">${balance.toFixed(2)}</span> is being processed. You can track the status in your activity log.
               </p>
               <Button onClick={() => setIsOpen(false)} className="w-full bg-white text-black hover:bg-white/90 font-black h-14 rounded-xl uppercase tracking-widest">
                 Back to Dashboard
               </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
