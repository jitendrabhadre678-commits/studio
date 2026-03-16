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
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Lock, Loader2, Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

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
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Create Firestore profile if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
        points: 0,
        rewardsUnlocked: 0,
        accountStatus: 'active'
      }, { merge: true });

      toast({ title: "Welcome to GameFlashX!", description: "Successfully logged in with Google." });
      onClose();
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    } finally {
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

        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          points: 0,
          rewardsUnlocked: 0,
          accountStatus: 'active'
        });

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
              <Chrome className="mr-2 h-5 w-5" /> Google
            </Button>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
