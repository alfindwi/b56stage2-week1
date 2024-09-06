import { useState } from "react"
import { LoginFormProps } from "../types"


export function useLoginForm() {
    const [form, setForm] = useState<LoginFormProps>({
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
        console.log("data logged in",form)
    }

    return {
        handleChange,
        handleSubmit
    }
}