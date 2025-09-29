import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Sparkles, Lightbulb, Calendar, CheckCircle} from 'lucide-react';
import {CareerCopilotCard} from '@/components/student/career-copilot-card';

const suggestions = [
  {
    icon: Lightbulb,
    title: 'New Skill Suggestion',
    description: "Based on your interest in 'Software Engineer' roles, consider learning 'Go' or 'Rust' to stand out.",
    cta: 'Explore Courses',
  },
  {
    icon: Calendar,
    title: 'Application Deadline Reminder',
    description: "The deadline for the 'Product Manager Intern' role at Innovate Inc. is this Friday.",
    cta: 'Apply Now',
  },
  {
    icon: CheckCircle,
    title: 'Interview Prep Available',
    description: 'You have an interview with TechCorp next week. We have prepared some common questions for you.',
    cta: 'Start Practicing',
  },
  {
    icon: Lightbulb,
    title: 'Project Idea',
    description: 'Build a full-stack MERN application to showcase your skills. This would be a great addition to your resume.',
    cta: 'Learn More',
  },
];

export default function CareerCopilotPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Co-pilot</h1>
          <p className="text-muted-foreground">
            Your personal guide to career success. Here are your latest nudges.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((item, index) => (
          <CareerCopilotCard key={index} {...item} />
        ))}
      </div>
    </main>
  );
}
