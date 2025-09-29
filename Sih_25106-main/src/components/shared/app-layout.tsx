
'use client';

import * as React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {UserNav} from './user-nav';
import {Logo} from './logo';
import {MainNav} from './main-nav';
import {MobileNav} from './mobile-nav';
import type {UserRole} from '@/lib/types';
import {useIsMobile} from '@/hooks/use-mobile';
import {Button} from '../ui/button';
import {Bell, Search} from 'lucide-react';
import {Input} from '../ui/input';

export default function AppLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const getRoleFromPath = (path: string): UserRole => {
    if (path.startsWith('/student')) return 'student';
    if (path.startsWith('/mentor')) return 'mentor';
    if (path.startsWith('/recruiter')) return 'recruiter';
    return 'student'; // default role
  };

  const role = getRoleFromPath(pathname);

  // Do not render layout for onboarding page
  if (pathname === '/onboarding') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav role={role} />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <UserNav role={role} />
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </SidebarInset>
        
        {isMobile && <MobileNav role={role} />}
      </div>
    </SidebarProvider>
  );
}
