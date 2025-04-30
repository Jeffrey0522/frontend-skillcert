// test-user-answer.mjs
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function test() {
  try {
    // 1. Check existing records first
    const [users, questions, answers] = await Promise.all([
      prisma.user.findMany(),
      prisma.question.findMany(),
      prisma.answerOption.findMany()
    ])

    console.log('Existing Users:', users)
    console.log('Existing Questions:', questions)
    console.log('Existing Answers:', answers)

    // 2. Use valid IDs from the results above
    if (users.length && questions.length && answers.length) {
      const testData = {
        userId: users[0].id,
        questionId: questions[0].id,
        answerId: answers[0].id,
        createdAt: BigInt(Date.now())
      }

      const newAnswer = await prisma.userAnswer.create({ data: testData })
      console.log('✅ Created UserAnswer:', newAnswer)
    } else {
      console.log('❌ Missing required records in database')
    }

    // 3. Query all answers
    const allAnswers = await prisma.userAnswer.findMany()
    console.log('📝 All UserAnswers:', allAnswers)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()