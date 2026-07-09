import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { CallGateway } from './call.gateway';
import { Call, CallSchema } from 'src/schemas/call.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Call.name, schema: CallSchema },
    ]),
  ],
  controllers: [CallController],
  providers: [CallService, CallGateway],
  exports: [CallService],
})
export class CallModule {}
