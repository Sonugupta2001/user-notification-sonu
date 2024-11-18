import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import { PreferencesModule } from '../preferences/preferences.module';
import { NotificationLog, NotificationLogSchema } from './schemas/notification-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationLog.name, schema: NotificationLogSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PreferencesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
