
'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function SupportTrigger() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-support-chat'));
  };

  return (
    <Button 
      onClick={openChat}
      variant="outline" 
      className="border-white/10 hover:bg-white/5 text-white font-bold rounded-xl px-8 h-12"
    >
      <MessageSquare className="w-4 h-4 mr-2 text-primary" />
      Contact Support Assistant
    </Button>
  );
}
