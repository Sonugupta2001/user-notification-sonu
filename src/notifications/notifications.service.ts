import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog, NotificationLogDocument } from './schemas/notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private readonly notificationLogModel: Model<NotificationLogDocument>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    // Simulate sending a notification
    const { userId, type, channel, content } = sendNotificationDto;

    const log = new this.notificationLogModel({
      userId,
      type,
      channel,
      status: 'pending',
      metadata: content,
    });

    // Simulate a delay and success/failure result
    await new Promise((resolve) => setTimeout(resolve, 1000));
    log.status = Math.random() > 0.2 ? 'sent' : 'failed';
    if (log.status === 'failed') {
      log.failureReason = 'Simulated failure.';
    } else {
      log.sentAt = new Date();
    }

    return log.save();
  }

  async getUserLogs(userId: string) {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getStatistics() {
    const totalNotifications = await this.notificationLogModel.countDocuments();
    const successfulNotifications = await this.notificationLogModel.countDocuments({
      status: 'sent',
    });

    return {
      totalNotifications,
      successfulNotifications,
      failureRate:
        totalNotifications > 0
          ? ((totalNotifications - successfulNotifications) / totalNotifications) * 100
          : 0,
    };
  }
}