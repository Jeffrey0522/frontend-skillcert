import { ModuleProgressController } from "./module-progress.controller";
import { ModuleProgressService } from "./module-progress.service";
import { ModuleProgressRepository } from "./module-progress.repository";

export class ModuleProgressModule {
  static getController(): ModuleProgressController {
    return new ModuleProgressController();
  }

  static getService(): ModuleProgressService {
    return new ModuleProgressService();
  }

  static getRepository(): ModuleProgressRepository {
    return new ModuleProgressRepository();
  }
}

export default ModuleProgressModule;