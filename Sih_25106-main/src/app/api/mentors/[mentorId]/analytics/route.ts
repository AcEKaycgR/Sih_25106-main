import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { mentorId: string } }
) {
  try {
    const { mentorId } = params;

    // Get mentor's students with their applications
    const students = await prisma.student.findMany({
      where: { mentorId },
      include: {
        user: true,
        applications: {
          include: {
            job: {
              include: {
                company: true
              }
            }
          }
        }
      }
    });

    // Calculate analytics
    const totalStudents = students.length;
    const studentsWithApplications = students.filter((s: any) => s.applications.length > 0).length;
    const totalApplications = students.reduce((sum: number, s: any) => sum + s.applications.length, 0);
    
    const applicationsByStatus = students.reduce((acc: Record<string, number>, student: any) => {
      student.applications.forEach((app: any) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const placementRate = totalStudents > 0 ? 
      ((applicationsByStatus.OFFERED || 0) / totalStudents * 100).toFixed(1) : '0';

    // Get applications by month for chart data
    const applicationsByMonth = students.reduce((acc: Record<string, number>, student: any) => {
      student.applications.forEach((app: any) => {
        const month = new Date(app.appliedAt).toISOString().slice(0, 7); // YYYY-MM
        acc[month] = (acc[month] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    // Top companies by application count
    const companyCounts = students.reduce((acc: Record<string, number>, student: any) => {
      student.applications.forEach((app: any) => {
        const companyName = app.job.company.name;
        acc[companyName] = (acc[companyName] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topCompanies = Object.entries(companyCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      overview: {
        totalStudents,
        studentsWithApplications,
        totalApplications,
        placementRate: parseFloat(placementRate),
        applicationsByStatus
      },
      chartData: {
        applicationsByMonth: Object.entries(applicationsByMonth).map(([month, count]) => ({
          month,
          count
        })),
        topCompanies
      },
      students: students.map((student: any) => ({
        id: student.id,
        name: student.user.name,
        email: student.user.email,
        major: student.major,
        graduationYear: student.graduationYear,
        applicationCount: student.applications.length,
        latestApplicationStatus: student.applications.length > 0 ? 
          student.applications.sort((a: any, b: any) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())[0].status : 
          null
      }))
    });
  } catch (error) {
    console.error('Error fetching mentor analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}