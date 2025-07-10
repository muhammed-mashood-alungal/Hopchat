import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { Response } from 'express';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MessagingService) {}

  @Post('send')
  sendMessage(@Body() body: MessageDto, @Res() res: Response) {
    const { message } = body;
    this.messageService.sendMessage('test', message);
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  }
}
