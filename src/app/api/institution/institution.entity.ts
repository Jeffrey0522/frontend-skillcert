import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Institution {
  @PrimaryColumn('bigint')
  id: number;

  @Column({
    type: 'bytea',
    transformer: {
      to: (value: string) => Buffer.from(value, 'base64'),
      from: (value: Buffer) => value.toString('base64'),
    },
  })
  title: string;
}
