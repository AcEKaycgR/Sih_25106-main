import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/firebase';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, role, profileData } = body;

    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          id: uid,
          email,
          name: name || 'Unknown User',
          avatarUrl: picture || '',
          role: role.toUpperCase()
        }
      });

      // Create role-specific profile
      if (role === 'student' && profileData) {
        await prisma.student.create({
          data: {
            userId: user.id,
            major: profileData.major,
            graduationYear: profileData.graduationYear,
            university: profileData.university,
            skills: profileData.skills || []
          }
        });
      } else if (role === 'mentor' && profileData) {
        await prisma.mentor.create({
          data: {
            userId: user.id,
            department: profileData.department,
            university: profileData.university,
            specialization: profileData.specialization
          }
        });
      } else if (role === 'recruiter' && profileData) {
        await prisma.recruiter.create({
          data: {
            userId: user.id,
            companyId: profileData.companyId,
            title: profileData.title
          }
        });
      }
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating auth user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}