import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usermodel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.usermodel(createUserDto);
    return newUser.save();
  }

  findAll() {
    return this.usermodel.find().exec();
  }

  findOne(id: string) {
    return this.usermodel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usermodel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true, // retourne l'utilisateur mis à jour
        runValidators: true, // applique les validateurs du schema
      })
      .exec();
  }

  remove(id: string) {
    return this.usermodel.findByIdAndDelete(id).exec();
  }
  // Rechercher des arbitres par nom, prénom ou email
  async searchArbitres(query: string) {
    const regex = new RegExp(query, 'i'); // 'i' = insensible à la casse
    return this.usermodel
      .find({
        role: 'ARBITRE',
        $or: [{ nom: regex }, { prenom: regex }, { email: regex }],
      })
      .exec();
  }
  // Rechercher des joueurs par nom, prénom ou email
  async searchJoueurs(query: string) {
    const regex = new RegExp(query, 'i'); // 'i' = insensible à la casse
    return this.usermodel
      .find({
        role: 'JOUEUR',
        $or: [{ nom: regex }, { prenom: regex }, { email: regex }],
      })
      .exec();
  }
  // Rechercher des joueurs par nom, prénom ou email
  async searchCoach(query: string) {
    const regex = new RegExp(query, 'i'); // 'i' = insensible à la casse
    return this.usermodel
      .find({
        role: 'COACH',
        $or: [{ nom: regex }, { prenom: regex }, { email: regex }],
      })
      .exec();
  }

  // Rechercher des coachs et arbitres par nom, prénom ou email
async searchCoachsArbitres(query: string) {
  const regex = new RegExp(query, 'i'); // insensible à la casse
  return this.usermodel
    .find({
      role: { $in: ['COACH', 'ARBITRE'] },
      $or: [{ nom: regex }, { prenom: regex }, { email: regex }],
    })
    .exec();
}

}
