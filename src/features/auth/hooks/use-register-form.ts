import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../store/auth-slice"
import { RegisterFormInput, registerSchema } from "../schemas/register"
import "../styles/styles.css"
import Cookies from "js-cookie"
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/dto/dto"

export function useRegisterForm() {
    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormInput>({
        resolver: zodResolver(registerSchema),
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function onSubmit(data: RegisterFormInput) {
        try {
            const response = await axios.post<null, {data: RegisterResponseDTO}, RegisterRequestDTO>(
                "http://localhost:4000/api/v1/auth/register", 
                {
                    ...data
                })

                console.log("response", response.data)

                const {user, token} = response.data
                console.log("token" , token)    
                
                dispatch(setUser(user, ));

                Cookies.set("token", token, {expires: 1 } )
        
            navigate("/")

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { response: { data } } = error;
    
                if (Array.isArray(data.message)) {
                    data.message.forEach((errorMsg: string) => {
                        if (errorMsg.includes("fullName")) {
                            setError("fullName", { type: "custom", message: errorMsg });
                        }
                        if (errorMsg.includes("passwordUsers")) {
                            setError("passwordUsers", { type: "custom", message: errorMsg });
                        }
                        if (errorMsg.includes("email")) {
                            setError("email", { type: "custom", message: errorMsg });
                        }
                    });
                }
    
                console.log("error", data);
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