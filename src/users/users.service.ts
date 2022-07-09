import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { Logger } from 'winston';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) { }

  async saveUser(userData: User, adminId?: string): Promise<User['_id']> {
    try {
      const newUser = new this.userModel(userData);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      newUser.password = hashedPassword;
      const result: User = await newUser.save();
      return result._id;
    } catch (error) {
      let errMessage = null;
      if (error.errors) errMessage = error.errors[Object.keys(error.errors)[0]].message;
      if (error.code === 11000) {
        if (Object.keys(error.keyValue)[0] === 'username') {
          errMessage = 'Username already Exist!!';
        }
      }
      // this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: errMessage,
          error: error.data || error.message || error,
        },
        400,
      );
    }
  }
}

