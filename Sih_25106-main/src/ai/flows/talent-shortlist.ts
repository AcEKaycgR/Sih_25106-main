// src/ai/flows/talent-shortlist.ts
'use server';

/**
 * @fileOverview A flow to generate a shortlist of top 10 candidates for a job posting.
 *
 * - generateTalentShortlist - A function that generates a talent shortlist based on job posting details.
 * - TalentShortlistInput - The input type for the generateTalentShortlist function.
 * - TalentShortlistOutput - The return type for the generateTalentShortlist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TalentShortlistInputSchema = z.object({
  jobDescription: z.string().describe('Detailed description of the job posting.'),
  skills: z.string().describe('Comma-separated list of required skills.'),
  experience: z.string().describe('Required experience level (e.g., Entry, Mid, Senior).'),
  qualifications: z.string().describe('List of required qualifications or certifications.'),
  candidateResumes: z.array(z.string()).describe('Array of candidate resumes as text.'),
});
export type TalentShortlistInput = z.infer<typeof TalentShortlistInputSchema>;

const TalentShortlistOutputSchema = z.object({
  candidateRanking: z.array(
    z.object({
      candidateIndex: z.number().describe('Index of the candidate in the input array.'),
      matchScore: z.number().describe('A score indicating how well the candidate matches the job requirements.'),
      reasoning: z.string().describe('Explanation for the candidate ranking.'),
    })
  ).describe('A ranked list of candidate indices and their match scores, limited to top 10.'),
});
export type TalentShortlistOutput = z.infer<typeof TalentShortlistOutputSchema>;

export async function generateTalentShortlist(input: TalentShortlistInput): Promise<TalentShortlistOutput> {
  return talentShortlistFlow(input);
}

const talentShortlistPrompt = ai.definePrompt({
  name: 'talentShortlistPrompt',
  input: {schema: TalentShortlistInputSchema},
  output: {schema: TalentShortlistOutputSchema},
  prompt: `You are an expert recruiter tasked with shortlisting the top 10 candidates for a job posting.

  Job Description: {{{jobDescription}}}
  Required Skills: {{{skills}}}
  Required Experience: {{{experience}}}
  Required Qualifications: {{{qualifications}}}

  You are provided with an array of candidate resumes. Rank the candidates based on their suitability for the job.

  Candidate Resumes:
  {{#each candidateResumes}}
  Candidate {{@index}}: {{{this}}}
  {{/each}}

  Return a ranked list of candidate indices and their match scores, limited to the top 10 candidates.
  Provide a brief explanation for each candidate's ranking.

  Make sure that the candidateIndex refers to the index in the candidateResumes array.
  `,
});

const talentShortlistFlow = ai.defineFlow(
  {
    name: 'talentShortlistFlow',
    inputSchema: TalentShortlistInputSchema,
    outputSchema: TalentShortlistOutputSchema,
  },
  async input => {
    const {output} = await talentShortlistPrompt(input);
    return output!;
  }
);
