import { Body, Controller, Post, Res } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';
import { MessageDto } from './message.dto';
import { successResponse } from 'src/utils/response.util';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Response } from 'express';

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
  async handleIncomingData(@Payload() data: any , @Ctx() context : RmqContext) {
    try {
        console.log('Received')
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        
        this.messageService.handleData(data)
        channel.ack(originalMsg)
    } catch (error) {
        console.log('ERROR' + error) 
    }
  }
}
