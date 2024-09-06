import { useLoginForm } from "../hooks/use-login-form"
import "../styles/styles.css"
import { Box, Button, Link as ChakraLink, Input, Text } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"



export function ForgotForm(){

    const { handleChange, handleSubmit } = useLoginForm()

    return (
    <Box margin="50px" >
        <Text fontSize={"3xl"} color= "brand.green" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>circle</Text>
        <Text fontSize={"xl"} color= "white" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginBottom={"10px"}>Forgot password</Text>
        <Box display="flex" flexDirection="column" gap="10px" width="300px">
        <Input name="email" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="email" placeholder="Email" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
        <Button onClick={handleSubmit} _hover={{backgroundColor: "brand.green-disabled"}}
        backgroundColor="#04A51E" color="white" border="none" borderRadius="20px" padding="10px">Send Instruction</Button>
        </Box>
        <Text color="white" fontFamily={"Plus Jakarta Sans"} fontSize="12px" marginTop={"10px"}>Already have account?
            <ChakraLink as={ReactRouterLink} to="/login" _hover={{textDecoration: "none", color: "none"}}  color={"brand.green"} fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginLeft="5px">
                Login
            </ChakraLink>
        </Text>
    </Box>
    )
}