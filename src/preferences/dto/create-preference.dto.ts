import { IsBoolean, IsEmail, IsEnum, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationChannels {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

class Preferences {
  @IsBoolean()
  marketing: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsBoolean()
  updates: boolean;

  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @ValidateNested()
  @Type(() => NotificationChannels)
  channels: NotificationChannels;
}

export class CreatePreferenceDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => Preferences)
  preferences: Preferences;

  @IsString()
  timezone: string;
}