import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenceDto } from './create-preference.dto';
import { IsOptional, IsBoolean, IsEmail, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationChannels {
  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @IsOptional()
  @IsBoolean()
  sms?: boolean;

  @IsOptional()
  @IsBoolean()
  push?: boolean;
}

class Preferences {
  @IsOptional()
  @IsBoolean()
  marketing?: boolean;

  @IsOptional()
  @IsBoolean()
  newsletter?: boolean;

  @IsOptional()
  @IsBoolean()
  updates?: boolean;

  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency?: 'daily' | 'weekly' | 'monthly' | 'never';

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationChannels)
  channels?: NotificationChannels;
}

export class UpdatePreferenceDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Preferences)
  preferences?: Preferences;

  @IsOptional()
  @IsString()
  timezone?: string;
}