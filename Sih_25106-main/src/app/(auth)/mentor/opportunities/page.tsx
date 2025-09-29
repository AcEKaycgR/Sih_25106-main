
'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {jobs as staticJobs} from '@/lib/data';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
import {PlusCircle} from 'lucide-react';
import {db} from '@/lib/firebase';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {useState, useTransition} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useToast} from '@/hooks/use-toast';
import {Loader2} from 'lucide-react';

export default function MentorOpportunitiesPage() {
  const {toast} = useToast();
  const [isPending, startTransition] = useTransition();
  const {register, handleSubmit, control, reset} = useForm({
    defaultValues: {
      title: '',
      company: '',
      type: 'internship',
      description: '',
    },
  });

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        await addDoc(collection(db, 'opportunities'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        toast({
          title: 'Opportunity Posted!',
          description: 'Your new opportunity has been shared with students.',
        });
        reset();
      } catch (error) {
        console.error('Error posting opportunity:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to post opportunity. Please try again.',
        });
      }
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Posted Opportunities</CardTitle>
            <CardDescription>Opportunities you have shared with students.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticJobs.slice(0, 3).map(job => (
                <div key={job.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                  <Image
                    alt={`${job.company.name} logo`}
                    className="aspect-square rounded-md object-contain"
                    height="48"
                    src={job.company.logoUrl}
                    width="48"
                  />
                  <div className="grid gap-1 flex-1">
                    <p className="text-sm font-medium leading-none">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company.name}</p>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Post an Opportunity</CardTitle>
              <CardDescription>
                Share a new job, internship, or event with your students.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Software Engineer Intern" {...register('title')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="e.g. TechCorp" {...register('company')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Opportunity Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({field}) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="full-time">Full-time Job</SelectItem>
                        <SelectItem value="part-time">Part-time Job</SelectItem>
                        <SelectItem value="event">Networking Event</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the opportunity."
                  {...register('description')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="mr-2 h-4 w-4" />
                )}
                Post Opportunity
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
}
