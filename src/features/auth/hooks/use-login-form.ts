import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../store/auth-slice"
import { LoginFormInput, loginSchema } from "../schemas/login"
import Cookies from "js-cookie";
import "../styles/styles.css"
import { LoginRequestDTO, LoginResponseDTO } from "../types/dto/dto"
import { apiV1 } from "../../../libs/api"

export function useLoginForm() {
    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginSchema),
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function onSubmit(data: LoginFormInput) {
        try {
          const response = await apiV1.post<null, { data: LoginResponseDTO }, LoginRequestDTO>(
            "/auth/login",
            {
              email: data.email,
              passwordUsers: data.passwordUsers,
            }
          );
      
          const { user, token } = response.data;
      
          // Menyimpan token ke cookies
          Cookies.set("token", token, { expires: 1 });
      
          // Dispatch user ke state management
          dispatch(setUser(user));
      
          // Navigasi ke halaman utama setelah login sukses
          navigate("/");
        } catch (error) {
          // Menangani error dengan lebih mendetail
          if ((error as any).response) {
            console.error("Error response:", (error as any).response.data);
            console.error("Error status:", (error as any).response.status);
          } else if ((error as any).request) {
            console.error("Error request:", (error as any).request);
          } else {
            console.error("Error message:", (error as any).message);
          }
        }
      }
      
    
    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting
    }
}