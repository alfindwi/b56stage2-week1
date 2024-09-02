import { useState } from "react"
import { ForgotFormProps } from "../features/auth/types"


export function useResetForm() {
    const [form, setForm] = useState<ForgotFormProps>({
        email: "",
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