'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (email === 'admin@aestheticare.pro' && password === 'password') {
        router.push('/admin/dashboard');
      } else if (email === 'info@klinik-jakarta.com' && password === 'password') {
        router.push('/client/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password.',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
                <Bot className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">AesthetiCare Pro</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@aestheticare.pro"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             <p className="text-xs text-muted-foreground pt-2">
                <strong>Admin:</strong> admin@aestheticare.pro<br/>
                <strong>Client:</strong> info@klinik-jakarta.com<br/>
                <strong>Password:</strong> password
             </p>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
