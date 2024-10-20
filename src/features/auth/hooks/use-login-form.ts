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
import { useToast } from "@chakra-ui/react";

export function useLoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormInput) {
    try {
      const parsedData = loginSchema.parse(data); 

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

      Cookies.set("token", token, { expires: 1 });

      dispatch(setUser(user));

      toast({
        title: "Logged in successfully.",
        description: "Welcome to Circle!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        toast({
          title: "Validation error",
          description: error.errors.map((e) => e.message).join(", "),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        const errorMessage =
          (error as any).response?.data?.message || "Failed to log in.";

        toast({
          title: "Login failed",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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

