import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: {
            company: true
          }
        },
        student: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        appliedAt: 'desc'
      }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, jobId, coverLetter, resumeUrl } = body;

    // Check if application already exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId,
          jobId
        }
      }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Application already exists' },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        studentId,
        jobId,
        coverLetter,
        resumeUrl,
        status: 'APPLIED'
      },
      include: {
        job: {
          include: {
            company: true
          }
        },
        student: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}