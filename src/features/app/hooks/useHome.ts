import { useToast } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { CreateThreadFormInputs, createThreadSchema } from "../../auth/schemas/thread";
import { CreateThreadDTO } from "../types/thread";

export function useHome() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateThreadFormInputs>({
    resolver: zodResolver(createThreadSchema),
  });

  async function getThreads(): Promise<ThreadEntity[]> {
    const response = await apiV1.get<null, {data: ThreadEntity[]}>(
      "/thread",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }

  const { data, isLoading } = useQuery<ThreadEntity[], Error>({
    queryKey: ["thread"],
    queryFn: getThreads,
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  async function createThread(data: CreateThreadDTO) {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.image && data.image[0]) {
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

  const { mutateAsync: createThreadAsync } = useMutation<ThreadEntity, Error, CreateThreadDTO>({
    mutationKey: ["createThread"],
    mutationFn: createThread,
  });
  

  async function onSubmit(data: CreateThreadFormInputs) {
    try {
      await createThreadAsync(data as CreateThreadDTO);
      toast({
        title: "Thread berhasil dibuat!",
        description: "Thread baru Anda telah sukses ditambahkan.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error saat membuat thread:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal Membuat Thread.",
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
  };
}
