// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const course = await prisma.course.create({
        data: {
            creator: 'admin',
            title: Buffer.from('Intro to Web Dev'),
            description: Buffer.from('A beginner-friendly course.'),
            metadata: Buffer.from(JSON.stringify({ difficulty: 'beginner' })),
        },
    });

    console.log(`Seeded course with ID: ${course.id}`);
}

main()
    .then(() => {
        console.log('Seeding completed.');
        return prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Seeding error:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
