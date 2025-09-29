'use server';

/**
 * @fileOverview An AI chatbot flow for helping students improve their resumes.
 *
 * - resumeHelpChatbot - A function that handles the resume improvement process.
 * - ResumeHelpChatbotInput - The input type for the resumeHelpChatbot function.
 * - ResumeHelpChatbotOutput - The return type for the resumeHelpChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeHelpChatbotInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the student\'s resume.'),
  query: z.string().describe('The student\'s query about their resume.'),
});
export type ResumeHelpChatbotInput = z.infer<typeof ResumeHelpChatbotInputSchema>;

const ResumeHelpChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the student\'s query, providing resume improvement suggestions.'),
});
export type ResumeHelpChatbotOutput = z.infer<typeof ResumeHelpChatbotOutputSchema>;

export async function resumeHelpChatbot(input: ResumeHelpChatbotInput): Promise<ResumeHelpChatbotOutput> {
  return resumeHelpChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeHelpChatbotPrompt',
  input: {schema: ResumeHelpChatbotInputSchema},
  output: {schema: ResumeHelpChatbotOutputSchema},
  prompt: `You are an AI chatbot assistant designed to help students improve their resumes.

  A student has provided you with the text of their resume, as well as a query about how to improve it.  Provide a helpful and detailed response to the student, giving specific suggestions for improvement where possible.

  Resume Text: {{{resumeText}}}
  Student Query: {{{query}}}
  `,
});

const resumeHelpChatbotFlow = ai.defineFlow(
  {
    name: 'resumeHelpChatbotFlow',
    inputSchema: ResumeHelpChatbotInputSchema,
    outputSchema: ResumeHelpChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
