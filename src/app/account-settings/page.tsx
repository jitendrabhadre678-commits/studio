'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc, updateDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  IdCard,
  Check,
  User as UserIcon,
  Mail,
  Info,
  Globe,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Enhanced User Profile page.
 * Implements auto-detected fields, read-only identity constraints, and PayPal validation.
 */

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  // Local state for form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [paypalEmailInput, setPaypalEmailInput] = useState('');

  // Memoize user reference
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  // Real-time document subscription
  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  // Redirect unauthorized
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // Sync state with Firestore data
  useEffect(() => {
    if (userData) {
      setUsernameInput(userData.username || '');
      setDisplayNameInput(userData.displayName || '');
      setPaypalEmailInput(userData.paypalEmail || '');
    }
  }, [userData]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRef || !firestore) return;

    // Validation: PayPal Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (paypalEmailInput && !emailRegex.test(paypalEmailInput)) {
      toast({
        variant: "destructive",
        title: "Invalid Email Format",
        description: "Please enter a valid PayPal email address.",
      });
      return;
    }

    // Update payload - explicitly exclude read-only fields
    const updateData = {
      displayName: displayNameInput,
      paypalEmail: paypalEmailInput,
      updatedAt: serverTimestamp()
    };

    updateDocumentNonBlocking(userRef, updateData);
    
    toast({
      title: "Profile Synchronized",
      description: "Your information has been successfully saved to our secure nodes.",
      className: "bg-[#FA4616] text-white border-none font-bold",
    });
  };

  const prefillWithLoginEmail = () => {
    if (user?.email) {
      setPaypalEmailInput(user.email);
    }
  };

  if (isUserLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FA4616] animate-spin" />
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
              Account <span className="text-[#FA4616]">Identity</span>
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Configure your profile and payout settings.</p>
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
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <IdCard className="w-5 h-5 text-[#FA4616]" /> User Profile
                  </h3>
                  
                  {/* Read-Only Login Email */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Login Email (Auto)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <div className="bg-white/5 border border-white/5 h-14 rounded-2xl pl-11 flex items-center text-white/40 font-bold cursor-not-allowed">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  {/* Non-Editable Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Gamer Tag / Username</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                      <Input 
                        id="username" 
                        value={usernameInput}
                        readOnly
                        className="bg-white/5 border-white/5 h-14 rounded-2xl pl-10 text-white/40 font-bold cursor-not-allowed transition-colors" 
                      />
                    </div>
                    <div className="flex items-start gap-2 mt-2 ml-1 opacity-40">
                      <Info className="w-3 h-3 mt-0.5 text-[#FA4616]" />
                      <p className="text-[9px] font-bold leading-normal uppercase tracking-wider max-w-[350px]">
                        Username cannot be changed to ensure smooth reward processing and avoid payment issues.
                      </p>
                    </div>
                  </div>

                  {/* Editable Full Name */}
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

                  {/* Read-Only Country */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Detected Country (Auto)</Label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FA4616]" />
                      <div className="bg-white/5 border border-white/5 h-14 rounded-2xl pl-11 flex items-center text-white/60 font-bold cursor-not-allowed">
                        {userData?.country || 'Detecting...'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payout Information Section */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                    <Wallet className="w-5 h-5 text-[#FA4616]" /> Payout Information
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end mb-1 px-1">
                      <Label htmlFor="paypalEmail" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">PayPal Email</Label>
                      <button 
                        type="button"
                        onClick={prefillWithLoginEmail}
                        className="text-[9px] font-black text-[#FA4616] hover:text-[#FA4616]/80 uppercase tracking-widest transition-colors"
                      >
                        Use Login Email
                      </button>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <Input 
                        id="paypalEmail" 
                        type="email"
                        value={paypalEmailInput}
                        onChange={(e) => setPaypalEmailInput(e.target.value)}
                        placeholder="paypal@example.com"
                        className="bg-white/5 border-white/10 h-14 rounded-2xl pl-11 text-white font-bold focus:border-[#FA4616] focus:ring-0 transition-colors" 
                      />
                    </div>
                    <div className="flex items-start gap-2 mt-2 ml-1 opacity-60">
                      <Info className="w-3 h-3 mt-0.5 text-primary" />
                      <p className="text-[9px] font-bold leading-normal uppercase tracking-wider text-white/60">
                        For cash withdrawals, your PayPal email must be correct to receive payments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[#FA4616] hover:bg-[#FA4616]/90 text-white font-black uppercase tracking-widest px-10 h-16 rounded-2xl w-full shadow-2xl shadow-[#FA4616]/20 transition-all active:scale-[0.98]"
                  >
                    <Check className="w-5 h-5 mr-2" /> Update Profile
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
