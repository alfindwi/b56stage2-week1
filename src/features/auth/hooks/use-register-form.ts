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
import { useToast } from "@chakra-ui/react";
import { z } from "zod";

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
  const toast = useToast();

  async function onSubmit(data: RegisterFormInput) {
    try {
      const response = await apiV1.post<
        null,
        { data: RegisterResponseDTO },
        RegisterRequestDTO
      >("/auth/register", {
        ...data,
      });

      const { user, token } = response.data;

      dispatch(setUser(user));

      Cookies.set("token", token, { expires: 1 });

      toast({
        title: "Registration successful.",
        description: "Welcome to Circle!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: "Please correct the errors in the form.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.error("Validation error:", error.errors);
      } else {
        const errorMessage =
          (error as any).response?.data?.message || "An error occurred";

        toast({
          title: "Registration failed.",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
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
