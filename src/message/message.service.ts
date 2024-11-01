// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { CreateMessageDto } from './dto/message.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from '../user/user.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model here
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    const message = await createdMessage.save();

    // Get user's FCM token
    const user = await this.userModel.findById(createMessageDto.userid); // Ensure you're using userModel
    if (user && user.fcmToken) {
      const payload = {
        title: message.title,
        body: message.body,
      };
      await this.firebaseService.sendPushNotification(user.fcmToken, payload);
    }

    return message;
  }

  async findAll(userid: string): Promise<Message[]> {
    return this.messageModel.find({ userid }).exec();
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(messageId, { isRead: true }, { new: true }).exec();
  }

  async findMessagesByUserId(userid: string) {
    return this.messageModel.find({ userid }).exec(); // Assuming your Message schema has a userId field
  }
}
