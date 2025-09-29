import type {User, Company, Job, Student, Application} from './types';
import placeholderImages from './placeholder-images.json';
import type { ImagePlaceholder } from './placeholder-images';

const findImage = (id: string) => (placeholderImages as ImagePlaceholder[]).find(p => p.id === id)?.imageUrl || '';

export const users: Record<string, User> = {
  student: {
    id: 'user-1',
    name: 'Alex Doe',
    email: 'alex.doe@university.edu',
    avatarUrl: findImage('user-1'),
    role: 'student',
  },
  mentor: {
    id: 'user-3',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@university.edu',
    avatarUrl: findImage('user-3'),
    role: 'mentor',
  },
  recruiter: {
    id: 'user-4',
    name: 'Ben Carter',
    email: 'ben.carter@techcorp.com',
    avatarUrl: findImage('user-4'),
    role: 'recruiter',
  },
};

export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechCorp',
    logoUrl: findImage('company-1'),
    website: 'techcorp.com',
    description: 'Innovating the future of technology, one line of code at a time.',
    slug: 'techcorp',
  },
  {
    id: 'comp-2',
    name: 'FinanceFirst',
    logoUrl: findImage('company-2'),
    website: 'financefirst.com',
    description: 'Your trusted partner in financial growth and stability.',
    slug: 'financefirst',
  },
  {
    id: 'comp-3',
    name: 'Consultia',
    logoUrl: findImage('company-3'),
    website: 'consultia.com',
    description: 'Strategic insights for a competitive edge.',
    slug: 'consultia',
  },
];

export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Software Engineer Intern',
    company: companies[0],
    location: 'Remote',
    type: 'Internship',
    description:
      'Join our team to work on exciting new projects. You will learn from experienced engineers and contribute to our core product.',
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 'job-2',
    title: 'Financial Analyst',
    company: companies[1],
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Analyze financial data and create financial models for decision support.',
    skills: ['Excel', 'Financial Modeling', 'SQL'],
  },
  {
    id: 'job-3',
    title: 'Marketing Associate',
    company: companies[0],
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Develop and implement marketing strategies to drive growth.',
    skills: ['SEO', 'Content Marketing', 'Social Media'],
  },
  {
    id: 'job-4',
    title: 'Jr. Business Consultant',
    company: companies[2],
    location: 'Chicago, IL',
    type: 'Internship',
    description: 'Work with clients to solve business challenges and improve performance.',
    skills: ['PowerPoint', 'Data Analysis', 'Communication'],
  },
];

export const students: Student[] = [
  {
    id: 'stu-1',
    name: 'Samantha Lee',
    avatarUrl: findImage('user-1'),
    major: 'Computer Science',
    graduationYear: 2025,
    university: 'State University',
  },
  {
    id: 'stu-2',
    name: 'David Chen',
    avatarUrl: findImage('user-2'),
    major: 'Business Administration',
    graduationYear: 2024,
    university: 'State University',
  },
  {
    id: 'stu-3',
    name: 'Maria Garcia',
    avatarUrl: 'https://picsum.photos/seed/u5/100/100',
    major: 'Economics',
    graduationYear: 2025,
    university: 'State University',
  },
];

export const applications: Application[] = [
  {
    id: 'app-1',
    job: jobs[0],
    student: students[0],
    status: 'Interviewing',
    appliedDate: '2024-05-15',
  },
  {
    id: 'app-2',
    job: jobs[2],
    student: students[0],
    status: 'Under Review',
    appliedDate: '2024-05-20',
  },
  {
    id: 'app-3',
    job: jobs[1],
    student: students[1],
    status: 'Offered',
    appliedDate: '2024-04-30',
  },
];
