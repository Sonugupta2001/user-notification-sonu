import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from './preferences/preferences.module';
import { NotificationsModule } from './notifications/notifications.module';


/*
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PreferencesModule,
  ],
  controllers: [],
  providers: [],
})
*/


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PreferencesModule,
  ],
})

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PreferencesModule,
    NotificationsModule,
  ],
})

export class AppModule {}