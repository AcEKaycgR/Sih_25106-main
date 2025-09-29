import Image from 'next/image';
import {LoginForm} from '@/components/auth/login-form';
import {Logo} from '@/components/shared/logo';
import {PlaceHolderImages} from '@/lib/placeholder-images';

export default function LoginPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'login-hero');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-8">
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Log in to continue to your JobZen India dashboard.
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-40%"></div>
      </div>
    </div>
  );
}
