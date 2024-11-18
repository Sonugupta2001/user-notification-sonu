import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationLog } from './schemas/notification-log.schema';
import { Model } from 'mongoose';
import { SendNotificationDto } from './dto/send-notification.dto';  // Import DTO

describe('NotificationsService', () => {
  let service: NotificationsService;
  let model: Model<NotificationLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getModelToken(NotificationLog.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    model = module.get<Model<NotificationLog>>(getModelToken(NotificationLog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a notification', async () => {
    const sendDto: SendNotificationDto = {  // Explicitly type it as SendNotificationDto
      userId: 'user123',
      type: 'marketing',  // This will match the expected type
      channel: 'email',
      content: {
        subject: 'Special Offer',
        body: 'Check out our latest deals!',
      },
    };

    const notificationLog = {
      ...sendDto,
      status: 'sent',
      sentAt: new Date(),
      _id: 'someId',
    };

    jest.spyOn(model, 'create').mockResolvedValue(notificationLog as any);

    const result = await service.sendNotification(sendDto);
    expect(result).toEqual(notificationLog);
    expect(model.create).toHaveBeenCalledWith(sendDto);
  });
});