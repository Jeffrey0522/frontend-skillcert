import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Create test user
  const user = await prisma.user.create({
    data: {
      email: 'student@example.com',
      name: 'Test Student'
    }
  })

  // 2. Create minimal course structure
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Testing'
    }
  })

  // 3. Create a question (simplified - adjust based on your schema)
  const question = await prisma.question.create({
    data: {
      lessonId: 1, 
      text: Buffer.from('What is 2+2?'),
      type: 'multiple_choice',
      position: 1
    }
  })

  // 4. Create answer options
  const answer = await prisma.answerOption.create({
    data: {
      questionId: question.id,
      text: Buffer.from('4'),
      correct: true
    }
  })

  console.log('✅ Seed data created:')
  console.log({ userId: user.id, questionId: question.id, answerId: answer.id })
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())