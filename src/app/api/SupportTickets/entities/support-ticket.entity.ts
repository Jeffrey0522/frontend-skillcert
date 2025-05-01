import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../Users/entities/user.entity";

export enum TicketCategory {
  PAYMENT = "PAYMENT",
  COURSE = "COURSE",
  CERTIFICATE = "CERTIFICATE",
  ACCOUNT = "ACCOUNT",
  OTHER = "OTHER",
}

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

@Entity("SupportTicket")
export class SupportTicket {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  UserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "UserId" })
  user: User;

  @Column({
    type: "varchar",
    length: 255,
  })
  @IsEnum(TicketCategory)
  @IsNotEmpty()
  Category: TicketCategory;

  @Column({
    type: "varchar",
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Subject: string;

  @Column("text")
  @IsString()
  @IsNotEmpty()
  Description: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  Status: TicketStatus;

  @Column({
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  AdminId: number | null;

  @Column("bigint")
  @IsNumber()
  @IsNotEmpty()
  CreatedAt: number;

  @Column("bigint")
  @IsNumber()
  @IsNotEmpty()
  UpdatedAt: number;
}
