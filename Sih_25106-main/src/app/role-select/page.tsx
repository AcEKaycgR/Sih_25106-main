
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {GraduationCap, Briefcase, UserCheck, Check} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Logo} from '@/components/shared/logo';

const roles = [
  {
    name: 'Student',
    description: 'Find your zen path to career success with comprehensive tools.',
    icon: GraduationCap,
    href: '/login?role=student',
    cta: 'Continue as Student',
    className: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    iconClassName: 'bg-blue-100 text-blue-600',
    features: [
      'Apply to jobs and internships',
      'Get matched with mentors',
      'Track application status',
      'Schedule mock interviews',
      'Build professional resume',
      'Generate cover letters',
      'AI-powered career guidance'
    ]
  },
  {
    name: 'Mentor',
    description: 'Guide students and shape the future workforce with wisdom.',
    icon: UserCheck,
    href: '/login?role=mentor',
    cta: 'Continue as Mentor',
    className: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
    iconClassName: 'bg-green-100 text-green-600',
    features: [
      'Connect with students',
      'Provide career guidance',
      'Conduct mock interviews',
      'Share industry insights',
      'Review resumes and portfolios',
      'Build your mentoring network',
      'Track student progress'
    ]
  },
  {
    name: 'Recruiter',
    description: 'Discover top talent and build your dream team effortlessly.',
    icon: Briefcase,
    href: '/login?role=recruiter',
    cta: 'Continue as Recruiter',
    className: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
    iconClassName: 'bg-purple-100 text-purple-600',
    features: [
      'Post job openings',
      'Browse student profiles',
      'Manage applications',
      'Schedule interviews',
      'Connect with top talent',
      'Build employer brand',
      'AI-powered talent matching'
    ]
  },
];

export default function OnboardingPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-4">
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        <Logo />
      </header>
      <main className="flex w-full flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Choose Your Role</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Let&apos;s get you to the right place. How are you using JobZen India today?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Each role comes with specialized tools designed to help you succeed in your career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roles.map(role => (
              <Link href={role.href} key={role.name} className="block">
                <Card
                  className={cn(
                    'h-full flex flex-col text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2',
                    role.className
                  )}
                >
                  <CardHeader className="pb-4">
                    <div className={cn('mx-auto p-4 rounded-full mb-4', role.iconClassName)}>
                      <role.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl">{role.name}</CardTitle>
                    <CardDescription className="text-base font-medium">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <div className="space-y-3 mb-6">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-left gap-2">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className={cn('w-full rounded-md py-3 font-semibold border-2 border-current', role.className)}>
                      {role.cta}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
