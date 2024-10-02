import { UserEntity } from "./user";

export interface FollowEntity {
    id       :   number
    followers: UserEntity
    followerId:  number

    followed: UserEntity
    followedId : number

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
    