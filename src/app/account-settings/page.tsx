
'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  IdCard,
  Check,
  Gift,
  User as UserIcon,
  Wallet,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { giftCards } from '@/lib/gift-cards';

/**
 * @fileOverview Refined User Profile page.
 * Collects Gamer Tag, Full Name, Preferred Gift Card, Payout Wallet, and Delivery Email.
 */

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Local state for form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [preferredCard, setPreferredCard] = useState('');
  const [walletAddressInput, setWalletAddressInput] = useState('');
  const [payoutEmailInput, setPayoutEmailInput] = useState('');

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // Sync database values to local state on load
  useEffect(() => {
    if (userData) {
      if (userData.username) setUsernameInput(userData.username);
      if (userData.displayName) setDisplayNameInput(userData.displayName);
      if (userData.preferredGiftCard) setPreferredCard(userData.preferredGiftCard);
      if (userData.walletAddress) setWalletAddressInput(userData.walletAddress);
      if (userData.payoutEmail) setPayoutEmailInput(userData.payoutEmail);
    }
  }, [userData]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRef || !firestore || isSaving) return;

    // Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (payoutEmailInput && !emailRegex.test(payoutEmailInput)) {
      toast({
        variant: "destructive",
        title: "Invalid Email Format",
        description: "Please enter a valid email address for digital code delivery.",
      });
      return;
    }

    setIsSaving(true);

    try {
      await setDoc(userRef, {
        username: usernameInput,
        displayName: displayNameInput,
        preferredGiftCard: preferredCard,
        walletAddress: walletAddressInput,
        payoutEmail: payoutEmailInput,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      toast({
        title: "Profile Updated",
        description: "Your gaming identity and payout preferences have been saved.",
      });
    } catch (err) {
      console.error("Save Error:", err);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error saving your profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isUserLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FA4616] animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-12 text-center md:text-left">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Player <span className="text-[#FA4616]">Profile</span>
            </h1>
            <p className="text-muted-foreground">Customize your gaming identity and reward delivery preferences.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 bg-[#0a0a0a]">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
              <IdCard className="w-5 h-5 text-[#FA4616]" /> Personal Identity
            </h3>
            
            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* Gamer Tag / Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Gamer Tag / Username</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                  <Input 
                    id="username" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value.replace(/\s+/g, '').toLowerCase())}
                    className="bg-white/5 border-white/10 h-14 rounded-2xl pl-10 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                    placeholder="e.g. shadow_ninja"
                    required
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input 
                    id="displayName" 
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    placeholder="Enter your legal name"
                    className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                  />
                </div>
              </div>

              {/* Preferred Gift Card */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Preferred Gift Card</Label>
                <Select value={preferredCard} onValueChange={setPreferredCard}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-bold focus:border-[#FA4616] focus:ring-0">
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4 text-white/20" />
                      <SelectValue placeholder="Select a reward type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/10 rounded-xl">
                    {giftCards.map((card) => (
                      <SelectItem key={card.id} value={card.brand} className="text-white focus:bg-[#FA4616] focus:text-white rounded-lg">
                        {card.brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
                  <Wallet className="w-5 h-5 text-[#FA4616]" /> Payout Configuration
                </h3>

                {/* Wallet Address */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="walletAddress" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Wallet Address (For Payouts)</Label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input 
                      id="walletAddress" 
                      value={walletAddressInput}
                      onChange={(e) => setWalletAddressInput(e.target.value)}
                      placeholder="Enter your crypto wallet address (e.g. 0x...)"
                      className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                    />
                  </div>
                  <p className="text-[9px] text-white/20 font-medium uppercase tracking-widest mt-2 ml-1">
                    * Ensure the address is correct. Payouts are irreversible once processed.
                  </p>
                </div>

                {/* Payout Email */}
                <div className="space-y-2">
                  <Label htmlFor="payoutEmail" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Email Address (For receiving digital gift cards and codes)</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FA4616]" />
                    <Input 
                      id="payoutEmail" 
                      type="email"
                      value={payoutEmailInput}
                      onChange={(e) => setPayoutEmailInput(e.target.value)}
                      placeholder="e.g. delivery@example.com"
                      className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                    />
                  </div>
                  <p className="text-[9px] text-white/20 font-medium uppercase tracking-widest mt-2 ml-1">
                    * Digital reward codes will be sent to this verified delivery address.
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSaving || isDataLoading}
                className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest px-10 h-16 rounded-2xl w-full shadow-2xl shadow-[#FA4616]/20 transition-all active:scale-[0.98] mt-4"
              >
                {isSaving ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</>
                ) : (
                  <><Check className="w-5 h-5 mr-2" /> Save Details</>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
