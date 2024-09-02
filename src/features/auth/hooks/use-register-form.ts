import { useState } from "react"
import { RegisterFormProps } from "../features/auth/types"

export function useRegisterForm() {
    const [form, setForm] = useState<RegisterFormProps>({
        fullname: "",
        email: "",
        password: ""
    })
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSubmit(){
        console.log("data submitted",form)
    }

    return {
        handleChange,
        handleSubmit
    }
}