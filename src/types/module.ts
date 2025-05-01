/**
 * Enum for module status
 */
export enum ModuleStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DRAFT = "DRAFT",
  }
  
  /**
   * Interface for module entity
   */
  export interface Module {
    id: number // BIGINT: Unique identifier for the module
    courseId: number // BIGINT: Foreign key to the course table
    name: string // VARBINARY(MAX): Name of the module
    position: number // INT: Position of the module in the course
    description: string // VARBINARY(MAX): Description of the module
    status?: ModuleStatus // Status of the module (not in DB schema but useful)
    createdAt?: number // Timestamp when the module was created
    updatedAt?: number // Timestamp when the module was last updated
  }
  
  /**
   * Interface for creating a new module
   */
  export interface CreateModuleDto {
    courseId: number
    name: string
    position: number
    description: string
    status?: ModuleStatus
  }
  
  /**
   * Interface for updating a module
   */
  export interface UpdateModuleDto {
    name?: string
    position?: number
    description?: string
    status?: ModuleStatus
  }
  