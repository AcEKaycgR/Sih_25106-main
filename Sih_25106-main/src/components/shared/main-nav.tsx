'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {
  Briefcase,
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Award,
  Sparkles,
  Building,
  Swords,
} from 'lucide-react';
import type {NavItem, UserRole} from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems: NavItem[] = [
  // Student
  {href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student']},
  {href: '/student/jobs', label: 'Discover Jobs', icon: Briefcase, roles: ['student']},
  {href: '/student/applications', label: 'My Applications', icon: FileText, roles: ['student']},
  {href: '/student/resume', label: 'My Resume', icon: Award, roles: ['student']},
  {href: '/student/copilot', label: 'Co-pilot', icon: Sparkles, roles: ['student']},
  // Mentor
  {href: '/mentor/dashboard', label: 'Dashboard', icon: BarChart2, roles: ['mentor']},
  {href: '/mentor/students', label: 'Students', icon: Users, roles: ['mentor']},
  {
    href: '/mentor/opportunities',
    label: 'Opportunities',
    icon: Briefcase,
    roles: ['mentor'],
  },
  // Recruiter
  {href: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['recruiter']},
  {href: '/recruiter/jobs', label: 'Jobs', icon: Briefcase, roles: ['recruiter']},
  {href: '/recruiter/brand', label: 'Brand Page', icon: Building, roles: ['recruiter']},
  // Shared
  {href: '/leaderboards', label: 'Leaderboards', icon: Swords, roles: ['student', 'mentor']},
];

export function MainNav({role}: {role: UserRole}) {
  const pathname = usePathname();
  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-start gap-2 px-2 sm:py-4">
        {filteredNavItems.map(item => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-accent text-primary',
                    'w-full'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
