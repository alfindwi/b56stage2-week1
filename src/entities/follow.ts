import { UserEntity } from "./user";

export interface FollowEntity {
    id       :   number
    follower:    UserEntity
    followerId:  number
    following   : UserEntity
    followingId : number
    
    createdAt: Date;
    updatedAt: Date;
  }