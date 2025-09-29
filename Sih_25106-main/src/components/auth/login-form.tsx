
'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {Loader2} from 'lucide-react';
import React from 'react';
import {app, db} from '@/lib/firebase';
import type {UserRole} from '@/lib/types';

const formSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}),
  password: z.string().min(1, {message: 'Password is required.'}),
});

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.137,44,30.024,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {toast} = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSsoLoading, setIsSsoLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const role = (searchParams.get('role') as UserRole) || 'student';

  function getRedirectPath(role: UserRole) {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'mentor':
        return '/mentor/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      default:
        return '/student/dashboard';
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    // This is a mock login. In a real app, you'd call Firebase auth.
    setTimeout(() => {
      toast({
        title: 'Login Successful',
        description: "Welcome back! We're redirecting you now.",
      });
      router.push(getRedirectPath(role));
      setIsLoading(false);
    }, 1000);
  }

  async function handleGoogleLogin() {
    setIsSsoLoading(true);
    const auth = getAuth(app);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get ID token for backend verification
      const idToken = await user.getIdToken();

      // Register/sync user with PostgreSQL
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          role,
          profileData: {
            // We'll add profile completion later
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync user with database');
      }

      toast({
        title: 'Login Successful',
        description: "Welcome! We're redirecting you now.",
      });
      router.push(getRedirectPath(role));
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Could not sign in with Google. Please try again.',
      });
    } finally {
      setIsSsoLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading || isSsoLoading}>
        {isSsoLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2" />
        )}
        Login with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@university.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <a href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading || isSsoLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
