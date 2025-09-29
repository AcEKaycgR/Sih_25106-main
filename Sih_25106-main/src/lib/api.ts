// API service layer for JobZen India
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9002';

export class ApiService {
  private static async fetchApi(endpoint: string, options?: RequestInit) {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Jobs API
  static async getJobs() {
    return this.fetchApi('/jobs');
  }

  static async createJob(jobData: any) {
    return this.fetchApi('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  // Applications API
  static async getApplications() {
    return this.fetchApi('/applications');
  }

  static async createApplication(applicationData: any) {
    return this.fetchApi('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  // Users API
  static async getUsers() {
    return this.fetchApi('/users');
  }

  static async createUser(userData: any) {
    return this.fetchApi('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Companies API
  static async getCompanies() {
    return this.fetchApi('/companies');
  }

  static async createCompany(companyData: any) {
    return this.fetchApi('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }
}