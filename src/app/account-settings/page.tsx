'use client';

import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { User, Mail, Shield, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function AccountSettings() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

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
                { name: 'Profile', icon: <User className="w-4 h-4" />, active: true },
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
                  <User className="w-5 h-5 text-primary" /> Public Profile
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-3xl font-black text-primary overflow-hidden">
                       {user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-white font-bold rounded-xl mb-2">Change Avatar</Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input defaultValue={user.displayName || ''} className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input placeholder="gamer_123" className="bg-white/5 border-white/10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <textarea 
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Tell the community about yourself..."
                    />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-xl">
                    Save Profile Changes
                  </Button>
                </div>
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
