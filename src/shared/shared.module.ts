import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from '../schemas/friendship.schemas';
import { Invitation, InvitationSchema } from '../schemas/invitation.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
})
export class SharedModule {}
