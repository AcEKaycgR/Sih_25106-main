import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {GraduationCap, Briefcase, UserCheck, ArrowRight, Wrench, Brain, Target, Users, Zap, Shield, TrendingUp} from 'lucide-react';
import Image from 'next/image';
import {Logo} from '@/components/shared/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Our intelligent algorithms connect students with perfect job opportunities and mentors based on skills, interests, and career goals.',
  },
  {
    icon: Target,
    title: 'Personalized Career Path',
    description: 'Get customized career recommendations, skill gap analysis, and personalized learning paths to achieve your professional goals.',
  },
  {
    icon: Users,
    title: 'Comprehensive Network',
    description: 'Join a thriving ecosystem of students, mentors, and recruiters across India, fostering meaningful professional relationships.',
  },
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description: 'Instant messaging, video interviews, live mentoring sessions, and collaborative tools to accelerate your career growth.',
  },
  {
    icon: Shield,
    title: 'Secure & Trusted',
    description: 'Enterprise-grade security ensuring your data privacy while maintaining transparency in all professional interactions.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Track your progress with detailed analytics, application insights, and market trends to make informed career decisions.',
  },
];

const DevTools = () => {
  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5" />
          <h4 className="font-semibold">Quick Access</h4>
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
      <header className="px-4 lg:px-6 h-16 flex items-center max-w-7xl mx-auto w-full">
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
          <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-10 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-white to-green-500">
                    Find Your Zen in Career Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto md:mx-0">
                    JobZen India is your mindful path to career fulfillment - a comprehensive platform that harmoniously connects students, mentors, and recruiters across India through AI-powered matching, personalized guidance, and seamless collaboration tools.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 justify-items-center md:justify-items-start">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">10,000+ Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">500+ Mentors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">100+ Companies</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
                  <Button size="lg" asChild>
                    <Link href="/role-select">
                      Join the Movement
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center">
                {heroImage && 
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        width={600}
                        height={400}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                    />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-50%"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose JobZen India?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Experience the perfect blend of technology and human connection. Our platform is designed to create meaningful career relationships while providing cutting-edge tools for success in the modern job market.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                    <span>Real-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12 justify-items-center">
              {features.map((feature, index) => (
                <Card key={feature.title} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group max-w-sm">
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Find Your Career Zen?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Join thousands of students, mentors, and recruiters who have found their perfect career match through JobZen India.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link href="/role-select">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                <span>✨ Free to use</span>
                <span>🔒 Secure platform</span>
                <span>🚀 AI-powered matching</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 JobZen India. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
      <DevTools />
    </div>
  );
}
