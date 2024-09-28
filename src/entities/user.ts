import { socialConnection } from "./social-connection";

export interface UserEntity {
  id: number;
  fullName: string;
  email: string;
  image: string;
  bio?: string;
  passwordUsers: string;
  username: string;
  socialConnection: socialConnection;
  role: string;

  createdAt: Date;
  updatedAt: Date;
}