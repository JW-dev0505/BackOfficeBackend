import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  userid: string; // Reference to the user who receives the message

  @Prop({ default: false})
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
