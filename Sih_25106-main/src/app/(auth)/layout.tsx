
'use client';

import AppLayout from '@/components/shared/app-layout';
import {useRouter} from 'next/navigation';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '@/lib/firebase';
import {useEffect} from 'react';
import {Loader2} from 'lucide-react';

export default function AuthLayout({children}: {children: React.ReactNode}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // or a redirect component
  }

  return <AppLayout>{children}</AppLayout>;
}
