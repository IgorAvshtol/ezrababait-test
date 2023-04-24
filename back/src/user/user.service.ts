import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { User } from 'src/types/user';
import { AddFriendDTO, RegisterDTO } from './user.dto';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {

  constructor(
      @InjectModel('User') private userModel: Model<User>,
  ) {
  }

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findAll() {
    return this.userModel.find();
  }


  async delete(id: string) {
    return this.userModel.deleteOne({ _id: new ObjectId(id) });
  }

  async update(id: string) {
    return this.userModel.findByIdAndUpdate(
        id,
        { $inc: { rank: 1 } },
        { new: true },
    );
  }

  async addFriend(data: AddFriendDTO) {
    return this.userModel.findByIdAndUpdate(
        data.userId,
        { $push: { friends: data.newFriendId } },
        { new: true },
    );
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return this.userModel.findOne({ email });
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('email or password is wrong', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

}
