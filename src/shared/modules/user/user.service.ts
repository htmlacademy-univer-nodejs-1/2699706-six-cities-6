import { injectable } from 'inversify';
import { User } from '../../types/user.type.js';
import { UserModel, UserDocument } from './user.model.js';
import { UserService } from './user-service.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  public async create(dto: User): Promise<UserDocument> {
    return UserModel.create(dto);
  }

  public async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).exec();
  }
}
