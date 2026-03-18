
'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc, setDocumentNonBlocking } from '@/firebase';
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
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { giftCards } from '@/lib/gift-cards';

/**
 * @fileOverview Finalized User Profile page.
 * Implements real-time fetching, auto-fill, and permanent Firestore updates.
 */

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  // Local state for form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [preferredCard, setPreferredCard] = useState('');
  const [walletAddressInput, setWalletAddressInput] = useState('');
  const [payoutEmailInput, setPayoutEmailInput] = useState('');

  // Memoize user reference for the useDoc hook
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  // Real-time document subscription
  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  // Redirect unauthorized users
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // Fetch and Auto-fill on Load
  useEffect(() => {
    if (userData) {
      setUsernameInput(userData.username || '');
      setDisplayNameInput(userData.displayName || '');
      setPreferredCard(userData.preferredGiftCard || '');
      setWalletAddressInput(userData.walletAddress || '');
      setPayoutEmailInput(userData.payoutEmail || '');
    }
  }, [userData]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRef || !firestore) return;

    // Validation: Gamer Tag
    if (usernameInput && usernameInput.length < 4) {
      toast({
        variant: "destructive",
        title: "Username Too Short",
        description: "Gamer Tag must be at least 4 characters.",
      });
      return;
    }

    // Validation: Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (payoutEmailInput && !emailRegex.test(payoutEmailInput)) {
      toast({
        variant: "destructive",
        title: "Invalid Email Format",
        description: "Please enter a valid email address for reward delivery.",
      });
      return;
    }

    // Prepare data for permanent storage (setDoc with merge)
    const updateData = {
      username: usernameInput,
      displayName: displayNameInput,
      preferredGiftCard: preferredCard,
      walletAddress: walletAddressInput,
      payoutEmail: payoutEmailInput,
      updatedAt: serverTimestamp()
    };

    // Permanent Update Logic
    setDocumentNonBlocking(userRef, updateData, { merge: true });
    
    // Success Feedback with Branded Styling
    toast({
      title: "Profile Updated Successfully",
      description: "Your personal and payout details have been permanently saved.",
      className: "bg-[#FA4616] text-white border-none font-bold",
    });
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
              User <span className="text-[#FA4616]">Profile</span>
            </h1>
            <p className="text-muted-foreground">Manage your identity and reward delivery details in one secure location.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 bg-[#0a0a0a] shadow-2xl relative min-h-[400px]">
            {isDataLoading && !userData ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-10 rounded-[2.5rem]">
                <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
                <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Syncing with database...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-8 animate-in fade-in duration-500">
                {/* Identity Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <IdCard className="w-5 h-5 text-[#FA4616]" /> Personal Identity
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Gamer Tag / Username</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                      <Input 
                        id="username" 
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value.replace(/\s+/g, '').toLowerCase())}
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-10 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                        placeholder="Enter username"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Full Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <Input 
                        id="displayName" 
                        value={displayNameInput}
                        onChange={(e) => setDisplayNameInput(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                      />
                    </div>
                  </div>

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
                </div>

                {/* Payout Section */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <Wallet className="w-5 h-5 text-[#FA4616]" /> Payout Configuration
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="walletAddress" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Wallet Address (For Payouts)</Label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <Input 
                        id="walletAddress" 
                        value={walletAddressInput}
                        onChange={(e) => setWalletAddressInput(e.target.value)}
                        placeholder="Enter your crypto wallet address"
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payoutEmail" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Email Address (For receiving digital gift cards and codes)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <Input 
                        id="payoutEmail" 
                        type="email"
                        value={payoutEmailInput}
                        onChange={(e) => setPayoutEmailInput(e.target.value)}
                        placeholder="delivery@example.com"
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest px-10 h-16 rounded-2xl w-full shadow-2xl shadow-[#FA4616]/20 transition-all active:scale-[0.98] mt-4"
                >
                  <Check className="w-5 h-5 mr-2" /> Save Profile
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
