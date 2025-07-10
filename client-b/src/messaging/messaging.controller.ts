import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('messaging')
export class MessagingController {

      @EventPattern('test')
      async handleMessage(@Payload() data : any){
        console.log(data)
      }
}
