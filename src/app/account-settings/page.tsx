
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
  User as UserIcon,
  Mail,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Refined User Profile page.
 * Simplified to focus on identity and essential delivery details.
 */

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  // Local state for form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
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

  // Intelligent Auto-fill on Load
  useEffect(() => {
    if (user) {
      const emailPrefix = user.email?.split('@')[0] || '';
      
      setUsernameInput(userData?.username || emailPrefix);
      setDisplayNameInput(userData?.displayName || user.displayName || emailPrefix);
      setPayoutEmailInput(userData?.payoutEmail || user.email || '');
    }
  }, [userData, user]);

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

    // Prepare data for permanent storage
    const updateData = {
      username: usernameInput,
      displayName: displayNameInput,
      payoutEmail: payoutEmailInput,
      updatedAt: serverTimestamp()
    };

    // Permanent Update Logic
    setDocumentNonBlocking(userRef, updateData, { merge: true });
    
    toast({
      title: "Profile Updated",
      description: "Your information has been successfully saved.",
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
        <div className="container mx-auto max-w-xl">
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              User <span className="text-[#FA4616]">Profile</span>
            </h1>
            <p className="text-muted-foreground text-sm">Customize your player identity and configure your delivery email.</p>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/10 bg-[#0a0a0a] shadow-2xl relative min-h-[400px]">
            {isDataLoading && !userData ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-10 rounded-[2.5rem]">
                <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
                <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Syncing...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-8 animate-in fade-in duration-500">
                {/* Identity Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
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
                        placeholder="Choose a handle"
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
                        placeholder="Your full name"
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <Mail className="w-5 h-5 text-[#FA4616]" /> Reward Delivery
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="payoutEmail" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Email for Gift Card Delivery</Label>
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
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1 ml-1">
                      Current Login: {user.email}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest px-10 h-16 rounded-2xl w-full shadow-2xl shadow-[#FA4616]/20 transition-all active:scale-[0.98]"
                  >
                    <Check className="w-5 h-5 mr-2" /> Save Profile
                  </Button>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-white/30">
                    <Info className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider italic">
                      Rewards can be claimed directly from your dashboard
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
