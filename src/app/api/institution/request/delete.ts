import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { requestId } = req.body;

  await prisma.institutionRequest.delete({
    where: { id: requestId },
  });

  res.status(200).json({ message: 'Request deleted' });
}