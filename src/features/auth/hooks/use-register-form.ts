import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/auth-slice";
import { RegisterFormInput, registerSchema } from "../schemas/register";
import "../styles/styles.css";
import Cookies from "js-cookie";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/dto/dto";
import { apiV1 } from "../../../libs/api";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data: RegisterFormInput) {
    try {
      const response = await apiV1.post<
        null,
        { data: RegisterResponseDTO },
        RegisterRequestDTO
      >("/auth/register", {
        ...data,
      });

      console.log("response", response.data);

      const { user, token } = response.data;
      console.log("token", token);

      dispatch(setUser(user));

      Cookies.set("token", token, { expires: 1 });

      navigate("/");
    } catch (error) {
      console.log(error);
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
