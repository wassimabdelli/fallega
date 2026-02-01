import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schemas';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
  ) {}

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const newInvitation = new this.invitationModel(createInvitationDto);
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
}
