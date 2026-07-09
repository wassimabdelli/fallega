import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { InvitationModule } from './invitation/invitation.module';
import { EquipementStockModule } from './equipement-stock/equipement-stock.module';
import { ReservationModule } from './reservation/reservation.module';
import { BadgeModule } from './badge/badge.module';
import { PointsFideliteModule } from './points-fidelite/points-fidelite.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { PaymentsModule } from './payments/payments.module';

import { EmailService } from 'verifmail/email.service';
import { CallModule } from './call/call.module';
import { FriendshipModule } from './friendship/friendship.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
      envFilePath: '.env', // Specify the env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    InvitationModule,
    EquipementStockModule,
    ReservationModule,
    BadgeModule,
    PointsFideliteModule,
    NotificationModule,
    ChatModule,
    MessageModule,
    PaymentsModule,
    CallModule,
    FriendshipModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
