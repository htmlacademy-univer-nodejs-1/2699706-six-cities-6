import { Schema, model, type Document } from 'mongoose';
import { User, UserType } from '../../types/user.type.js';

export type UserDocument = User & Document;

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatarPath: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
