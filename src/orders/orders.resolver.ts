import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginGuard } from 'src/auth/jwt-auth.guard';
import { OrderInput } from 'src/types';
import { OrderService } from './orders.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query('orders')
  @UseGuards(LoginGuard)
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Query('getLatestOrder')
  @UseGuards(LoginGuard)
  async getLatestOrder() {
    return await this.orderService.getLatestOrder();
  }

  @Query('order')
  @UseGuards(LoginGuard)
  async getOrder(
    @Args('orderId', ParseIntPipe)
    id: number,
  ) {
    return await this.orderService.getOrder(id);
  }

  @Mutation('saveOrder')
  @UseGuards(LoginGuard)
  async saveOrder(
    @Args('input') input: OrderInput,
    @Args('customerId', ParseIntPipe) customerId: number,
  ) {
    if (!customerId) {
      throw new Error('Customer is required!');
    } else if (!input.items.length) {
      throw new Error('Items are required!');
    } else {
      return await this.orderService.saveOrder(input, customerId);
    }
  }

  @Mutation('savePayment')
  @UseGuards(LoginGuard)
  async savePayment(
    @Args('input') input: OrderInput,
    @Args('isPrevBalanceIncluded') isPrevBalanceIncluded: boolean,
    @Args('paymentModeId', ParseIntPipe) paymentModeId: number,
    @Args('previousBalance', {
      nullable: true,
    })
    previousBalance: number,
    @Args('customerId', {
      nullable: true,
    })
    customerId: number,
  ) {
    if (!paymentModeId) {
      throw new Error('Payment Mode is required!');
    } else if (!input.items.length) {
      throw new Error('Items are required!');
    } else if (paymentModeId === 2 && !customerId) {
      throw new Error('Customer is Required For Credit Payment');
    } else {
      return await this.orderService.savePayment(
        input,
        isPrevBalanceIncluded,
        paymentModeId,
        previousBalance,
        customerId,
      );
    }
  }

  @Mutation('completePayment')
  @UseGuards(LoginGuard)
  async completePayment(
    @Args('orderId', ParseIntPipe) orderId: number,
    @Args('isPrevBalanceIncluded') isPrevBalanceIncluded: boolean,
    @Args('paymentModeId', ParseIntPipe) paymentModeId: number,
    @Args('previousBalance', {
      nullable: true,
    })
    previousBalance: number,
    @Args('customerId', ParseIntPipe)
    customerId: number,
    @Args('net')
    net: number,
  ) {
    return await this.orderService.completePayment(
      orderId,
      isPrevBalanceIncluded,
      paymentModeId,
      customerId,
      net,
      previousBalance,
    );
  }
}
