import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { userId, institutionName, walletAddress, metadata } = req.body;

  // Ensure the user has a verified email
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.emailVerified) {
    return res.status(400).json({ error: 'Email not verified' });
  }

  // Check if the user already has a pending request
  const existingRequest = await prisma.institutionRequest.findFirst({
    where: { userId, status: 'Pending' },
  });

  if (existingRequest) {
    return res.status(400).json({ error: 'User already has a pending request' });
  }

  const newRequest = await prisma.institutionRequest.create({
    data: {
      userId,
      institutionName,
      walletAddress,
      metadata,
      status: 'Pending',
    },
  });

  res.status(201).json(newRequest);
}