'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import {MapPin, Briefcase, DollarSign, ArrowRight, X, Heart, Settings2, Loader2} from 'lucide-react';
import {JobSwipeCard} from '@/components/student/job-swipe-card';
import { useJobs } from '@/hooks/use-data';

export default function StudentJobDiscoveryPage() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500">Error loading jobs: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between p-4 md:p-8 border-b">
        <div>
          <h1 className="text-2xl font-bold">Discover Jobs</h1>
          <p className="text-muted-foreground">Swipe right to like, left to pass.</p>
        </div>
        <Button variant="outline">
          <Settings2 className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-muted/40">
        <div className="w-full max-w-sm h-[550px] relative">
          {jobs.map((job, index) => (
            <JobSwipeCard
              key={job.id}
              job={job}
              style={{
                zIndex: jobs.length - index,
                transform: `translateY(-${index * 10}px) scale(${1 - index * 0.05})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-8 mt-8">
          <Button variant="outline" size="icon" className="h-20 w-20 rounded-full bg-white shadow-lg">
            <X className="h-10 w-10 text-destructive" />
          </Button>
          <Button variant="outline" size="icon" className="h-24 w-24 rounded-full bg-white shadow-lg">
            <Heart className="h-12 w-12 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
