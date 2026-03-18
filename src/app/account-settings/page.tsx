
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
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/ui/image-upload';
import { doc, getDoc } from 'firebase/firestore';
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

type SettingsTab = 'profile' | 'payout' | 'security' | 'notifications';

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
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
    const bio = formData.get('bio') as string;

    try {
      updateDocumentNonBlocking(userRef, {
        displayName,
        bio,
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error saving your profile.",
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
      toast({ title: "Username Set", description: `You are now known as @${usernameInput}.` });
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
      // In a real app, you'd use window.ethereum.request({ method: 'eth_requestAccounts' })
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      
      updateDocumentNonBlocking(userRef, {
        walletAddress: mockAddress,
        lastWalletChangeAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      toast({ 
        title: "Wallet Connected", 
        description: `Address ${mockAddress} is now your primary payout wallet.` 
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Connection Failed", description: "Wallet connection was cancelled." });
    } finally {
      setIsConnectingWallet(false);
    }
  };

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Account <span className="text-primary">Settings</span>
            </h1>
            <p className="text-muted-foreground">Manage your identity, payout methods, and security preferences.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-2">
              {[
                { id: 'profile', name: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
                { id: 'payout', name: 'Payouts', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
                { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
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
                  <div className="glass-card rounded-3xl p-8 border-white/10">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                      <UserIcon className="w-5 h-5 text-primary" /> Public Profile
                    </h3>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="pb-8 border-b border-white/5">
                        <Label className="mb-4 block">Profile Avatar</Label>
                        {!isEditingAvatar ? (
                          <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-[1.5rem] bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-3xl font-black text-primary overflow-hidden shadow-2xl">
                              {user.photoURL ? (
                                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                              ) : (
                                user.email?.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <Button 
                                type="button"
                                variant="outline" 
                                className="h-10 border-white/10 bg-white/5 text-white font-bold rounded-xl mb-2"
                                onClick={() => setIsEditingAvatar(true)}
                              >
                                Update Photo
                              </Button>
                              <p className="text-xs text-muted-foreground italic">JPG, PNG, WebP supported.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <ImageUpload 
                              label="Upload New Avatar" 
                              onUpload={(file) => {
                                toast({ title: "Photo Received", description: "Avatar logic processing." });
                                setIsEditingAvatar(false);
                              }} 
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm" 
                              className="text-white/40 hover:text-white"
                              onClick={() => setIsEditingAvatar(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="username" className="mb-2 block">Username</Label>
                          <div className="flex gap-2">
                            <div className="relative flex-grow">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">@</span>
                              <Input 
                                id="username" 
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                disabled={!!userData?.username}
                                className="bg-white/5 border-white/10 h-12 rounded-xl pl-8" 
                                placeholder="unique_gamer_id"
                              />
                            </div>
                            {!userData?.username && (
                              <Button 
                                type="button" 
                                onClick={handleSetUsername}
                                disabled={isSaving || usernameInput.length < 4}
                                className="bg-primary hover:bg-primary/90 text-white font-black px-6 h-12 rounded-xl"
                              >
                                Set
                              </Button>
                            )}
                          </div>
                          {!userData?.username ? (
                            <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Permanent identity — choose wisely
                            </p>
                          ) : (
                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Identity Locked
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input id="displayName" name="displayName" defaultValue={user.displayName || ''} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea 
                            id="bio"
                            name="bio"
                            defaultValue={userData?.bio || ''}
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="Tell the community about yourself..."
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-xl w-full md:w-auto min-w-[200px]"
                      >
                        {isSaving ? (
                          <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                        ) : (
                          "Save Profile Changes"
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {/* Payout Tab */}
              {activeTab === 'payout' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="glass-card rounded-3xl p-8 border-white/10">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" /> Payout Methods
                    </h3>

                    <div className="space-y-4">
                      {/* PayPal - Unavailable */}
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 opacity-40 grayscale pointer-events-none">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                            <span className="font-black text-white italic">PP</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">PayPal</p>
                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Currently Unavailable</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-[8px] font-black text-white/20 uppercase tracking-widest">
                          Inactive
                        </div>
                      </div>

                      {/* Cash App - Unavailable */}
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 opacity-40 grayscale pointer-events-none">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                            <span className="font-black text-white">$</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">Cash App</p>
                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Currently Unavailable</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-[8px] font-black text-white/20 uppercase tracking-widest">
                          Inactive
                        </div>
                      </div>

                      {/* Crypto Wallet - Available */}
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                              <Wallet className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-white">Crypto Wallet (Web3)</p>
                              {userData?.walletAddress ? (
                                <p className="text-[10px] text-green-500 uppercase font-black tracking-widest flex items-center gap-1 mt-1">
                                  <CheckCircle2 className="w-3 h-3" /> Connected: {userData.walletAddress}
                                </p>
                              ) : (
                                <span className="text-[10px] text-primary uppercase font-black tracking-widest">Available</span>
                              )}
                            </div>
                          </div>

                          {!userData?.walletAddress ? (
                            <Button 
                              onClick={handleConnectWallet}
                              disabled={isConnectingWallet}
                              className="bg-primary hover:bg-primary/90 text-white font-black px-6 h-12 rounded-xl shadow-lg"
                            >
                              {isConnectingWallet ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                              Connect Wallet
                            </Button>
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl">
                                  <RefreshCw className="w-4 h-4 mr-2" /> Change Wallet
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 rounded-3xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl font-black text-white uppercase tracking-tight">Change Payout Wallet?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-muted-foreground">
                                    Your current wallet will be removed and replaced with a new one. This action cannot be undone. You can only change your wallet once every 24 hours.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-white/5 border-white/10 text-white font-bold rounded-xl hover:bg-white/10">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={handleConnectWallet}
                                    className="bg-primary hover:bg-primary/90 text-white font-black rounded-xl"
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                          <Wallet className="w-24 h-24" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] text-white/40 leading-relaxed italic">
                        * Payout processing takes 24-48 hours. Crypto withdrawals are processed on the Ethereum (ERC-20) network. Ensure your wallet address is correct; GameFlashX is not responsible for funds sent to incorrect addresses.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Tabs Placeholder */}
              {(activeTab === 'security' || activeTab === 'notifications') && (
                <div className="glass-card rounded-3xl p-12 text-center border-white/10 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Section under maintenance</h3>
                  <p className="text-muted-foreground text-sm">We are currently upgrading our {activeTab} systems. Please check back later.</p>
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
