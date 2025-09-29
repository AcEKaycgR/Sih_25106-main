import type {LucideIcon} from 'lucide-react';

export type UserRole = 'student' | 'mentor' | 'recruiter';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
};

export type Job = {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: 'Internship' | 'Full-time' | 'Part-time';
  description: string;
  skills: string[];
};

export type Application = {
  id: string;
  job: Job;
  student: Student;
  status: 'Applied' | 'Under Review' | 'Interviewing' | 'Offered' | 'Rejected';
  appliedDate: string;
};

export type Student = {
  id: string;
  name: string;
  avatarUrl: string;
  major: string;
  graduationYear: number;
  university: string;
};

export type Company = {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  description: string;
  slug: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};
