import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { Response } from 'express';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { errorMessages } from 'src/common/constants/error-messages.constants';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MessagingService) {}

  @Post('send')
  sendMessage(@Body() message: MessageDto, @Res() res: Response) {
    this.messageService.sendMessage(message);
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  }

  @EventPattern('message')
  async handleIncomingData(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
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
