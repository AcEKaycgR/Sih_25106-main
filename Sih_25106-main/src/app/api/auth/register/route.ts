import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, name, picture, role, profileData } = body;

    console.log('Registration request:', { uid, email, name, role, profileData });

    // Validate required fields
    if (!uid || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: uid, email, or role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      console.log('User already exists:', user.email);
      return NextResponse.json({ user }, { status: 200 });
    }

    console.log('Creating new user...');
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

    console.log('User created:', user.id);

    // Create role-specific profile
    if (role === 'student') {
      console.log('Creating student profile...');
      await prisma.student.create({
        data: {
          userId: user.id,
          major: profileData?.major || 'Undeclared',
          graduationYear: profileData?.graduationYear || new Date().getFullYear() + 4,
          university: profileData?.university || 'Not Specified',
          skills: profileData?.skills || []
        }
      });
    } else if (role === 'mentor') {
      console.log('Creating mentor profile...');
      await prisma.mentor.create({
        data: {
          userId: user.id,
          department: profileData?.department || 'General',
          university: profileData?.university || 'Not Specified',
          specialization: profileData?.specialization || 'General Mentoring'
        }
      });
    } else if (role === 'recruiter') {
      console.log('Creating recruiter profile...');
      // For recruiters, we'll create a default company if none provided
      let companyId = profileData?.companyId;
      if (!companyId) {
        const defaultCompany = await prisma.company.create({
          data: {
            name: 'Independent Recruiter',
            description: 'Independent recruiting services',
            website: '',
            location: 'Various'
          }
        });
        companyId = defaultCompany.id;
      }
      
      await prisma.recruiter.create({
        data: {
          userId: user.id,
          companyId: companyId,
          position: profileData?.position || 'Recruiter'
        }
      });
    }

    console.log('Registration completed successfully');
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating auth user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}