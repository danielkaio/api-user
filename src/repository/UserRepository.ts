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
  declare nome: string;

  @Column
  declare email: string;

  @Column({ defaultValue: true })
  declare isactive: boolean;
}
