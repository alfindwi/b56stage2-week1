import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
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
        setError,
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginSchema),
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function onSubmit(data: LoginFormInput) {
        try {
            const response = await apiV1.post<null, {data: LoginResponseDTO}, LoginRequestDTO>(
                "/login", 
                {
                   email: data.email,
                   passwordUsers: data.passwordUsers
                })


                const {user, token} = response.data
                
                dispatch(setUser(user));

                Cookies.set("token", token, {expires: 1 } )
        
            navigate("/")

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { response: { data } } = error;
    
                if(data.code === "USERS_NOT_EXIST"){
                    setError("email", { type: "custom", message: data.message })
                    setError("passwordUsers", { type: "custom", message: data.message })
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