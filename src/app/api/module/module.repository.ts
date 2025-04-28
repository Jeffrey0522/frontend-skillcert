import { prisma } from "@/lib/prisma"
import type { Module, CreateModuleDto, UpdateModuleDto } from "@/types/module"
import { ModuleStatus } from "@/types/module"  // Import the enum

// Define an interface for Prisma Module structure
interface PrismaModule {
  id: number
  courseId: number
  name: string
  position: number
  description: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Repository for Module entity
 */
export class ModuleRepository {
  /**
   * Create a new module
   */
  async create(data: CreateModuleDto): Promise<Module> {
    const prismaMod = await prisma.module.create({
      data: {
        courseId: data.courseId,
        name: data.name,
        position: data.position,
        description: data.description,
        status: data.status || ModuleStatus.ACTIVE,
      },
    })
    
    return this.mapPrismaModuleToDto(prismaMod as PrismaModule)
  }

  /**
   * Get a module by ID
   */
  async findById(id: number): Promise<Module | null> {
    const module = await prisma.module.findUnique({
      where: { id },
    })
    
    if (!module) return null
    return this.mapPrismaModuleToDto(module as PrismaModule)
  }

  /**
   * Get all modules
   */
  async findAll(): Promise<Module[]> {
    const modules = await prisma.module.findMany({
      orderBy: { position: "asc" },
    })
    
    return modules.map((module: PrismaModule) => this.mapPrismaModuleToDto(module))
  }

  /**
   * Get modules by course ID
   */
  async findByCourseId(courseId: number): Promise<Module[]> {
    const modules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { position: "asc" },
    })
    
    return modules.map((module: PrismaModule) => this.mapPrismaModuleToDto(module))
  }

  /**
   * Update a module
   */
  async update(id: number, data: UpdateModuleDto): Promise<Module> {
    const updated = await prisma.module.update({
      where: { id },
      data,
    })
    
    return this.mapPrismaModuleToDto(updated as PrismaModule)
  }

  /**
   * Delete a module
   */
  async delete(id: number): Promise<Module> {
    const deleted = await prisma.module.delete({
      where: { id },
    })
    
    return this.mapPrismaModuleToDto(deleted as PrismaModule)
  }
  
  /**
   * Map Prisma Module object to Module DTO with Unix timestamps
   * @param prismaModule - The module object from Prisma
   */
  private mapPrismaModuleToDto(prismaModule: PrismaModule): Module {
    return {
      id: prismaModule.id,
      courseId: prismaModule.courseId,
      name: prismaModule.name,
      position: prismaModule.position,
      description: prismaModule.description || '',
      status: prismaModule.status as ModuleStatus,  // Cast string to enum
      createdAt: prismaModule.createdAt ? Math.floor(prismaModule.createdAt.getTime() / 1000) : undefined,
      updatedAt: prismaModule.updatedAt ? Math.floor(prismaModule.updatedAt.getTime() / 1000) : undefined
    }
  }
}