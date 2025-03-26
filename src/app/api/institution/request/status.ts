import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { requestId } = req.query;

  const request = await prisma.institutionRequest.findUnique({
    where: { id: Number(requestId) },
  });

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  res.status(200).json(request.status);
}