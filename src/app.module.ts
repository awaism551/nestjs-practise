import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { Balance } from './balances/balances.model';
import { BalancesModule } from './balances/balances.module';
import { Category } from './categories/categories.model';
import { CategoriesModule } from './categories/categories.module';
import { Company } from './companies/companies.model';
import { CompaniesModule } from './companies/companies.module';
import { Customer } from './customers/customers.model';
import { CustomersModule } from './customers/customers.module';
import { Item } from './items/items.model';
import { ItemsModule } from './items/items.module';
import { LoginModule } from './login/login.module';
import { Order } from './orders/orders.model';
import { OrdersModule } from './orders/orders.module';
import { OrderItem } from './orders/orders_items.model';
import { OrderStatus } from './orderStatuses/orderStatuses.model';
import { OrderStatusesModule } from './orderStatuses/orderStatuses.module';
import { PaymentMode } from './paymentModes/paymentModes.model';
import { PaymentModesModule } from './paymentModes/paymentModes.module';
import { RolesGuard } from './roles/roles.guard';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { Unit } from './units/units.model';
import { UnitsModule } from './units/units.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { Vendor } from './vendors/vendors.model';
import { VendorsModule } from './vendors/vendors.module';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        models: [
          Category,
          Item,
          Role,
          User,
          Vendor,
          Customer,
          PaymentMode,
          OrderStatus,
          Unit,
          Balance,
          Order,
          OrderItem,
          Company,
        ],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types.ts'),
      },
    }),
    CategoriesModule,
    ItemsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    LoginModule,
    // ServeStaticModule is required when deploying the project
    // uncomment the following lines while deploying the project
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    VendorsModule,
    CustomersModule,
    PaymentModesModule,
    OrderStatusesModule,
    UnitsModule,
    BalancesModule,
    OrdersModule,
    CompaniesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
