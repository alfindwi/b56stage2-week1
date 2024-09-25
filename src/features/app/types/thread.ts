export type Thread = {
    image: string;
    content: string;
    fullName: string;
    username: string;
    createdAt: string;
    likesCount: number;
    repliesCount: number;
  };
  
  export type CreateThreadDTO = {
    content: string;
    image: FileList;
  };