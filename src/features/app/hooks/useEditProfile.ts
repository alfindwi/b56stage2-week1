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

  async function updateUsersApi(data: updateUserDTO) {
    const response = await apiV1.patch<null, { data: UserEntity }>(
      `/users/${userId}`,
      data
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
      const updatedUser = await updateUsersAsync(data);
      alert("User berhasil diperbarui!");
      
      dispatch(updateUsers(updatedUser));
    } catch (error) {
      alert("Gagal memperbarui user, coba lagi.");
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