import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { Response } from 'express';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MessagingService) {}

  @Post('send')
  sendMessage(@Body() body: MessageDto, @Res() res: Response) {
    const { message } = body;
    this.messageService.sendMessage(message);
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  }

  @EventPattern('test')
  async handleIncomingData(@Payload() data: any) {
    this.messageService.handleData(data)
  }
}
