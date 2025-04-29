import { prisma } from '../../../lib/prisma';

export async function executeQuery(query: string, params: any = {}): Promise<any> {

    throw new Error('executeQuery is deprecated. Use Prisma client directly from ../../../lib/prisma.ts');
}