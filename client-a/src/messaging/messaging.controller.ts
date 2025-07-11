import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { Response } from 'express';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MessagingService) {}

  @Post('send')
  sendMessage(@Body() data: MessageDto, @Res() res: Response) {
    
    this.messageService.sendMessage(data);
    successResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  }

  @EventPattern('test')
  async handleIncomingData(@Payload() data: any , @Ctx() context : RmqContext) {
    try {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        
        this.messageService.handleData(data)
        channel.ack(originalMsg)
    } catch (error) {
        console.log('ERROR' + error) 
    }
  }
}
