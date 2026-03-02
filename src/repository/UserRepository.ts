import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column({ defaultValue: true })
  isactive: boolean;
}
