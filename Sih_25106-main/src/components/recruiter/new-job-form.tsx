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
import {PlusCircle} from 'lucide-react';

export function NewJobForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>Quickly create a new posting to find talent.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" placeholder="e.g. Software Engineer Intern" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. San Francisco, CA or Remote" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea id="description" placeholder="A brief summary of the role." />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Post Job
        </Button>
      </CardFooter>
    </Card>
  );
}
