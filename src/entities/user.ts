import { FollowDTO } from "../features/auth/types/dto/dto";
import { socialConnection } from "./social-connection";

export interface UserEntity {
  id: number;
  fullName: string;
  email: string;
  image: string;
  backgroundImage: string;
  bio?: string;
  passwordUsers: string;
  username: string;
  socialConnection: socialConnection | null;
  role: string;
  followeds: FollowDTO[];
  followers: FollowDTO[];
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
