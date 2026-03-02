export enum UserType {
  Ordinary = 'ordinary',
  Pro = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password?: string; // При чтении из файла он есть, при отдаче клиенту - нет
  type: UserType;
};