
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithRedirect,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, increment, updateDoc, getDoc } from 'firebase/firestore';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });

    try {
      await signInWithRedirect(auth, provider);
      onClose();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>, mode: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'signup') {
        const confirmPassword = formData.get('confirmPassword') as string;
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        await sendEmailVerification(user);

        // Check for referral ID in localStorage
        const referralId = typeof window !== 'undefined' ? localStorage.getItem('referralId') : null;

        // Initialize user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          balance: 0,
          totalEarnings: 0,
          offersCompleted: 0,
          rewardsUnlocked: 0,
          points: 0,
          referralsCount: 0,
          referralEarnings: 0,
          accountStatus: 'active'
        });

        // If referred, increment referrer's count
        if (referralId && referralId !== user.uid) {
          const referrerRef = doc(db, 'users', referralId);
          const referrerSnap = await getDoc(referrerRef);
          if (referrerSnap.exists()) {
            await updateDoc(referrerRef, {
              referralsCount: increment(1)
            });
          }
        }

        toast({ title: "Account Created", description: "Please check your email for verification." });
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.emailVerified) {
          toast({ variant: "destructive", title: "Email not verified", description: "Please verify your email to access all features." });
        }
        toast({ title: "Welcome Back!", description: "Successfully logged in." });
        router.push('/dashboard');
      }
      onClose();
    } catch (error: any) {
      let message = error.message;
      if (error.code === 'auth/wrong-password') message = "Invalid password.";
      if (error.code === 'auth/user-not-found') message = "User not found.";
      toast({ variant: "destructive", title: "Authentication Error", description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-black/80 backdrop-blur-2xl border-white/10 p-0 overflow-hidden rounded-[2rem]">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight text-center">
              Welcome to <span className="text-primary">GameFlashX</span>
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Unlock premium rewards and gaming gift cards instantly.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 rounded-xl mb-8">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary rounded-lg transition-all font-bold">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary rounded-lg transition-all font-bold">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={(e) => handleEmailAuth(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="login-email" name="email" type="email" placeholder="name@example.com" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="login-password" name="password" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={(e) => handleEmailAuth(e, 'signup')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="signup-email" name="email" type="email" placeholder="name@example.com" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="signup-password" name="password" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="confirm-password" name="confirmPassword" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-muted-foreground">Or continue with</span></div>
            </div>

            <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <GoogleIcon className="mr-2 h-5 w-5" />}
              {isLoading ? "Redirecting..." : "Google"}
            </Button>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
