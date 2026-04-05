import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  nome!: string;

  @Column
  email!: string;

  @Column({ defaultValue: true })
  isactive!: boolean;
}
