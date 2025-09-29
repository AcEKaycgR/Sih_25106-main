import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {GraduationCap, Briefcase, UserCheck, ArrowRight, Wrench} from 'lucide-react';
import Image from 'next/image';
import {Logo} from '@/components/shared/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: GraduationCap,
    title: 'For Students',
    description: 'Discover job opportunities, get AI-powered career advice, and track your applications seamlessly.',
  },
  {
    icon: UserCheck,
    title: 'For Mentors',
    description: 'Guide the next generation by sharing opportunities, tracking student progress, and providing valuable insights.',
  },
  {
    icon: Briefcase,
    title: 'For Recruiters',
    description: 'Find top talent from universities, manage your hiring pipeline, and build your employer brand.',
  },
];

const DevTools = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5" />
          <h4 className="font-semibold">Dev Tools</h4>
        </div>
        <div className="flex flex-col gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/student/dashboard">Student Dashboard</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/mentor/dashboard">Mentor Dashboard</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/recruiter/dashboard">Recruiter Dashboard</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Note: You must be logged in to access these pages.</p>
      </CardContent>
    </Card>
  );
};


export default function LandingPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero');
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Button asChild>
            <Link href="/role-select">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6 space-y-8 lg:space-y-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-white to-green-500">
                    Find Your Zen in Career Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    JobZen India is your mindful path to career fulfillment - connecting talent with opportunity through a balanced ecosystem of students, mentors, and recruiters across India.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/role-select">
                      Join the Movement
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                {heroImage && 
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        width={600}
                        height={400}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                    />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-50%"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Connecting Ambition with Opportunity</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides dedicated tools for every stakeholder in the campus-to-career ecosystem, fostering growth and self-sufficiency.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 JobZen India. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
      <DevTools />
    </div>
  );
}
