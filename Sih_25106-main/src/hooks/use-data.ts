'use client';

import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';

export interface JobWithCompany {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  skills: string[];
  salary?: string;
  experience?: string;
  status: string;
  createdAt: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    slug: string;
  };
}

export interface ApplicationWithJobAndStudent {
  id: string;
  status: string;
  appliedAt: string;
  coverLetter?: string;
  job: JobWithCompany;
  student: {
    id: string;
    user: {
      name: string;
      email: string;
      avatarUrl?: string;
    };
  };
}

export function useJobs() {
  const [jobs, setJobs] = useState<JobWithCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const data = await ApiService.getJobs();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, loading, error, refetch: () => {
    setLoading(true);
    setError(null);
    ApiService.getJobs().then(setJobs).catch(err => 
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs')
    ).finally(() => setLoading(false));
  }};
}

export function useApplications() {
  const [applications, setApplications] = useState<ApplicationWithJobAndStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        const data = await ApiService.getApplications();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return { applications, loading, error, refetch: () => {
    setLoading(true);
    setError(null);
    ApiService.getApplications().then(setApplications).catch(err => 
      setError(err instanceof Error ? err.message : 'Failed to fetch applications')
    ).finally(() => setLoading(false));
  }};
}

export function useCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const data = await ApiService.getCompanies();
        setCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  return { companies, loading, error };
}