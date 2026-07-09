import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CallDocument = Call & Document;

@Schema({ timestamps: true })
export class Call {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  caller: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiver: Types.ObjectId;

  @Prop({ 
    type: String, 
    enum: ['audio', 'video'], 
    required: true 
  })
  callType: 'audio' | 'video';

  @Prop({ 
    type: String, 
    enum: ['missed', 'accepted', 'rejected', 'ongoing', 'ended'], 
    default: 'ongoing' 
  })
  status: 'missed' | 'accepted' | 'rejected' | 'ongoing' | 'ended';

  @Prop({ type: Number, default: 0 })
  duration: number;

  @Prop({ type: Date, default: null })
  endedAt?: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);

// Index sur caller, receiver, createdAt pour les requêtes fréquentes
CallSchema.index({ caller: 1, receiver: 1, createdAt: -1 });