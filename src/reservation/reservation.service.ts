import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from 'src/schemas/reservation.schemas';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const newReservation = new this.reservationModel(createReservationDto);
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('user')
      .populate('event')
      .exec();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findById(id)
      .populate('user')
      .populate('event')
      .exec();
    if (!reservation) throw new NotFoundException(`Reservation #${id} not found`);
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const updated = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Reservation #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Reservation> {
    const deleted = await this.reservationModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Reservation #${id} not found`);
    return deleted;
  }
}
