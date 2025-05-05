import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Lessons")
export class Lesson {
    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    Id: number;

    @Column()
    ModuleId: number;

    @Column({
        type: "varbinary",
        nullable: true,
    })
    Name: Buffer;

    @Column({
        type: "varchar",
        length: 50,
    })
    Type: string;

    @Column({
        type: "varbinary",
        nullable: true,
    })
    Content: Buffer;

    @Column({
        type: "varbinary",
        nullable: true,
    })
    EstimatedTime: Buffer;

    @Column()
    position: number;
    
}