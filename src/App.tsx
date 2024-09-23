import Cookies from "js-cookie"
import { UserStoreDTO } from "./features/auth/types/dto/dto"
import { useAppDispatch } from "./hooks/use-store"
import { apiV1 } from "./libs/api"
import { AppRoute } from "./routes"
import { setUser } from "./store/auth-slice"
import { useEffect } from "react"

function App() {
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

  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <AppRoute />;
}



export default App
