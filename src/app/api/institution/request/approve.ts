import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { requestId, adminId } = req.body;

  const approvedRequest = await prisma.institutionRequest.update({
    where: { id: requestId },
    data: { status: 'Approved' },
  });

  // Add institution to the Institution Smart Contract (implement this logic as required)
  // ...

  res.status(200).json(approvedRequest);
}