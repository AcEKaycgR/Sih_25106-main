import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ArrowRight, type LucideIcon} from 'lucide-react';

interface CareerCopilotCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
}

export function CareerCopilotCard({icon: Icon, title, description, cta}: CareerCopilotCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-end">
        <Button variant="outline" className="w-full">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
