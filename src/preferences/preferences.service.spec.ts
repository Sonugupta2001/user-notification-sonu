import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from './schemas/preference.schema';
import { Model } from 'mongoose';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto'; // Assuming UpdatePreferenceDto is in a different file

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: Model<UserPreference>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user preference', async () => {
    const createDto: CreatePreferenceDto = {
      userId: 'user123',
      email: 'user@example.com',
      preferences: {
        marketing: true,
        newsletter: false,
        updates: true,
        frequency: 'weekly', // Corrected to valid value
        channels: { email: true, sms: false, push: true },
      },
      timezone: 'America/New_York',
    };

    const createdPreference = {
      ...createDto,
      _id: 'someId',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(model, 'create').mockResolvedValue(createdPreference as any);

    const result = await service.create(createDto);
    expect(result).toEqual(createdPreference);
    expect(model.create).toHaveBeenCalledWith(createDto);
  });

  it('should update user preference', async () => {
    const updateDto: UpdatePreferenceDto = {
      preferences: {
        marketing: false,
        newsletter: true,
        updates: false,
        frequency: 'monthly', // Corrected to valid value
        channels: { email: true, sms: true, push: false },
      },
    };

    const updatedPreference = {
      _id: 'someId',
      userId: 'user123',
      email: 'user@example.com',
      timezone: 'America/New_York',
      ...updateDto,
    };

    jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(updatedPreference as any);

    const result = await service.update('user123', updateDto);
    expect(result).toEqual(updatedPreference);
    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: 'user123' },
      updateDto,
      { new: true },
    );
  });

  it('should delete user preference', async () => {
    jest.spyOn(model, 'findOneAndDelete').mockResolvedValue(null);

    const result = await service.remove('user123');
    expect(result).toBeNull();
    expect(model.findOneAndDelete).toHaveBeenCalledWith({ userId: 'user123' });
  });
});