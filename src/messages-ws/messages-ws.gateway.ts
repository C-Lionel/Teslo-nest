import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({
  cors: true
})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection( client: Socket ) {
    // console.log({ conectados: this.messagesWsService.getConnectedClients() })
    const token = client.handshake.headers.authentication as string;
    console.log({token})
    this.messagesWsService.registerClient( client );
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  handleDisconnect( client: Socket ) {
    // console.log({ conectados: this.messagesWsService.getConnectedClients() })
    this.messagesWsService.removeClient( client.id );
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient( client: Socket, payload: NewMessageDto ) {
      //! Emite únicamente al cliente
      // client.emit('message-from-server', {
        //   fullName: 'Soy yo',
        //   message: payload.message || 'no-message!!'
        // });
        
        //! Emite a todos MENOS, al cliente inicial
      // client.broadcast.emit('message-from-server', {
      //   fullName: 'Soy yo',
      //   message: payload.message || 'no-message!!'
      // });

        //! Emite a todos
        this.wss.emit('message-from-server', {
            fullName: 'Soy yo',
            message: payload.message || 'no-message!!'
        })

  }
}
