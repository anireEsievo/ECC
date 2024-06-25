import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUser } from '../interfaces/create-user.interface';

// this class is an injectable that can be accessed using DI and provides access to the users table in the database
// it exposes different methods for manipulating users
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //   method to creat a user
  async create(createUserDto: CreateUser): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return { ...user, hash: undefined };
  }

  //   method to get all users
  async findAll(): Promise<User[]> {
    const users = await this.userModel
      .find({})
      .select('-hash -private_key -refresh_valid_till -access_token')
      .lean();
    return users;
  }

  //   method to find one user given a particular query object
  async findOne(query: object): Promise<User> {
    const user = await this.userModel.findOne(query).lean();
    if (user) {
      return {
        ...user,
        access_token: undefined,
        refresh_valid_till: undefined,
      };
    }
    return user;
  }

  //   method to find a user given their id
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean();
    if (user) {
      return {
        ...user,
        hash: undefined,
        access_token: undefined,
        refresh_valid_till: undefined,
        private_key: undefined,
      };
    }
    return user;
  }

  //  method to update a user given their id
  async update(id: string, dto: object) {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (user) {
      return {
        ...user,
        hash: undefined,
        access_token: undefined,
        refresh_valid_till: undefined,
        private_key: undefined,
      };
    }
    return user;
  }

  //  method to delete a user given their id
  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }
}
