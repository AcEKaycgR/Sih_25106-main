
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {GraduationCap, Briefcase, UserCheck} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Logo} from '@/components/shared/logo';

const roles = [
  {
    name: 'Student',
    description: 'Find jobs, track applications, and build your career.',
    icon: GraduationCap,
    href: '/login?role=student',
    cta: 'Continue as Student',
    className: 'bg-role-student-bg text-role-student-fg hover:bg-role-student-bg/90',
    iconClassName: 'bg-role-student-bg text-role-student-fg',
  },
  {
    name: 'Mentor',
    description: 'Guide students, post opportunities, and track progress.',
    icon: UserCheck,
    href: '/login?role=mentor',
    cta: 'Continue as Mentor',
    className: 'bg-role-mentor-bg text-role-mentor-fg hover:bg-role-mentor-bg/90 border',
    iconClassName: 'bg-role-mentor-bg text-role-mentor-fg border',
  },
  {
    name: 'Recruiter',
    description: 'Post jobs, find talent, and manage your hiring pipeline.',
    icon: Briefcase,
    href: '/login?role=recruiter',
    cta: 'Continue as Recruiter',
    className: 'bg-role-recruiter-bg text-role-recruiter-fg hover:bg-role-recruiter-bg/90',
    iconClassName: 'bg-role-recruiter-bg text-role-recruiter-fg',
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map(role => (
              <Link href={role.href} key={role.name} className="block">
                <Card
                  className={cn(
                    'h-full flex flex-col text-center hover:shadow-lg hover:-translate-y-1 transition-transform duration-200'
                  )}
                >
                  <CardHeader className="flex-1">
                    <div className={cn('mx-auto p-4 rounded-full mb-4', role.iconClassName)}>
                      <role.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl">{role.name}</CardTitle>
                    <CardDescription className="text-base">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={cn('w-full rounded-md py-2 font-semibold', role.className)}>
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
