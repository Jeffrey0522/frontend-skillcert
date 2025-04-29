import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../Users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { Email: email } });
    if (user) {
      // In a real app, you would hash the password and compare
      // For now, we'll just return the user
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.Email, sub: user.Id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
