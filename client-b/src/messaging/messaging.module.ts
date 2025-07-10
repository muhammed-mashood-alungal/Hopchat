import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports : [RabbitmqModule],
  controllers: [MessagingController],
  providers: [MessagingService]
})
export class MessagingModule {}
