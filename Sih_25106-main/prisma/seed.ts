import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create companies
  const techCorp = await prisma.company.upsert({
    where: { slug: 'techcorp' },
    update: {},
    create: {
      name: 'TechCorp',
      slug: 'techcorp',
      logoUrl: 'https://via.placeholder.com/100x100?text=TC',
      website: 'https://techcorp.com',
      description: 'Innovating the future of technology, one line of code at a time.',
      verified: true
    }
  });

  const financeFirst = await prisma.company.upsert({
    where: { slug: 'financefirst' },
    update: {},
    create: {
      name: 'FinanceFirst',
      slug: 'financefirst',
      logoUrl: 'https://via.placeholder.com/100x100?text=FF',
      website: 'https://financefirst.com',
      description: 'Your trusted partner in financial growth and stability.',
      verified: true
    }
  });

  const consultia = await prisma.company.upsert({
    where: { slug: 'consultia' },
    update: {},
    create: {
      name: 'Consultia',
      slug: 'consultia',
      logoUrl: 'https://via.placeholder.com/100x100?text=CO',
      website: 'https://consultia.com',
      description: 'Strategic consulting for the modern business landscape.',
      verified: true
    }
  });

  // Create users
  const studentUser = await prisma.user.upsert({
    where: { email: 'alex.doe@university.edu' },
    update: {},
    create: {
      email: 'alex.doe@university.edu',
      name: 'Alex Doe',
      avatarUrl: 'https://via.placeholder.com/100x100?text=AD',
      role: 'STUDENT'
    }
  });

  const mentorUser = await prisma.user.upsert({
    where: { email: 'e.reed@university.edu' },
    update: {},
    create: {
      email: 'e.reed@university.edu',
      name: 'Dr. Evelyn Reed',
      avatarUrl: 'https://via.placeholder.com/100x100?text=ER',
      role: 'MENTOR'
    }
  });

  const recruiterUser = await prisma.user.upsert({
    where: { email: 'ben.carter@techcorp.com' },
    update: {},
    create: {
      email: 'ben.carter@techcorp.com',
      name: 'Ben Carter',
      avatarUrl: 'https://via.placeholder.com/100x100?text=BC',
      role: 'RECRUITER'
    }
  });

  // Create profiles
  const mentor = await prisma.mentor.upsert({
    where: { userId: mentorUser.id },
    update: {},
    create: {
      userId: mentorUser.id,
      department: 'Computer Science',
      university: 'Indian Institute of Technology',
      specialization: 'Artificial Intelligence'
    }
  });

  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      major: 'Computer Science',
      graduationYear: 2025,
      university: 'Indian Institute of Technology',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      mentorId: mentor.id
    }
  });

  const recruiter = await prisma.recruiter.upsert({
    where: { userId: recruiterUser.id },
    update: {},
    create: {
      userId: recruiterUser.id,
      companyId: techCorp.id,
      title: 'Senior Technical Recruiter',
      verified: true
    }
  });

  // Create jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Frontend Developer Intern',
      description: 'Join our team to build amazing user interfaces using React and TypeScript.',
      location: 'Bangalore, India',
      type: 'INTERNSHIP',
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      salary: '₹25,000/month',
      experience: '0-1 years',
      companyId: techCorp.id,
      recruiterId: recruiter.id,
      status: 'ACTIVE'
    }
  });

  const job2 = await prisma.job.create({
    data: {
      title: 'Full Stack Developer',
      description: 'Work on both frontend and backend technologies to build scalable applications.',
      location: 'Mumbai, India',
      type: 'FULL_TIME',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      salary: '₹8-12 LPA',
      experience: '2-4 years',
      companyId: techCorp.id,
      recruiterId: recruiter.id,
      status: 'ACTIVE'
    }
  });

  const job3 = await prisma.job.create({
    data: {
      title: 'Data Analyst Intern',
      description: 'Analyze financial data and create insights for investment decisions.',
      location: 'Delhi, India',
      type: 'INTERNSHIP',
      skills: ['Python', 'SQL', 'Excel', 'Statistics'],
      salary: '₹20,000/month',
      experience: '0-1 years',
      companyId: financeFirst.id,
      recruiterId: recruiter.id,
      status: 'ACTIVE'
    }
  });

  // Create applications
  await prisma.application.create({
    data: {
      studentId: student.id,
      jobId: job1.id,
      status: 'APPLIED',
      coverLetter: 'I am excited to apply for this frontend developer position...'
    }
  });

  await prisma.application.create({
    data: {
      studentId: student.id,
      jobId: job3.id,
      status: 'UNDER_REVIEW',
      coverLetter: 'I would love to contribute to your data analysis team...'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created:`);
  console.log(`   - 3 companies`);
  console.log(`   - 3 users (1 student, 1 mentor, 1 recruiter)`);
  console.log(`   - 3 jobs`);
  console.log(`   - 2 applications`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });