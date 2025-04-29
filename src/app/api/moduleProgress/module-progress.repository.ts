import { prisma } from "@/lib/prisma";

export class ModuleProgressRepository {
  async create(user_id: bigint, module_id: bigint) {
    return await prisma.moduleProgress.create({
      data: { 
        user_id: Number(user_id), 
        module_id, 
        last_accessed_at: BigInt(Date.now()) 
      },
    });
  }

  async update(user_id: bigint, module_id: bigint, progress: number) {
    return await prisma.moduleProgress.updateMany({
      where: { user_id: Number(user_id), module_id },
      data: { 
        progress,
        last_accessed_at: BigInt(Date.now()),
        completed: progress >= 100 ? true : false,
      },
    });
  }

  async findOne(user_id: bigint, module_id: bigint) {
    return await prisma.moduleProgress.findFirst({
      where: { user_id: Number(user_id), module_id },
    });
  }

  async delete(user_id: bigint, module_id: bigint) {
    return await prisma.moduleProgress.deleteMany({
      where: { user_id: Number(user_id), module_id },
    });
  }
}