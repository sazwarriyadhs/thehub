'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { getHelp } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function HelpAssistant({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getHelp(input);

    if (result.error) {
        toast({
            variant: "destructive",
            title: "Help Assistant Error",
            description: result.error,
        });
    } else {
        const assistantMessage: Message = { role: 'assistant', content: result.data?.answer ?? "I'm sorry, I couldn't find an answer." };
        setMessages((prev) => [...prev, assistantMessage]);
    }
    
    setIsLoading(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>AI Help Assistant</SheetTitle>
          <SheetDescription>Ask any question about the application and get instant help.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow my-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg text-sm max-w-[85%]">
                Hello! How can I assist you with the Serenity AesthetiCare Hub today?
              </div>
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex items-start gap-3', m.role === 'user' && 'justify-end')}
              >
                {m.role === 'assistant' && (
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                )}
                 <div className={cn(
                    'p-3 rounded-lg text-sm max-w-[85%]',
                    m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                 )}>
                    {m.content}
                 </div>
                 {m.role === 'user' && (
                    <Avatar>
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                 )}
              </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="e.g., How do I track inventory?"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
