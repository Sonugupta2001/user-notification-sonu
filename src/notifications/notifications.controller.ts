import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/send')
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get('/:userId/logs')
  async getUserLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserLogs(userId);
  }

  @Get('/stats')
  async getStatistics() {
    return this.notificationsService.getStatistics();
  }
}