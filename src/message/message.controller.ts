import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseService } from '../firebase/firebase.service';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly messageService: MessageService, // Inject the MessageService
  ) {}

  @Post('send-notification')
  async sendNotification(@Body() body: { fcmToken: string; userid: string, title: string; body: string }) {
    const response = this.messageService.create({
      title: body.title,
      body: body.body,
      userid: body.userid
    });
    return response;
  }

  // Get messages for a specific user
  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  async getMessages(@Param('userId') userId: string) {
    const messages = await this.messageService.findMessagesByUserId(userId);
    return messages;
  }

  @Post(':_id')
  async updateMessage(@Param('_id') _id: string) {
    return this.messageService.markAsRead(_id);
  }
}
