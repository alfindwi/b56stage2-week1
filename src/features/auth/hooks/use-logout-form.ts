import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logoutAction } from "../../../store/auth-slice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout() {
    try {
      Cookies.remove("token");

      dispatch(logoutAction());

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return {
    logout,
  };
}
