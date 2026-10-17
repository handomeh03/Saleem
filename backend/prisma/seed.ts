import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with initial roles and admin user...');

  
  const adminRole = await prisma.role.upsert({
    where: { roleName: 'admin' },
    update: {},
    create: {
      roleName: 'admin',
    },
  });

  
  const doctorRole = await prisma.role.upsert({
    where: { roleName: 'doctor' },
    update: {},
    create: {
      roleName: 'doctor',
    },
  });

  console.log('✅ Roles seeded successfully.');

  
  const hashedPassword = await bcrypt.hash('12345678', 10);

  
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

  console.log('✅ Admin user created successfully:');
  console.log({ email: adminUser.email, role: 'admin' });
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });