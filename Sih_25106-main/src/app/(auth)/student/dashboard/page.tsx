'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Badge} from '@/components/ui/badge';
import {
  FileText,
  Briefcase,
  Target,
  ArrowRight,
  Bot,
  MessageSquare,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import {ResumeChatbot} from '@/components/student/resume-chatbot';
import { useJobs, useApplications } from '@/hooks/use-data';

const formatApplicationStatus = (status: string) => {
  switch (status) {
    case 'APPLIED':
      return 'Applied';
    case 'UNDER_REVIEW':
      return 'Under Review';
    case 'INTERVIEWING':
      return 'Interviewing';
    case 'OFFERED':
      return 'Offered';
    case 'REJECTED':
      return 'Rejected';
    default:
      return status;
  }
};

export default function StudentDashboard() {
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();
  const { applications, loading: applicationsLoading, error: applicationsError } = useApplications();

  const recentApplications = applications.slice(0, 2);
  const recommendedJobs = jobs.slice(0, 2);

  if (jobsLoading || applicationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (jobsError || applicationsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500">Error loading data: {jobsError || applicationsError}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">+{applications.filter(app => {
              const appliedDate = new Date(app.appliedAt);
              const thisMonth = new Date();
              thisMonth.setDate(1);
              return appliedDate >= thisMonth;
            }).length} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter(app => app.status === 'INTERVIEWING').length}</div>
            <p className="text-xs text-muted-foreground">{applications.filter(app => {
              const appliedDate = new Date(app.appliedAt);
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              return app.status === 'INTERVIEWING' && appliedDate <= nextWeek;
            }).length} upcoming this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card
          x-chunk="dashboard-01-chunk-3"
          className="bg-primary/10 border-primary/40"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Career Co-Pilot</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">New skill suggestions!</div>
            <p className="text-xs text-muted-foreground">Boost your profile for Data Science roles.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" asChild>
              <Link href="/student/copilot">
                View Suggestions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track the status of your latest applications.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/student/applications">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map(app => (
                <div key={app.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                  <Image
                    alt={`${app.job.company.name} logo`}
                    className="aspect-square rounded-md object-contain"
                    height="48"
                    src={app.job.company.logoUrl || 'https://placehold.co/40x40?text=' + app.job.company.name.charAt(0)}
                    width="48"
                  />
                  <div className="grid gap-1 flex-1">
                    <p className="text-sm font-medium leading-none">{app.job.title}</p>
                    <p className="text-sm text-muted-foreground">{app.job.company.name}</p>
                  </div>
                  <Badge variant={app.status === 'INTERVIEWING' ? 'default' : 'secondary'}>
                    {formatApplicationStatus(app.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>Jobs matched to your profile and skills.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {recommendedJobs.map(job => (
              <div key={job.id} className="flex items-center gap-4">
                <Image
                  alt={`${job.company.name} logo`}
                  className="aspect-square rounded-md object-contain"
                  height="48"
                  src={job.company.logoUrl || 'https://placehold.co/40x40?text=' + job.company.name.charAt(0)}
                  width="48"
                />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.company.name}</p>
                </div>
                <Button asChild size="sm" className="ml-auto shrink-0">
                  <Link href="/student/jobs">View</Link>
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/student/jobs">
                <Briefcase className="mr-2 h-4 w-4" /> Discover More Jobs
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <ResumeChatbot />
    </div>
  );
}
