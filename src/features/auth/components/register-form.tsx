import { Box, Button, Link as ChakraLink, Input, Spinner, Text } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import { setUser } from "../../../store/auth-slice"
import { RegisterFormInput, registerSchema } from "../schemas/register"
import "../styles/styles.css"

export function RegisterForm(){
    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInput>({
        resolver: zodResolver(registerSchema),
    })

    const navigate = useNavigate()

    const users = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();

    async function onSubmit(data: RegisterFormInput) {
        localStorage.setItem("email" , data.email)
        localStorage.setItem("fullname", data.fullName)
        dispatch(setUser({
            id: 1,
            fullname: data.fullName,
            email: data.email
        }));

    navigate("/")
    }

    return (
        <Box margin="50px" >
            <Text color={"white"}>{JSON.stringify(users)}</Text>
            <Text fontSize={"3xl"} color= "brand.green" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>circle</Text>
            <Text fontSize={"xl"} color= "white" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginBottom={"10px"}>Create account Circle</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap="10px" width="300px">
            <Input
            {...register("fullName")}
            padding="10px" 
            border="1px solid #545454" 
            borderRadius="5px" 
            backgroundColor="#1D1D1D" 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            _placeholder={{color: 'brand.text-input'}} 
            color={"white"}/>
            {errors.fullName && (
                <p style={{color: "red", margin: 0, fontFamily: "Plus Jakarta Sans"}}>{errors.fullName.message}</p>
            )}
            <Input  
            {...register("email")}
            padding="10px" 
            border="1px solid #545454" 
            borderRadius="5px" 
            backgroundColor="#1D1D1D" 
            type="email" 
            placeholder="Email" 
            _placeholder={{color: 'brand.text-input'}} 
            color={"white"}/>
            {errors.email && (
                <p style={{color: "red", margin: 0, fontFamily: "Plus Jakarta Sans"}}>{errors.email.message}</p>
            )}
            <Input
            {...register("password")}  
            padding="10px" 
            border="1px solid #545454" 
            borderRadius="5px" 
            backgroundColor="#1D1D1D" 
            type="password" 
            placeholder="Password" 
            _placeholder={{color: 'brand.text-input'}} 
            color={"white"}/>
            {errors.password && (
                <p style={{color: "red", margin: 0, fontFamily: "Plus Jakarta Sans"}}>{errors.password.message}</p>
            )}
            <Button 
            type="submit" 
            _hover={{backgroundColor: "brand.green-disabled"}}
            backgroundColor="#04A51E" 
            color="white" 
            border="none" 
            borderRadius="20px" 
            padding="10px">
            {isSubmitting ? <Spinner color="white"/> : "Create"} </Button>
            </Box>
            </form>
            <Text color="white" fontFamily={"Plus Jakarta Sans"} fontSize="12px" marginTop={"10px"}>Already have account?
                <ChakraLink as={ReactRouterLink} to="/login" _hover={{textDecoration: "none", color: "none"}}  color={"brand.green"} fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginLeft="5px">
                    Login
                </ChakraLink>
            </Text>
        </Box>
    )
}