import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { students, mentorId } = body;

    // Validate that mentorId exists
    const mentor = await prisma.mentor.findUnique({
      where: { id: mentorId }
    });

    if (!mentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      );
    }

    const createdStudents = [];
    
    for (const studentData of students) {
      try {
        // Create user first
        const user = await prisma.user.create({
          data: {
            email: studentData.email,
            name: studentData.name,
            avatarUrl: studentData.avatarUrl || '',
            role: 'STUDENT'
          }
        });

        // Create student profile
        const student = await prisma.student.create({
          data: {
            userId: user.id,
            major: studentData.major,
            graduationYear: parseInt(studentData.graduationYear),
            university: studentData.university,
            skills: studentData.skills ? studentData.skills.split(',').map((s: string) => s.trim()) : [],
            mentorId: mentorId
          },
          include: {
            user: true
          }
        });

        createdStudents.push(student);
      } catch (error) {
        console.error(`Error creating student ${studentData.email}:`, error);
        // Continue with other students even if one fails
      }
    }

    return NextResponse.json({
      message: `Successfully created ${createdStudents.length} students`,
      students: createdStudents
    }, { status: 201 });
  } catch (error) {
    console.error('Error bulk creating students:', error);
    return NextResponse.json(
      { error: 'Failed to create students' },
      { status: 500 }
    );
  }
}