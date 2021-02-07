import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

@Table
export class PaymentMode extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'ID',
  })
  id: number;

  @Column
  name: string;

  @HasMany(() => Order)
  orders: Order[];
}
