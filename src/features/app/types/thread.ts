export type Thread = {
  image?: string | null;
  content: string;
  fullName: string;
  username: string;
  createdAt: string;
  likesCount: number;
  repliesCount: number;
};

export interface CreateThreadDTO {
  content: string;
  image?: FileList | null;
}

