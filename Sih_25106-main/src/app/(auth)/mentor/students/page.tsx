'use client';

import { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {PlusCircle, Upload, Loader2, BarChart3, Users, TrendingUp, Award} from 'lucide-react';
import {StudentsTable} from '@/components/mentor/students-table';
import { BulkStudentUpload } from '@/components/mentor/bulk-student-upload';
import {useToast} from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function MentorStudentsPage() {
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const {toast} = useToast();

  const fetchData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get user's mentor profile
      const userResponse = await fetch(`/api/auth/user/${user.uid}`);
      const userData = await userResponse.json();
      
      if (!userData.mentorProfile) {
        console.error('User does not have a mentor profile');
        return;
      }

      // Fetch analytics
      const analyticsResponse = await fetch(`/api/mentors/${userData.mentorProfile.id}/analytics`);
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
        setStudents(analyticsData.students);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load student data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUploadSuccess = () => {
    fetchData();
    toast({
      title: 'Students uploaded successfully!',
      description: 'Your students have been added to the system.',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      {/* Analytics Overview */}
      {analytics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.overview.studentsWithApplications} actively applying
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                Across all students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.placementRate}%</div>
              <p className="text-xs text-muted-foreground">
                Students with offers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.overview.applicationsByStatus.UNDER_REVIEW || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending applications
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View, add, and manage your students.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setBulkUploadOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload via Excel
              </Button>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pb-4">
            <Input placeholder="Search students by name or major..." className="max-w-md" />
          </div>
          <StudentsTable students={students} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{Math.min(10, students.length)}</strong> of <strong>{students.length}</strong> students
          </div>
        </CardFooter>
      </Card>

      {/* Bulk Upload Dialog */}
      {user && (
        <BulkStudentUpload
          mentorId={analytics?.students?.[0]?.mentorId || ''} // This should come from the mentor profile
          open={bulkUploadOpen}
          onOpenChange={setBulkUploadOpen}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}