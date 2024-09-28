import { useToast } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { ReplyEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { CreateReplyFormInputs, createReplySchema } from '../../auth/schemas/reply';
import { CreateReplyDTO } from '../types/reply';

export function useReply(threadId: number) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReplyFormInputs>({
    resolver: zodResolver(createReplySchema),
  });

  async function getRepliesByThreadId(): Promise<ReplyEntity[]> {
    try {
      const response = await apiV1.get<null, { data: ReplyEntity[] }>(`/replies/${threadId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching replies:", error);
      throw error;
    }
  }

  const { data, isLoading, error } = useQuery<ReplyEntity[], Error, ReplyEntity[]>({
    queryKey: ["replies", threadId],
    queryFn: getRepliesByThreadId,
    enabled: !!threadId, 
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  async function createReply(data: CreateReplyDTO, threadId: number): Promise<ReplyEntity> {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("threadId", threadId.toString());

    if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
    }

    try {
        const response = await apiV1.post<null, { data: ReplyEntity }>(
            "/replies",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        queryClient.invalidateQueries({ queryKey: ["replies", threadId] });
        return response.data;
    } catch (error) {
        console.error("Error saat membuat reply:", error);
        throw error;
    }
}

  const { mutateAsync: createReplyAsync } = useMutation<ReplyEntity, Error, CreateReplyDTO>(
    {
        mutationKey: ["createReply"],
        mutationFn: (data) => createReply(data, threadId),
    }
  );



  async function onSubmit(data: CreateReplyFormInputs) {
    try {
      const createReplyDTO: CreateReplyDTO = {
        ...data,
        threadId: threadId,
      }
      await createReplyAsync(createReplyDTO);
      toast({
        title: "Reply berhasil dibuat!",
        description: "Reply baru Anda telah sukses ditambahkan.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error saat membuat reply:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal Membuat Reply.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    data,
    isLoading,
    error, 
  };
}

