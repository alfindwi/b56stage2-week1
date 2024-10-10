export type CreateReplyDTO = {
  content: string;
  image?: FileList | null;
  threadId: number;
};
