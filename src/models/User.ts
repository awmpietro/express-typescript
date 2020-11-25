import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
