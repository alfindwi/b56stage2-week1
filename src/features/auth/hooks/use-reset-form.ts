import { useState } from "react"
import { ResetPassFormProps } from "../types"


export function useResetForm() {
    const [form, setForm] = useState<ResetPassFormProps>({
        newpassword: "",
        confirmpassword: ""
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