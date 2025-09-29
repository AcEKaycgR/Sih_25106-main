'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Sparkles, Loader2, Award} from 'lucide-react';
import {
  generateTalentShortlist,
  type TalentShortlistOutput,
} from '@/ai/flows/talent-shortlist';
import type {Job} from '@/lib/types';
import {students} from '@/lib/data';
import Image from 'next/image';
import {Badge} from '../ui/badge';
import {Alert, AlertDescription, AlertTitle} from '../ui/alert';

// Dummy resumes for demonstration
const dummyResumes = [
  'Samantha Lee: CS Major at State University. Skills: React, Node.js, TypeScript. Interned at a startup.',
  'David Chen: Business Major at State University. Skills: Excel, PowerPoint, SQL. Finance club president.',
  'Maria Garcia: Economics Major at State University. Skills: R, Python, Data Analysis. Research assistant.',
];

export function TalentShortlist({job}: {job: Job}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortlist, setShortlist] = useState<TalentShortlistOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setShortlist(null);
    setIsOpen(true);

    try {
      const result = await generateTalentShortlist({
        jobDescription: job.description,
        skills: job.skills.join(', '),
        experience: 'Entry', // Example value
        qualifications: 'Bachelors Degree', // Example value
        candidateResumes: dummyResumes,
      });
      setShortlist(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate the shortlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleGenerate} disabled={isLoading}>
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Shortlist'}
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles />
              AI-Generated Talent Shortlist
            </DialogTitle>
            <DialogDescription>
              Top candidates for the &quot;{job.title}&quot; position based on AI analysis.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 max-h-[60vh] overflow-y-auto px-1">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing candidates...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {shortlist && (
              <div className="space-y-4">
                {shortlist.candidateRanking.map((candidate, index) => {
                  const student = students[candidate.candidateIndex];
                  if (!student) return null;
                  return (
                    <div
                      key={candidate.candidateIndex}
                      className="p-4 border rounded-lg flex gap-4 items-start"
                    >
                      <div className="text-2xl font-bold text-primary w-10 text-center">
                        #{index + 1}
                      </div>
                      <Image
                        src={student.avatarUrl}
                        alt={student.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">{student.name}</h4>
                          <Badge className="border-green-600 text-green-600">
                            {candidate.matchScore}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.reasoning}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button disabled={!shortlist}>
              <Award className="mr-2 h-4 w-4" />
              Contact Top Candidates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
