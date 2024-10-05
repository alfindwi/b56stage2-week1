import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UserEntity } from "../../../entities/user";
import { apiV1 } from "../../../libs/api";
import { RootState } from "../../../store/store";
import { userSchema } from "../../auth/schemas/user";
import { updateUserDTO } from "../types/users";
import { updateUsers } from "../../../store/auth-slice";
import { useToast } from "@chakra-ui/react";

  export function useEditProfile() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<updateUserDTO>({
      resolver: zodResolver(userSchema),
    });

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.id);
    const toast = useToast();

    async function updateUsersApi(data: updateUserDTO) {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("bio", data.bio || "");
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      if(data.backgroundImage && data.backgroundImage[0]){
        formData.append("backgroundImage", data.backgroundImage[0]);
      }
      const response = await apiV1.patch<null, { data: UserEntity }>(
        `/users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      queryClient.invalidateQueries({ queryKey: ["users"] });

      return response.data;
    }

    const { mutateAsync: updateUsersAsync } = useMutation<UserEntity, Error, updateUserDTO>({
      mutationKey: ["updateUser"],
      mutationFn: updateUsersApi,
    });

    async function onSubmit(data: updateUserDTO) {
      try {
        const updateUser = await updateUsersAsync(data);
        toast({
          title: "Berhasil Mengebarui Profil!",
          description: "Profil Anda telah berhasil diperbarui.",
          status: "success",
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
        dispatch(updateUsers(updateUser));
      } catch (error) {
        console.log("Error saat mengupdate profil:", error);
        toast({
          title: "Gagal Mengebarui Profil!",
          description: "Terjadi kesalahan saat memperbarui profil.",
          status: "error",
          duration: 2000,
          position: 'top',
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
    };
  }
