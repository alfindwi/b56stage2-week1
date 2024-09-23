import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiV1 } from "../../../libs/api";
import { ThreadEntity } from "../../../entities/thread";
import { CreateThreadFormInputs, createThreadSchema } from "../../auth/schemas/thread";
import { CreateThreadDTO } from "../types/thread";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useHome() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateThreadFormInputs>({
    resolver: zodResolver(createThreadSchema),
  });

  async function getThreads(): Promise<ThreadEntity[]> {
    const response = await apiV1.get<null, {data : ThreadEntity[]}>("/thread");
    return response.data;
  }

  const { data, isLoading} = useQuery<ThreadEntity[], Error, ThreadEntity[]>({
    queryKey: ["thread"],
    queryFn: getThreads,
  });

  const queryClient = useQueryClient();

  async function createThread(data: CreateThreadDTO) {
    const response = await apiV1.post<null, { data: ThreadEntity }>(
      "/thread",
      data
    );

    queryClient.invalidateQueries({ queryKey: ["thread"] });

    return response.data;
  }

  const { mutateAsync: createThreadAsync } = useMutation<
    CreateThreadDTO,
    Error,
    CreateThreadDTO
  >({
    mutationKey: ["createThread"],
    mutationFn: createThread,
  });

  async function onSubmit(data: CreateThreadFormInputs) {
    console.log("Data yang disubmit:", data); 
    try {
        await createThreadAsync(data as CreateThreadDTO);
        alert("Thread berhasil dibuat!");
    } catch (error) {
        console.error("Error saat membuat thread:", error);
        alert("Gagal membuat thread, coba lagi.");
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