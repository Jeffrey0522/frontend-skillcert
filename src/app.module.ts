import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupportTicketModule } from "./app/api/SupportTickets/support-ticket.module";
import { UsersModule } from "./app/api/Users/users.module";
import { AuthModule } from "./app/api/auth/auth.module";
import { CourseModule } from "./app/api/Courses/course.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Set to false in production
    }),
    SupportTicketModule,
    UsersModule,
    AuthModule,
    CourseModule
  ],
})
export class AppModule {}