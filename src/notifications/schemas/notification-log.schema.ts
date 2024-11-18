import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationLogDocument = NotificationLog & Document;

@Schema({ timestamps: true })
export class NotificationLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: 'marketing' | 'newsletter' | 'updates';

  @Prop({ required: true })
  channel: 'email' | 'sms' | 'push';

  @Prop({ required: true })
  status: 'pending' | 'sent' | 'failed';

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
