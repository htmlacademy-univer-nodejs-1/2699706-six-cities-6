import { User } from '../../types/user.type.js';
import { UserDocument } from './user.model.js';

export interface UserService {
  create(dto: User): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
}
