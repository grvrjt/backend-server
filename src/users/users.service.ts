import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './users.model';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {

constructor( 
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    
    ){}

    async saveUser(userData: User, adminId?: string): Promise<User['_id']> {
          try {
            const createdUser = new this.userModel({
              ...userData,
            });
            await createdUser.save();
            return createdUser._id;
         
        } catch (error) {
          this.logger.error(error);
          throw new HttpException(
            {
              success: false,
              message: error.data || error.message,
              error: error.data || error.message || error,
            },
            400,
          );
        }
      }
}

