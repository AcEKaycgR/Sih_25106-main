import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ResumeForm} from '@/components/student/resume-form';
import {Sparkles} from 'lucide-react';
import {ResumeChatbot} from '@/components/student/resume-chatbot';

export default function StudentResumePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Resume</CardTitle>
                <CardDescription>Keep your resume updated to attract recruiters.</CardDescription>
              </div>
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Improve with AI
              </Button>
            </CardHeader>
            <CardContent>
              <ResumeForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>This is how recruiters will see your resume.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md min-h-[500px] bg-muted/50">
                <h2>Alex Doe</h2>
                <p>alex.doe@university.edu | 555-123-4567 | linkedin.com/in/alexdoe</p>

                <h3>Education</h3>
                <p>
                  <strong>State University</strong>
                  <br />
                  Bachelor of Science in Computer Science
                  <br />
                  Expected Graduation: May 2025
                </p>

                <h3>Experience</h3>
                <p>
                  <strong>TechCorp</strong> - Software Engineer Intern
                  <br />
                  <em>June 2024 - August 2024</em>
                  <br />
                  - Developed and maintained web applications using React and Node.js.
                  <br />- Collaborated with a team of engineers to deliver high-quality code.
                </p>

                <h3>Skills</h3>
                <ul>
                  <li>
                    <strong>Languages:</strong> JavaScript, TypeScript, Python
                  </li>
                  <li>
                    <strong>Frameworks:</strong> React, Node.js, Express
                  </li>
                  <li>
                    <strong>Databases:</strong> MongoDB, PostgreSQL
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ResumeChatbot />
    </main>
  );
}
