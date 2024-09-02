import { Box } from "@chakra-ui/react"
import { LoginForm } from "../features/auth/components/login-form"

export default function LoginRoute () {   
    return (
        <Box>
            <Box display="flex" justifyContent="center">
            <LoginForm />
            </Box>
        </Box>
    )
}