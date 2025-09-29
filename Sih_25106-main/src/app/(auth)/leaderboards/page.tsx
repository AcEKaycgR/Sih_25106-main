
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Trophy, Loader2} from 'lucide-react';
import {db, auth} from '@/lib/firebase';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import type {Student} from '@/lib/types';
import {Progress} from '@/components/ui/progress';
import Image from 'next/image';

export default function LeaderboardsPage() {
  const [user, loadingAuth] = useAuthState(auth);

  // For this demo, we assume students are assigned to mentors via a 'mentorId' field.
  const studentsQuery =
    user && !loadingAuth
      ? query(collection(db, 'students'), where('mentorId', '==', user.uid))
      : null;

  const [students, loadingStudents] = useCollectionData(studentsQuery);

  const leaderboardData = (students as Student[])
    ?.map(student => ({
      ...student,
      // In a real app, this progress would come from tracking applications, interviews, etc.
      // For now, we'll generate a random-like progress value based on their ID.
      progress: (student.name.length * 13) % 100,
    }))
    .sort((a, b) => b.progress - a.progress);

  const isLoading = loadingAuth || loadingStudents;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Trophy className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Leaderboard</h1>
          <p className="text-muted-foreground">
            Track the placement progress of your students.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Student Rankings</CardTitle>
          <CardDescription>
            Rankings are based on overall profile and application progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : leaderboardData && leaderboardData.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-bold text-lg text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.avatarUrl}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.major}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">{item.progress}%</span>
                          <Progress value={item.progress} className="h-2 w-24" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <p>No students have been assigned to you yet.</p>
              <p className="text-sm mt-2">
                Use the &quot;Upload via Excel&quot; feature on the Students page to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
