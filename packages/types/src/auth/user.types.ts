export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  createdAt: Date;
}
