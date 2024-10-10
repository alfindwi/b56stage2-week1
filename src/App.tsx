import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UserStoreDTO } from "./features/auth/types/dto/dto";
import { useAppDispatch, useAppSelector } from "./hooks/use-store";
import { apiV1 } from "./libs/api";
import { AppRoute } from "./routes";
import { setUser } from "./store/auth-slice";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  async function getCurrentUser() {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiV1.get<null, { data: UserStoreDTO }>("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUser(response.data));
    } catch (error: any) {
      if (error.response?.status === 401) {
        Cookies.remove("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user.id) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [user.id, dispatch]);

  if (loading) {
    return null;
  }

  return <AppRoute />;
}

export default App;
