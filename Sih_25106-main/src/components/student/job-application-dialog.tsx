'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ApiService } from '@/lib/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface JobApplicationDialogProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function JobApplicationDialog({
  jobId,
  jobTitle,
  companyName,
  open,
  onOpenChange,
  onSuccess
}: JobApplicationDialogProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to apply for jobs.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get user's student profile
      const userResponse = await fetch(`/api/auth/user/${user.uid}`);
      const userData = await userResponse.json();

      if (!userData.studentProfile) {
        toast({
          variant: 'destructive',
          title: 'Profile Incomplete',
          description: 'Please complete your student profile first.',
        });
        return;
      }

      await ApiService.createApplication({
        studentId: userData.studentProfile.id,
        jobId,
        coverLetter,
        resumeUrl: userData.studentProfile.resumeUrl
      });

      toast({
        title: 'Application Submitted!',
        description: `Your application for ${jobTitle} at ${companyName} has been submitted.`,
      });

      onSuccess();
      onOpenChange(false);
      setCoverLetter('');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: 'destructive',
        title: 'Application Failed',
        description: 'Failed to submit your application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            You're applying for {jobTitle} at {companyName}. Tell them why you're interested!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Write a brief cover letter explaining your interest and qualifications..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !coverLetter.trim()}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}