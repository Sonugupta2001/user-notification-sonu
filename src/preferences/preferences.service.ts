import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference, UserPreferenceDocument } from './schemas/preference.schema';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const newPreference = new this.userPreferenceModel(createPreferenceDto);
    return newPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference | null> {
    return this.userPreferenceModel.findOne({ userId }).exec();
  }

  async update(
    userId: string,
    updatePreferenceDto: UpdatePreferenceDto,
  ): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel
      .findOneAndUpdate({ userId }, updatePreferenceDto, { new: true })
      .exec();

    if (!updatedPreference) {
      throw new NotFoundException(`Preferences for user ${userId} not found`);
    }

    return updatedPreference;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Preferences for user ${userId} not found`);
    }
  }
}
