import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupportTicket } from "../../SupportTickets/entities/support-ticket.entity";

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  Wallet: string;

  @OneToMany(() => SupportTicket, (supportTicket) => supportTicket.user)
  supportTickets: SupportTicket[];
}
