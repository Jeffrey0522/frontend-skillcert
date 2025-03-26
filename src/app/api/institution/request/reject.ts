import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { requestId, adminId, reason } = req.body;

  const rejectedRequest = await prisma.institutionRequest.update({
    where: { id: requestId },
    data: { status: 'Rejected' },
  });

  res.status(200).json(rejectedRequest);
}