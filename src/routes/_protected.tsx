import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import { apiV1 } from "../libs/api";
import { UserStoreDTO } from "../features/auth/types/dto/dto";
import { setUser } from "../store/auth-slice";

export function ProtectedRoute() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function getCurrentUser() {
    const response = await apiV1.get<null, { data: UserStoreDTO }>(
      "/auth/check",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    dispatch(setUser(response.data));

    return response.data;
  }

  const queryClient = useQueryClient();
  const query = queryClient.getQueryData(["currentUser"]);
  
  console.log("data query", query);
  

  const { isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return null;

  if (user.id && user.role === "MEMBER") return <Outlet />;

  return <Navigate to={"/login"} />;
}