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
} from 'lucide-react';
import type {NavItem, UserRole} from '@/lib/types';

const navItems: NavItem[] = [
  // Student
  {href: '/student/dashboard', label: 'Home', icon: LayoutDashboard, roles: ['student']},
  {href: '/student/jobs', label: 'Jobs', icon: Briefcase, roles: ['student']},
  {
    href: '/student/applications',
    label: 'Apps',
    icon: FileText,
    roles: ['student'],
  },
  {href: '/student/copilot', label: 'Co-pilot', icon: Sparkles, roles: ['student']},
  // Mentor
  {href: '/mentor/dashboard', label: 'Home', icon: BarChart2, roles: ['mentor']},
  {href: '/mentor/students', label: 'Students', icon: Users, roles: ['mentor']},
  {
    href: '/mentor/opportunities',
    label: 'Posts',
    icon: Briefcase,
    roles: ['mentor'],
  },
  // Recruiter
  {href: '/recruiter/dashboard', label: 'Home', icon: LayoutDashboard, roles: ['recruiter']},
  {href: '/recruiter/jobs', label: 'Jobs', icon: Briefcase, roles: ['recruiter']},
];

export function MobileNav({role}: {role: UserRole}) {
  const pathname = usePathname();
  const filteredNavItems = navItems.filter(item => item.roles.includes(role)).slice(0, 4);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t sm:hidden z-40">
      <nav className="grid h-full grid-cols-4">
        {filteredNavItems.map(item => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
