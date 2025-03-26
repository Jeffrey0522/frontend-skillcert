import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const pendingRequests = await prisma.institutionRequest.findMany({
    where: { status: 'Pending' },
  });

  res.status(200).json(pendingRequests);
}