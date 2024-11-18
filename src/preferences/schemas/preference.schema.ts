import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

@Schema({ timestamps: true })
export class UserPreference {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: Object,
    required: true,
    default: {
      marketing: true,
      newsletter: true,
      updates: true,
      frequency: 'weekly',
      channels: { email: true, sms: false, push: true },
    },
  })
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({ required: true })
  timezone: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);