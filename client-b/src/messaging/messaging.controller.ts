import { Body, Controller, InternalServerErrorException, Post, Res } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MessagingService } from './messaging.service';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { errorMessages } from 'src/common/constants/error-messages.constants';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MessagingService) {}

  @Post('send')
  sendMessage(@Body() message: MessageDto, @Res() res: Response) {
    console.log('SENDING MESSAGE FROM SERVER_2'+message)
    this.messageService.sendMessage(message);
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  }

  @EventPattern('message')
  async handleIncomingData(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log('RECIENVING MESSAGE FROM A '+data)
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      this.messageService.handleData(data);
      channel.ack(originalMsg);
    } catch (error) {
      throw new InternalServerErrorException(
        errorMessages.DATA_RECEIVING_ERROR,
      );
    }
  }
}
