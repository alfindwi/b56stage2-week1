export type Users = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type updateUserDTO = Pick <Users, "fullName" | "username" | "bio" | "image" | "id">