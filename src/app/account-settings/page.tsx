
'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Bell, 
  Loader2, 
  CreditCard, 
  Wallet, 
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  MapPin,
  IdCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type SettingsTab = 'profile' | 'payout';

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc(userRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (userData?.username) {
      setUsernameInput(userData.username);
    }
  }, [userData]);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userRef) return;

    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get('displayName') as string;
    const physicalAddress = formData.get('physicalAddress') as string;

    try {
      updateDocumentNonBlocking(userRef, {
        displayName,
        physicalAddress,
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Profile Updated",
        description: "Your personal details have been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error saving your changes.",
      });
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  const handleSetUsername = async () => {
    if (!userRef || userData?.username) return;
    
    if (usernameInput.length < 4) {
      toast({ variant: "destructive", title: "Invalid Username", description: "Username must be at least 4 characters." });
      return;
    }

    setIsSaving(true);
    try {
      updateDocumentNonBlocking(userRef, {
        username: usernameInput,
        updatedAt: new Date().toISOString()
      });
      toast({ title: "Username Set", description: `Your identity is now @${usernameInput}.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not set username." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConnectWallet = async () => {
    if (!userRef) return;

    // Check 24h limit
    if (userData?.lastWalletChangeAt) {
      const lastChange = new Date(userData.lastWalletChangeAt).getTime();
      const now = new Date().getTime();
      if (now - lastChange < 24 * 60 * 60 * 1000) {
        toast({ 
          variant: "destructive", 
          title: "Cooldown Active", 
          description: "You can only change your wallet once every 24 hours." 
        });
        return;
      }
    }

    setIsConnectingWallet(true);
    
    // Simulate wallet connection (MetaMask style)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      
      updateDocumentNonBlocking(userRef, {
        walletAddress: mockAddress,
        lastWalletChangeAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      toast({ 
        title: "Wallet Connected", 
        description: `Address ${mockAddress} is now set for payouts.` 
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Connection Failed", description: "Wallet connection was cancelled." });
    } finally {
      setIsConnectingWallet(false);
    }
  };

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen bg-[#000000]">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              My <span className="text-primary">Account</span>
            </h1>
            <p className="text-muted-foreground">Manage your identity, payout methods, and profile details.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-2">
              {[
                { id: 'profile', name: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
                { id: 'payout', name: 'Payout Settings', icon: <CreditCard className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    activeTab === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </aside>

            <div className="md:col-span-3 space-y-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/10 bg-[#0a0a0a]">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
                      <IdCard className="w-5 h-5 text-primary" /> Personal Details
                    </h3>
                    
                    <div className="space-y-8">
                      {/* Username Section */}
                      <div className="pb-8 border-b border-white/5">
                        <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4 block">Unique Username</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">@</span>
                            <Input 
                              id="username" 
                              value={usernameInput}
                              onChange={(e) => setUsernameInput(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                              disabled={!!userData?.username}
                              className="bg-white/5 border-white/10 h-14 rounded-xl pl-8 text-white font-bold" 
                              placeholder="choose_your_handle"
                            />
                          </div>
                          {!userData?.username && (
                            <Button 
                              type="button" 
                              onClick={handleSetUsername}
                              disabled={isSaving || usernameInput.length < 4}
                              className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-14 rounded-xl uppercase tracking-widest"
                            >
                              Set
                            </Button>
                          )}
                        </div>
                        {!userData?.username ? (
                          <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5" /> This is permanent and cannot be changed later.
                          </p>
                        ) : (
                          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Identity locked
                          </p>
                        )}
                      </div>

                      {/* Main Profile Form */}
                      <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="displayName" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Full Name</Label>
                            <Input 
                              id="displayName" 
                              name="displayName" 
                              defaultValue={userData?.displayName || ''} 
                              placeholder="John Doe"
                              className="bg-white/5 border-white/10 h-14 rounded-xl text-white font-bold" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="physicalAddress" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Mailing Address (Optional)</Label>
                            <Textarea 
                              id="physicalAddress"
                              name="physicalAddress"
                              defaultValue={userData?.physicalAddress || ''}
                              className="w-full h-32 bg-white/5 border-white/10 rounded-xl p-4 text-white font-medium focus:ring-primary/50 transition-all"
                              placeholder="Enter your address for potential physical rewards..."
                            />
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSaving}
                          className="bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest px-10 h-14 rounded-xl w-full md:w-auto shadow-xl transition-all"
                        >
                          {isSaving ? (
                            <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                          ) : (
                            "Save Profile"
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Payout Tab */}
              {activeTab === 'payout' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/10 bg-[#0a0a0a]">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
                      <CreditCard className="w-5 h-5 text-primary" /> Payout Settings
                    </h3>

                    <div className="space-y-4">
                      {/* PayPal - Unavailable */}
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 opacity-30 grayscale pointer-events-none">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                            <span className="font-black text-white italic">PP</span>
                          </div>
                          <div>
                            <p className="font-bold text-white uppercase tracking-tight">PayPal</p>
                            <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em]">Currently Unavailable</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-[8px] font-black text-white/20 uppercase tracking-widest">
                          Inactive
                        </div>
                      </div>

                      {/* Cash App - Unavailable */}
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 opacity-30 grayscale pointer-events-none">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                            <span className="font-black text-white">$</span>
                          </div>
                          <div>
                            <p className="font-bold text-white uppercase tracking-tight">Cash App</p>
                            <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em]">Currently Unavailable</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-[8px] font-black text-white/20 uppercase tracking-widest">
                          Inactive
                        </div>
                      </div>

                      {/* Crypto Wallet - Available */}
                      <div className="p-8 rounded-[2rem] bg-primary/5 border-2 border-primary/20 relative overflow-hidden group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 shadow-2xl">
                              <Wallet className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-xl font-black text-white uppercase tracking-tight">Crypto Wallet (Web3)</p>
                              {userData?.walletAddress ? (
                                <p className="text-[10px] text-green-500 uppercase font-black tracking-widest flex items-center gap-2 mt-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 w-fit">
                                  <CheckCircle2 className="w-3 h-3" /> Connected: {userData.walletAddress}
                                </p>
                              ) : (
                                <span className="text-[10px] text-primary uppercase font-black tracking-[0.3em]">Method Available</span>
                              )}
                            </div>
                          </div>

                          {!userData?.walletAddress ? (
                            <Button 
                              onClick={handleConnectWallet}
                              disabled={isConnectingWallet}
                              className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-14 rounded-xl shadow-xl shadow-primary/20 uppercase tracking-widest"
                            >
                              {isConnectingWallet ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ExternalLink className="w-5 h-5 mr-2" />}
                              Connect Wallet
                            </Button>
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest h-14 rounded-xl px-8 transition-all">
                                  <RefreshCw className="w-4 h-4 mr-2" /> Change Wallet
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-[#020617] border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                                <AlertDialogHeader className="mb-6">
                                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <AlertCircle className="w-8 h-8 text-primary" />
                                  </div>
                                  <AlertDialogTitle className="text-3xl font-black text-white uppercase tracking-tight text-center">Change Payout Wallet?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-muted-foreground text-center text-base">
                                    Your current wallet will be removed and replaced with a new one. This action cannot be undone. 
                                    <br /><br />
                                    <span className="text-yellow-500 font-bold uppercase text-xs tracking-widest">Note: max 1 change every 24 hours.</span>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="sm:justify-center gap-4">
                                  <AlertDialogCancel className="bg-white/5 border-white/10 text-white font-bold rounded-xl px-8 h-14 hover:bg-white/10">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={handleConnectWallet}
                                    className="bg-primary hover:bg-primary/90 text-white font-black rounded-xl px-10 h-14 uppercase tracking-widest"
                                  >
                                    Confirm & Replace
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                          <Wallet className="w-48 h-48" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3">Security & Processing</h4>
                      <p className="text-[10px] text-white/30 leading-relaxed italic">
                        * Withdrawal requests are processed manually within 24-48 hours. Crypto transfers use the Ethereum (ERC-20) network. Ensure your address is accurate; GameFlashX is not responsible for funds sent to incorrect addresses.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
