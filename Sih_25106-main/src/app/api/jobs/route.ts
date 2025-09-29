import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: 'ACTIVE'
      },
      include: {
        company: true,
        recruiter: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, type, skills, salary, experience, companyId, recruiterId } = body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        type,
        skills,
        salary,
        experience,
        companyId,
        recruiterId,
        status: 'ACTIVE'
      },
      include: {
        company: true,
        recruiter: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}