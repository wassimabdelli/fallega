import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsFideliteService } from './points-fidelite.service';
import { PointsFideliteController } from './points-fidelite.controller';
import { PointsTransaction, PointsTransactionSchema } from 'src/schemas/points-fidelite.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PointsTransaction.name, schema: PointsTransactionSchema },
    ]),
  ],
  controllers: [PointsFideliteController],
  providers: [PointsFideliteService],
  exports: [PointsFideliteService],
})
export class PointsFideliteModule {}
