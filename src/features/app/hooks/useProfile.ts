import { useQuery } from "@tanstack/react-query";
import { UserEntity } from "../../../entities/user";
import { apiV1 } from "../../../libs/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface User {
  id: number;
  email: string;
  fullName: string;
  username: string | null;
  image: string | null;
  bio: string | null;
}

export function useUsers() {
  // Mengambil userId dari Redux store (auth slice)
  const userId = useSelector((state: RootState) => state.auth.id);

  async function getUserById(userId: number): Promise<User> {
    const response = await apiV1.get<{ data: User }>(`/users/${userId}`);
    return response.data.data; // Mengembalikan data user dari response
  }

  // Menggunakan useQuery untuk mengambil data user dari backend
  const { data: user, isLoading, error } = useQuery<User, Error>({
    queryKey: ["user", userId], // Menambahkan userId di queryKey untuk invalidasi cache
    queryFn: () => getUserById(userId),
    enabled: !!userId, // Query hanya dijalankan jika userId ada
  });

  return {
    user,
    isLoading,
    error,
  };
}

