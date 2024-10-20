import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import {
  CreateThreadFormInputs,
  createThreadSchema,
} from "../../auth/schemas/thread";
import { CreateThreadDTO } from "../types/thread";

export function useHome() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateThreadFormInputs>({
    resolver: zodResolver(createThreadSchema),
  });

  async function getThreads(): Promise<ThreadEntity[]> {
    const response = await apiV1.get<null, { data: ThreadEntity[] }>(
      "/thread",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }

  const { data, isLoading } = useQuery<ThreadEntity[], Error>( {
    queryKey: ["thread"],
    queryFn: getThreads,
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  async function createThread(data: CreateThreadDTO) {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await apiV1.post<null, { data: ThreadEntity }>(
        "/thread",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["thread"] });
      return response.data;
    } catch (error) {
      console.error("Error saat membuat thread:", error);
      throw error;
    }
  }

  const { mutateAsync: createThreadAsync } = useMutation<
    ThreadEntity,
    Error,
    CreateThreadDTO
  >({
    mutationKey: ["createThread"],
    mutationFn: createThread,
  });

  async function onSubmit(data: CreateThreadFormInputs) {
    try {
      await createThreadAsync({
        content: data.content,
        image: data.image && data.image.length > 0 ? data.image : undefined,
      });
      toast({
        title: "Thread Baru Berhasil di Buat",
        description: "Selamat Anda Berhasil Membuat Thread Baru",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Gagal membuat thread.",
        status: "error",
        duration: 3000,
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
  };
}
