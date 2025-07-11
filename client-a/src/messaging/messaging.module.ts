import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports : [RabbitmqModule,SocketModule],
  controllers: [MessagingController],
  providers: [MessagingService]
})
export class MessagingModule {}
