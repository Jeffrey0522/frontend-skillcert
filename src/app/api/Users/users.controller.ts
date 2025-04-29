import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {
    this.logger.log("UsersController initialized");
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log("Received POST request to /users");
    this.logger.debug("Request body:", JSON.stringify(createUserDto));
    try {
      const result = await this.usersService.create(createUserDto);
      this.logger.log("User created successfully");
      return result;
    } catch (error) {
      this.logger.error("Error creating user:", error);
      throw error;
    }
  }
}
