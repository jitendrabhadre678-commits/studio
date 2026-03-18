'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Loader2, 
  IdCard,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Input states
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
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
    if (userData) {
      if (userData.displayName) setDisplayNameInput(userData.displayName);
      if (userData.physicalAddress) setAddressInput(userData.physicalAddress);
      if (userData.username) setUsernameInput(userData.username);
    }
  }, [userData]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRef || !firestore || isSaving) return;

    setIsSaving(true);

    try {
      await setDoc(userRef, {
        displayName: displayNameInput,
        physicalAddress: addressInput,
        username: usernameInput,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      toast({
        title: "Profile Saved",
        description: "Your information has been updated successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Save Error",
        description: "Could not save profile details. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen bg-[#000000]">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              User <span className="text-primary">Profile</span>
            </h1>
            <p className="text-muted-foreground">Manage your personal identity and reward delivery details.</p>
          </div>

          <div className="glass-card rounded-[2rem] p-8 md:p-10 border-white/10 bg-[#0a0a0a]">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
              <IdCard className="w-5 h-5 text-primary" /> Personal Details
            </h3>
            
            <form onSubmit={handleSaveProfile} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Username</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                  <Input 
                    id="username" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="bg-white/5 border-white/10 h-14 rounded-xl pl-8 text-white font-bold" 
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Full Name</Label>
                  <Input 
                    id="displayName" 
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10 h-14 rounded-xl text-white font-bold" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physicalAddress" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Mailing Address</Label>
                  <Textarea 
                    id="physicalAddress"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full h-32 bg-white/5 border-white/10 rounded-xl p-4 text-white font-medium focus:ring-primary/50 transition-all"
                    placeholder="Enter your address for reward delivery..."
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest px-10 h-14 rounded-xl w-full shadow-xl transition-all"
              >
                {isSaving ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                ) : (
                  <><Check className="w-4 h-4 mr-2" /> Save Profile</>
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
