import { UserEntity } from "./user";

export interface FollowEntity {
    follower: any;
    id       :   number
    followerId:  number
    followingId : number

    followers: UserEntity

    isFollowing?: boolean
    
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FollowingEntity {
      follower: any;
      id       :   number
      followerId:  number
      followingId : number
  
      following: UserEntity
  
      isFollowing?: boolean
      
      createdAt: Date;
      updatedAt: Date;
    }
    