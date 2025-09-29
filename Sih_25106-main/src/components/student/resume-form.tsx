'use client';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Trash2} from 'lucide-react';

export function ResumeForm() {
  return (
    <form>
      <Accordion type="multiple" defaultValue={['personal', 'experience']} className="w-full">
        <AccordionItem value="personal">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Alex Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex.doe@university.edu" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="555-123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" defaultValue="linkedin.com/in/alexdoe" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="border p-4 rounded-md space-y-4 relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor="school">University/School</Label>
                <Input id="school" defaultValue="State University" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" defaultValue="Bachelor of Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" defaultValue="Computer Science" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grad-year">Graduation Year</Label>
                  <Input id="grad-year" defaultValue="2025" />
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="border p-4 rounded-md space-y-4 relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="TechCorp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" defaultValue="Software Engineer Intern" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" defaultValue="June 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" defaultValue="August 2024" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-description">Description</Label>
                <Textarea
                  id="job-description"
                  defaultValue="- Developed and maintained web applications using React and Node.js."
                />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Add skills (comma separated)</Label>
              <Textarea defaultValue="JavaScript, TypeScript, Python, React, Node.js, Express, MongoDB, PostgreSQL" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-end mt-6">
        <Button>Save Resume</Button>
      </div>
    </form>
  );
}
