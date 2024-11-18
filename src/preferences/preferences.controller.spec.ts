import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { UserPreference } from './schemas/preference.schema';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest'; // Default import

describe('PreferencesController', () => {
  let app; // Declare app
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferencesController],
      providers: [
        PreferencesService,
        {
          provide: PreferencesService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    // Get the app instance
    app = module.createNestApplication();
    await app.init();
    service = module.get<PreferencesService>(PreferencesService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create user preferences', async () => {
    const createDto = {
      userId: 'user123',
      email: 'user@example.com',
      preferences: {
        marketing: true,
        newsletter: false,
        updates: true,
        frequency: 'weekly',
        channels: { email: true, sms: false, push: true },
      },
      timezone: 'America/New_York',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createDto as any);

    return request(app.getHttpServer()) // Pass the HTTP server
      .post('/api/preferences')
      .send(createDto)
      .expect(HttpStatus.CREATED)
      .expect(createDto);
  });

  it('should get user preferences', async () => {
    const getUser = {
      userId: 'user123',
      email: 'user@example.com',
      preferences: {
        marketing: true,
        newsletter: false,
        updates: true,
        frequency: 'weekly',
        channels: { email: true, sms: false, push: true },
      },
      timezone: 'America/New_York',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(getUser as any);

    return request(app.getHttpServer()) // Pass the HTTP server
      .get('/api/preferences/user123')
      .expect(HttpStatus.OK)
      .expect(getUser);
  });
});
