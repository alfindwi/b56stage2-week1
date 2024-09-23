import { Box, Button, Input, Text } from "@chakra-ui/react"
import { useResetForm } from "../hooks/use-reset-form"
import "../styles/styles.css"


export function ResetForm(){

    const { handleChange, handleSubmit } = useResetForm()

    return (
    <Box margin="50px" >
        <Text fontSize={"3xl"} color= "brand.green" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>circle</Text>
        <Text fontSize={"xl"} color= "white" fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"} marginBottom={"10px"}>Reset password</Text>
        <Box display="flex" flexDirection="column" gap="10px" width="300px">
        <Input name="newpassword" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="Password" placeholder="New Password" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
        <Input name="confirmpassword" onChange={handleChange} padding="10px" border="1px solid #545454" borderRadius="5px" backgroundColor="#1D1D1D" type="Password" placeholder="Confirm New Password" _placeholder={{color: 'brand.text-input'}} color={"white"}/>
        <Button onClick={handleSubmit} _hover={{backgroundColor: "brand.green-disabled"}}
        backgroundColor="#04A51E" color="white" border="none" borderRadius="20px" padding="10px">Create New Password</Button>
        </Box>
    </Box>
    )
}