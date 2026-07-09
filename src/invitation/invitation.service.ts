import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schemas';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Friendship, FriendshipDocument } from 'src/schemas/friendship.schemas';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    @InjectModel(Friendship.name) private friendshipModel: Model<FriendshipDocument>,
  ) {}

  async create(createInvitationDto: CreateInvitationDto, senderId: string): Promise<Invitation> {
    // Éviter les invitations à soi-même
    if (senderId === createInvitationDto.receiver) {
      throw new Error('Un utilisateur ne peut pas s\'inviter lui-même');
    }

    // Vérifier s'il existe déjà une invitation en attente entre ces utilisateurs
    const existingInvitation = await this.invitationModel
      .findOne({
        sender: senderId,
        receiver: createInvitationDto.receiver,
        status: 'PENDING'
      } as any)
      .exec();

    if (existingInvitation) {
      throw new Error('Une invitation est déjà en attente entre ces utilisateurs');
    }

    const newInvitation = new this.invitationModel({
      sender: senderId,
      receiver: createInvitationDto.receiver,
      event: createInvitationDto.event,
      status: 'PENDING',
    });
    return newInvitation.save();
  }

  async findAll(): Promise<Invitation[]> {
    return this.invitationModel
      .find()
      .populate('sender')
      .populate('receiver')
      .populate('event')
      .exec();
  }

  async findOne(id: string): Promise<Invitation> {
    const invitation = await this.invitationModel
      .findById(id)
      .populate('sender')
      .populate('receiver')
      .populate('event')
      .exec();
    if (!invitation) throw new NotFoundException(`Invitation #${id} not found`);
    return invitation;
  }

  async update(id: string, updateInvitationDto: UpdateInvitationDto): Promise<Invitation> {
    const updated = await this.invitationModel
      .findByIdAndUpdate(id, updateInvitationDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Invitation #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Invitation> {
    const deleted = await this.invitationModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Invitation #${id} not found`);
    return deleted;
  }

  async acceptInvitation(id: string): Promise<InvitationDocument> {
    const updated = await this.invitationModel
      .findByIdAndUpdate(id, { status: 'ACCEPTED' }, { new: true })
      .populate('sender receiver event')
      .exec();
    
    if (!updated) throw new NotFoundException(`Invitation #${id} not found`);

    // Création automatique de l'amitié
    await new this.friendshipModel({
      user1: updated.sender,
      user2: updated.receiver,
      invitation: updated._id,
    }).save();

    return updated;
  }

  async rejectInvitation(id: string): Promise<Invitation> {
    const updated = await this.invitationModel
      .findByIdAndUpdate(id, { status: 'REJECTED' }, { new: true })
      .populate('sender receiver event')
      .exec();
    if (!updated) throw new NotFoundException(`Invitation #${id} not found`);
    return updated;
  }

  async cancelInvitation(id: string): Promise<Invitation> {
    const updated = await this.invitationModel
      .findByIdAndUpdate(id, { status: 'CANCELLED' }, { new: true })
      .populate('sender receiver event')
      .exec();
    if (!updated) throw new NotFoundException(`Invitation #${id} not found`);
    return updated;
  }

  async findByReceiver(userId: string): Promise<Invitation[]> {
    return this.invitationModel
      .find({ receiver: userId } as any)
      .populate('sender receiver event')
      .exec();
  }

  async findBySender(userId: string): Promise<Invitation[]> {
    return this.invitationModel
      .find({ sender: userId } as any)
      .populate('sender receiver event')
      .exec();
  }

  async findPending(userId: string): Promise<Invitation[]> {
    return this.invitationModel
      .find({ receiver: userId, status: 'PENDING' } as any)
      .populate('sender receiver event')
      .exec();
  }
}
