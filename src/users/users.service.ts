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
  // Recherche instantanée générale - cherche tous les utilisateurs par nom, prénom ou email
  async searchUsers(query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const regex = new RegExp(query.trim(), 'i'); // 'i' = insensible à la casse
    return this.usermodel
      .find({
        $or: [
          { nom: regex },
          { prenom: regex },
          { email: regex },
        ],
      })
      .select('-password') // Exclure le mot de passe des résultats
      .limit(20) // Limiter les résultats pour la recherche instantanée
      .exec();
  }

}
