
'use client';

import { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export function WithdrawalModal({ balance, userRef }: { balance: number, userRef: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<'paypal' | 'amazon' | 'steam' | null>(null);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const MIN_WITHDRAWAL = 5;

  const handleWithdraw = async () => {
    if (balance < MIN_WITHDRAWAL || !method || !email || isProcessing) return;

    setIsProcessing(true);
    
    try {
      // 1. Create transaction
      addDocumentNonBlocking(collection(firestore, 'transactions'), {
        userId: userRef.id,
        type: 'withdrawal',
        amount: balance,
        rewardName: `${method.toUpperCase()} Withdrawal`,
        status: 'pending',
        recipientEmail: email,
        createdAt: serverTimestamp()
      });

      // 2. Reset user balance
      updateDocumentNonBlocking(userRef, {
        balance: 0,
        lastWithdrawalAt: serverTimestamp()
      });

      setIsSuccess(true);
      toast({ title: "Withdrawal Requested", description: "Your funds are being processed and will arrive within 24-48 hours." });
    } catch (e) {
      toast({ variant: "destructive", title: "Request Failed", description: "Could not process withdrawal." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 text-white font-bold rounded-xl px-6">
          <Wallet className="w-4 h-4 mr-2" /> Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-black/90 backdrop-blur-2xl border-white/10 rounded-[2.5rem] p-0 overflow-hidden">
        <div className="p-10">
          {!isSuccess ? (
            <>
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight text-center">
                  Redeem <span className="text-primary">Earnings</span>
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground">
                  Minimum withdrawal is ${MIN_WITHDRAWAL.toFixed(2)}. Current balance: ${balance.toFixed(2)}
                </DialogDescription>
              </DialogHeader>

              {balance < MIN_WITHDRAWAL ? (
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center mb-6">
                  <AlertCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Insufficient Balance</p>
                  <p className="text-xs text-muted-foreground">You need at least ${(MIN_WITHDRAWAL - balance).toFixed(2)} more to withdraw.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    {['paypal', 'amazon', 'steam'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m as any)}
                        className={`p-4 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                          method === m ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/60">Recipient Email Address</Label>
                    <Input 
                      id="email" 
                      placeholder="Enter your payment email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 h-12 rounded-xl"
                    />
                  </div>

                  <Button 
                    onClick={handleWithdraw}
                    disabled={!method || !email || isProcessing}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Withdrawal"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                 <CheckCircle2 className="w-10 h-10 text-green-500" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Request Sent!</h3>
               <p className="text-muted-foreground mb-8">Your withdrawal of ${balance.toFixed(2)} is being reviewed. Most payments arrive within 24 hours.</p>
               <Button onClick={() => setIsOpen(false)} className="w-full bg-white/5 text-white font-bold h-12 rounded-xl">Back to Dashboard</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
