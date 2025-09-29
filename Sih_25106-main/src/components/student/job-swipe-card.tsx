'use client';

import { useState } from 'react';
import type { JobWithCompany } from '@/hooks/use-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {MapPin, Briefcase} from 'lucide-react';
import { JobApplicationDialog } from './job-application-dialog';

interface JobSwipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  job: JobWithCompany;
  onApplicationSuccess?: () => void;
}

export function JobSwipeCard({job, onApplicationSuccess, ...props}: JobSwipeCardProps) {
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  return (
    <>
      <Card
        className="absolute w-full h-full rounded-2xl shadow-xl border overflow-hidden"
        {...props}
      >
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={job.company.logoUrl || `https://picsum.photos/seed/${job.id}/600/400`}
              alt={job.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <CardDescription className="text-gray-300">{job.company.name}</CardDescription>
            </div>
            <Image
              src={job.company.logoUrl || `https://placehold.co/60x60?text=${job.company.name.charAt(0)}`}
              alt={`${job.company.name} logo`}
              width={60}
              height={60}
              className="absolute top-4 right-4 rounded-lg bg-white p-1 border"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
          {job.salary && (
            <div className="text-sm font-medium text-green-600">
              {job.salary}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {job.skills.map(skill => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <Button 
            className="w-full" 
            onClick={() => setApplicationDialogOpen(true)}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>
      
      <JobApplicationDialog
        jobId={job.id}
        jobTitle={job.title}
        companyName={job.company.name}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
        onSuccess={onApplicationSuccess || (() => {})}
      />
    </>
  );
}