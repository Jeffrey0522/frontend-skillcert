import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bytea', { nullable: true })
  title: Buffer;

  @Column('bytea', { nullable: true })
  description: Buffer;

  @Column({ type: 'varchar', length: 255 })
  institutionAddress: string;

  @Column('bigint')
  price: number;

  @Column('bigint')
  createdAt: number;

  @Column('bytea', { nullable: true })
  metadata: Buffer;
}