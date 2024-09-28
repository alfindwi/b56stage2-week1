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
  followers: number;
  following : number;

  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResultEntity {
  id: number;
  fullName: string;
  username: string;
  image: string;
  bio: string;
}
