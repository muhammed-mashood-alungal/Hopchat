import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagingModule,
    RabbitmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
