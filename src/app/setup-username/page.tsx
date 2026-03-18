
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Zap, 
  Loader2, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { doc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SetupUsername() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user already has a username to prevent access to this page
  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isDataLoading } = useDoc(userRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
    if (userData?.username) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, userData, router]);

  const validateUsername = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    setUsername(clean);
    
    if (clean.length < 4) {
      setError("Username must be at least 4 characters");
    } else {
      setError(null);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user || isSaving || error || username.length < 4) return;

    setIsSaving(true);
    setIsChecking(true);

    try {
      // 1. Uniqueness Check
      const q = query(collection(firestore, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setError("This username is already taken");
        setIsSaving(false);
        setIsChecking(false);
        return;
      }

      // 2. Save to Database
      await setDoc(doc(firestore, 'users', user.uid), {
        username: username,
        updatedAt: serverTimestamp()
      }, { merge: true });

      toast({
        title: "Username set successfully",
        description: `Welcome to GameFlashX, @${username}!`,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Setup Error",
        description: "Could not save your identity. Please try again.",
      });
    } finally {
      setIsSaving(false);
      setIsChecking(false);
    }
  };

  if (isUserLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <Header />
      
      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Identity Setup</span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight leading-none">
              Create Your <br /><span className="text-primary">Username</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              This is how you will be known in the GameFlashX community. Choose wisely!
            </p>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border-white/10 bg-[#0a0a0a]">
            <form onSubmit={handleContinue} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="username" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] block">Choose Username</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">@</span>
                  <Input 
                    id="username" 
                    value={username}
                    onChange={(e) => validateUsername(e.target.value)}
                    className={cn(
                      "bg-white/5 border-white/10 h-14 rounded-xl pl-8 text-white font-bold transition-all focus:ring-primary/50",
                      error && "border-red-500/50"
                    )} 
                    placeholder="Enter a unique username"
                    disabled={isSaving}
                    autoFocus
                  />
                </div>
                
                {error ? (
                  <div className="flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                  </div>
                ) : username.length >= 4 ? (
                  <div className="flex items-center gap-2 text-green-500 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Username is valid</p>
                  </div>
                ) : null}
              </div>

              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex gap-3">
                <ShieldCheck className="w-5 h-5 text-white/20 shrink-0" />
                <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed tracking-tight">
                  This username is permanent and cannot be changed later. It will be used for your public profile.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={isSaving || !!error || username.length < 4}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                {isSaving ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...</>
                ) : (
                  <>Continue <ChevronRight className="ml-2 w-5 h-5" /></>
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
