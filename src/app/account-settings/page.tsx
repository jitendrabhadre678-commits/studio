'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { User as UserIcon, Mail, Shield, Bell, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/ui/image-upload';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

export default function AccountSettings() {
  const { user, isUserLoading, firestore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userRef) return;

    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get('displayName') as string;
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;

    try {
      updateDocumentNonBlocking(userRef, {
        displayName,
        username,
        bio,
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved to your secure vault.",
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

  if (isUserLoading || !user) return null;

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Account <span className="text-primary">Settings</span>
            </h1>
            <p className="text-muted-foreground">Manage your profile, security, and notification preferences.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-2">
              {[
                { name: 'Profile', icon: <UserIcon className="w-4 h-4" />, active: true },
                { name: 'Email', icon: <Mail className="w-4 h-4" /> },
                { name: 'Security', icon: <Shield className="w-4 h-4" /> },
                { name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    item.active ? "bg-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </aside>

            <div className="md:col-span-3 space-y-8">
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
                          <p className="text-xs text-muted-foreground italic">Drag and drop functionality available.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageUpload 
                          label="Upload New Avatar" 
                          onUpload={(file) => {
                            toast({ title: "Photo Received", description: "Avatar upload logic initialized." });
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" name="displayName" defaultValue={user.displayName || ''} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" placeholder="gamer_123" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      name="bio"
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Tell the community about yourself..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-xl w-full md:w-auto min-w-[200px]"
                  >
                    {isSaving ? (
                      <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving Changes...</>
                    ) : (
                      "Save Profile Changes"
                    )}
                  </Button>
                </form>
              </div>

              <div className="glass-card rounded-3xl p-8 border-white/10 border-red-500/20">
                <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="destructive" className="font-black rounded-xl">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}