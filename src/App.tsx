import Cookies from "js-cookie";
import { useEffect } from "react";
import { UserStoreDTO } from "./features/auth/types/dto/dto";
import { useAppDispatch, useAppSelector } from "./hooks/use-store";
import { apiV1 } from "./libs/api";
import { AppRoute } from "./routes";
import { setUser } from "./store/auth-slice";

function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth);

  async function getCurrentUser() {
    try {
      const token = Cookies.get("token");
      if(!token) {
        return;
      }

      const response = await apiV1.get<null, {data: UserStoreDTO}>("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch(setUser(response.data));
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(!user.id) {
      getCurrentUser();
    }
  }, [user.id, dispatch]);

  return <AppRoute />;
}

export default App;

