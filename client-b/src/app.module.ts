import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagingModule, RabbitmqModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
