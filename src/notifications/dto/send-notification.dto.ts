import { IsEnum, IsObject, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  userId: string;

  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: 'marketing' | 'newsletter' | 'updates';

  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @IsObject()
  content: {
    subject: string;
    body: string;
  };
}