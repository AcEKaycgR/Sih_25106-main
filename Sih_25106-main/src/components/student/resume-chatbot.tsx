
'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Bot, Send, Sparkles, User, Loader2} from 'lucide-react';
import {resumeHelpChatbot, type ResumeHelpChatbotOutput} from '@/ai/flows/resume-help-chatbot';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '@/lib/firebase';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function ResumeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content:
        "Hello! I'm your resume assistant. How can I help you improve your resume today? For example, ask me 'How can I improve my experience section?'",
    },
  ]);

  useEffect(() => {
    if (user) {
      const fetchResume = async () => {
        const resumeRef = doc(db, 'resumes', user.uid);
        const resumeSnap = await getDoc(resumeRef);
        if (resumeSnap.exists()) {
          const resumeData = resumeSnap.data();
          // Convert resume data to a string format for the AI
          const text = `
            Name: ${resumeData.fullName}
            Email: ${resumeData.email}
            Phone: ${resumeData.phone}
            LinkedIn: ${resumeData.linkedin}

            Education:
            ${resumeData.education?.map((edu: any) => `${edu.school} - ${edu.degree} in ${edu.major}, graduating ${edu.gradYear}`).join('\n') || ''}

            Experience:
            ${resumeData.experience?.map((exp: any) => `${exp.company} - ${exp.jobTitle} (${exp.startDate} - ${exp.endDate})\n${exp.description}`).join('\n\n') || ''}

            Skills:
            ${resumeData.skills || ''}
          `;
          setResumeText(text);
        } else {
          // Fallback to dummy data if no resume is found
          setResumeText(`
            Alex Doe
            alex.doe@university.edu | 555-123-4567 | linkedin.com/in/alexdoe

            Education
            State University - Bachelor of Science in Computer Science
            Expected Graduation: May 2025

            Experience
            TechCorp - Software Engineer Intern (Summer 2024)
            - Developed and maintained web applications using React and Node.js.
            - Collaborated with a team of engineers to deliver high-quality code.

            Skills
            - Languages: JavaScript, TypeScript, Python
            - Frameworks: React, Node.js, Express
            - Databases: MongoDB, PostgreSQL
          `);
        }
      };
      fetchResume();
    }
  }, [user]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {role: 'user', content: input};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!resumeText) {
        throw new Error('Resume not loaded yet.');
      }
      const result: ResumeHelpChatbotOutput = await resumeHelpChatbot({
        resumeText,
        query: input,
      });

      const botMessage: Message = {role: 'bot', content: result.response};
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Error with resume chatbot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-6 w-6" />
        <span className="sr-only">Open Resume Helper</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-2">
              <Bot /> Resume Helper
            </DialogTitle>
            <DialogDescription>
              Ask me anything about your resume for AI-powered feedback.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[50vh] px-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'bot' && (
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                    <div className="p-2 bg-muted rounded-full text-foreground">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-lg p-3 max-w-[80%] text-sm bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-6 pt-2">
            <div className="relative">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading || loading}
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleSend}
                disabled={isLoading || loading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
