import { ModuleProgressRepository } from "./module-progress.repository";

export class ModuleProgressService {
  private repository: ModuleProgressRepository;

  constructor() {
    this.repository = new ModuleProgressRepository();
  }

  async createModuleProgress(user_id: bigint, module_id: bigint) {
    return await this.repository.create(user_id, module_id);
  }

  async updateModuleProgress(user_id: bigint, module_id: bigint, progress: number) {
    return await this.repository.update(user_id, module_id, progress);
  }

  async getModuleProgress(user_id: bigint, module_id: bigint) {
    return await this.repository.findOne(user_id, module_id);
  }

  async deleteModuleProgress(user_id: bigint, module_id: bigint) {
    return await this.repository.delete(user_id, module_id);
  }
}