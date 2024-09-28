import { ReplyEntity, ThreadEntity } from "../../../../entities/thread";
import { SearchResultEntity, UserEntity } from "../../../../entities/user";

export type LoginRequestDTO = Pick<UserEntity, "email" | "passwordUsers">

export type LoginResponseDTO = {
    user: UserEntity;
    token: string;
}

export type RegisterRequestDTO = Pick<UserEntity, "fullName" | "email" | "passwordUsers">

export type RegisterResponseDTO = LoginResponseDTO;

export type UserStoreDTO  = Omit<UserEntity, "passwordUsers">

export type threadStoreDTO = ThreadEntity

export type replyStoreDTO = ReplyEntity

export type searchStoreDTO = SearchResultEntity

