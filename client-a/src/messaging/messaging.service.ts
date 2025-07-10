import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/rabbitmq/rabbitmq.options';

@Injectable()
export class MessagingService {
  private client: ClientProxy;

  constructor(){
    this.client = ClientProxyFactory.create(rabbitMQConfig())
  }

  async sendMessage(pattern : string , message : string){
    return this.client.emit(pattern , {sender : 'Client-A',message})
  }
}
