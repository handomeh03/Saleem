import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with initial roles, admin, doctors, schedules, and appointments...');

  // 1. Roles Seed
  const adminRole = await prisma.role.upsert({
    where: { roleName: 'admin' },
    update: {},
    create: { roleName: 'admin' },
  });

  const doctorRole = await prisma.role.upsert({
    where: { roleName: 'doctor' },
    update: {},
    create: { roleName: 'doctor' },
  });

  console.log('✅ Roles seeded successfully.');

  const hashedPassword = await bcrypt.hash('12345678', 10);

  // 2. Admin User Seed
  const adminUser = await prisma.user.upsert({
    where: { email: 'jameel3@gmail.com' },
    update: {},
    create: {
      name: 'Jameel Admin',
      email: 'jameel3@gmail.com',
      password: hashedPassword,
      phone: '+962790000000',
      isActive: true,
      roleId: adminRole.id,
    },
  });

  console.log('✅ Admin user created successfully:', { email: adminUser.email, role: 'admin' });

  // 3. Doctors Seed (Creating 2 Sample Doctors)
  const doctor1User = await prisma.user.upsert({
    where: { email: 'dr.ahmed@gmail.com' },
    update: {},
    create: {
      name: 'Dr. Ahmed Ali',
      email: 'dr.ahmed@gmail.com',
      password: hashedPassword,
      phone: '+962791111111',
      isActive: true,
      roleId: doctorRole.id,
      doctor: {
        create: {
          specialization: 'Cardiology',
          bio: 'Consultant cardiologist with over 10 years of experience in heart diseases and interventions.',
        },
      },
    },
    include: { doctor: true },
  });

  const doctor2User = await prisma.user.upsert({
    where: { email: 'dr.sara@gmail.com' },
    update: {},
    create: {
      name: 'Dr. Sara Mahmoud',
      email: 'dr.sara@gmail.com',
      password: hashedPassword,
      phone: '+962792222222',
      isActive: true,
      roleId: doctorRole.id,
      doctor: {
        create: {
          specialization: 'Dermatology',
          bio: 'Specialist in skin care, cosmetic dermatology, and laser treatments.',
        },
      },
    },
    include: { doctor: true },
  });

  console.log('✅ Sample doctors seeded successfully.');

  // 4. Doctor Schedules & Daily Availabilities Seed
  // Get today's date dynamically in 'YYYY-MM-DD'
  const todayStr = new Date().toISOString().split('T')[0];

  if (doctor1User.doctor) {
    const schedule1 = await prisma.doctorSchedule.create({
      data: {
        doctorId: doctor1User.id,
        start_date: new Date(todayStr),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)), // valid for next 30 days
        daily_availability: {
          create: {
            date: todayStr,
            start_time: '09:00',
            end_time: '17:00',
            status: true,
          },
        },
      },
    });

    // 5. Sample Appointment Seed for Doctor 1 (e.g., booked slot from 10:00 to 10:30)
    await prisma.appointment.create({
      data: {
        doctorId: doctor1User.id,
        patient_code: 'PAT-1001',
        date: todayStr,
        from_time: '10:00',
        to_time: '10:30',
        status: 'PENDING',
        description: 'Routine checkup and chest pain consultation.',
      },
    });
  }

  if (doctor2User.doctor) {
    await prisma.doctorSchedule.create({
      data: {
        doctorId: doctor2User.id,
        start_date: new Date(todayStr),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        daily_availability: {
          create: {
            date: todayStr,
            start_time: '10:00',
            end_time: '16:00',
            status: true,
          },
        },
      },
    });
  }

  console.log('✅ Schedules and sample appointments seeded successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });