import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { UserPreference, UserPreferenceSchema } from './schemas/preference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreference.name, schema: UserPreferenceSchema }]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
  exports: [PreferencesService], // Export if other modules depend on this service
})
export class PreferencesModule {}