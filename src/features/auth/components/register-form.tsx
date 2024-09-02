import { Box, Button, Input, Text } from "@chakra-ui/react"
import { useRegisterForm } from "../hooks/use-register-form"
import "../styles/styles.css"

export function RegisterForm(){

    const { handleChange, handleSubmit } = useRegisterForm()

    return (
        <Box margin="50px" >
            <Text fontSize={"3xl"} color= "brand.green" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>circle</Text>
            <Text fontSize={"xl"} color= "white" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginBottom={"10px"}>Create account Circle</Text>
            <Box display="flex" flexDirection="column" gap="10px" width="300px">
            <Input name="fullname" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="text" placeholder="Full Name" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
            <Input name="email" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="email" placeholder="Email" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
            <Input name="password" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="password" placeholder="Password" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
            <Button onClick={handleSubmit} _hover={{backgroundColor: "brand.green-disabled"}}
            backgroundColor="#04A51E" color="white" border="none" borderRadius="20px" padding="10px">Create</Button>
            </Box>
            <Text color="white" fontFamily={"Plus Jakarta Sans"} fontSize="12px" marginTop={"10px"}>Already have account? <Text as="a" href="" color={"brand.green"} fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} >Login</Text></Text>
        </Box>
    )
}