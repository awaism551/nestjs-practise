import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Customer } from 'src/customers/customers.model';
import { Item } from 'src/items/items.model';
import { OrderStatus } from 'src/orderStatuses/orderStatuses.model';
import { PaymentMode } from 'src/paymentModes/paymentModes.model';
import { OrderInput } from 'src/types';
import { User } from 'src/users/users.model';
import { Order } from './orders.model';
import { OrderItem } from './orders_items.model';
@Injectable()
export class OrderService {
  constructor(
    private sequelize: Sequelize, // @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}
  parentModelsArray = [Customer, User, OrderStatus, PaymentMode, Item];

  async getOrders() {
    try {
      return await Order.findAll({
        include: this.parentModelsArray,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async getLatestOrder() {
    try {
      return await Order.findOne({
        order: [['id', 'DESC']],
        include: this.parentModelsArray,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async getOrder(id: number) {
    try {
      return await Order.findOne({
        where: {
          id,
        },
        include: this.parentModelsArray,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveOrder(input: OrderInput, customerId: number) {
    try {
      return await this.sequelize.transaction(async (t) => {
        let savedOrder = await Order.create(
          {
            ...input,
            customerId,
            orderStatusId: 1, // set to "PENDING"
          },
          {
            transaction: t,
          },
        );

        await input.items.forEach(async (itemId) => {
          await OrderItem.bulkCreate(
            [
              {
                itemId,
                orderId: savedOrder.id,
              },
            ],
            {
              transaction: t,
            },
          );
        });

        return await Order.findOne({
          order: [['id', 'DESC']],
          include: this.parentModelsArray,
          transaction: t,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}