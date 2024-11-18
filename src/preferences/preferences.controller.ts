import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    NotFoundException,
  } from '@nestjs/common';
  import { PreferencesService } from './preferences.service';
  import { CreatePreferenceDto } from './dto/create-preference.dto';
  import { UpdatePreferenceDto } from './dto/update-preference.dto';
  
  @Controller('api/preferences')
  export class PreferencesController {
    constructor(private readonly preferencesService: PreferencesService) {}
  
    @Post()
    async create(@Body() createPreferenceDto: CreatePreferenceDto) {
      return this.preferencesService.create(createPreferenceDto);
    }
  
    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
      const preference = await this.preferencesService.findOne(userId);
      if (!preference) {
        throw new NotFoundException(`Preferences for user ${userId} not found`);
      }
      return preference;
    }
  
    @Patch(':userId')
    async update(
      @Param('userId') userId: string,
      @Body() updatePreferenceDto: UpdatePreferenceDto,
    ) {
      return this.preferencesService.update(userId, updatePreferenceDto);
    }
  
    @Delete(':userId')
    async remove(@Param('userId') userId: string) {
      return this.preferencesService.remove(userId);
    }
  }
  