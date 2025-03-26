// request/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await handlePost(req, res);
      break;
    case 'GET':
      await handleGet(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handle POST requests
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { action, ...data } = req.body;

  switch (action) {
    case 'create':
      await createInstitutionRequest(data, res);
      break;
    case 'approve':
      await approveInstitutionRequest(data, res);
      break;
    case 'reject':
      await rejectInstitutionRequest(data, res);
      break;
    default:
      res.status(400).json({ error: 'Invalid action' });
  }
}

// Handle GET requests
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { action, ...data } = req.query;

  switch (action) {
    case 'pending':
      await listPendingRequests(res);
      break;
    case 'status':
      await getInstitutionRequestStatus(data, res);
      break;
    default:
      res.status(400).json({ error: 'Invalid action' });
  }
}

// Handle DELETE requests
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { requestId } = req.body;
  await deleteInstitutionRequest(requestId, res);
}

// Function to create an institution request
async function createInstitutionRequest(data: any, res: NextApiResponse) {
  const { userId, institutionName, walletAddress, metadata } = data;

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

// Function to list pending requests
async function listPendingRequests(res: NextApiResponse) {
  const pendingRequests = await prisma.institutionRequest.findMany({
    where: { status: 'Pending' },
  });
  res.status(200).json(pendingRequests);
}

// Function to approve an institution request
async function approveInstitutionRequest(data: any, res: NextApiResponse) {
  const { requestId, adminId } = data;

  const approvedRequest = await prisma.institutionRequest.update({
    where: { id: requestId },
    data: { status: 'Approved' },
  });

  // Add institution to the Institution Smart Contract (implement this logic as required)
  // ...

  res.status(200).json(approvedRequest);
}

// Function to reject an institution request
async function rejectInstitutionRequest(data: any, res: NextApiResponse) {
  const { requestId, adminId, reason } = data;

  const rejectedRequest = await prisma.institutionRequest.update({
    where: { id: requestId },
    data: { status: 'Rejected' },
  });

  res.status(200).json(rejectedRequest);
}

// Function to get the status of an institution request
async function getInstitutionRequestStatus(data: any, res: NextApiResponse) {
  const { requestId } = data;

  const request = await prisma.institutionRequest.findUnique({
    where: { id: Number(requestId) },
  });

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  res.status(200).json(request.status);
}

// Function to delete an institution request
async function deleteInstitutionRequest(requestId: number, res: NextApiResponse) {
  await prisma.institutionRequest.delete({
    where: { id: requestId },
  });

  res.status(200).json({ message: 'Request deleted' });
}