import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/auth-slice";
import { LoginFormInput, loginSchema } from "../schemas/login";
import Cookies from "js-cookie";
import "../styles/styles.css";
import { LoginRequestDTO, LoginResponseDTO } from "../types/dto/dto";
import { apiV1 } from "../../../libs/api";
import { z } from "zod";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data: LoginFormInput) {
    try {
      const parsedData = loginSchema.parse(data);

      // Kirim data ke backend
      const response = await apiV1.post<
        null,
        { data: LoginResponseDTO },
        LoginRequestDTO
      >("/auth/login", {
        email: /^\S+@\S+\.\S+$/.test(parsedData.identifier)
          ? parsedData.identifier
          : undefined,
        username: /^[a-zA-Z0-9_]{3,}$/.test(parsedData.identifier)
          ? parsedData.identifier
          : undefined,
        passwordUsers: parsedData.passwordUsers,
      });

      const { user, token } = response.data;

      // Simpan token ke cookies
      Cookies.set("token", token, { expires: 1 });

      // Simpan data user ke state
      dispatch(setUser(user));

      // Arahkan user ke halaman utama
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error response:", (error as any).response?.data);
        console.error("Error message:", (error as any).message);
      }
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
