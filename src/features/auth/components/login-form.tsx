import { Box, Button, Link as ChakraLink, Input, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLoginForm } from "../hooks/use-login-form";
import "../styles/styles.css";

export function LoginForm() {
  const { register, onSubmit, handleSubmit, errors } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={50}>
        <Text
          fontSize={"3xl"}
          color="brand.green"
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={"bold"}
        >
          circle
        </Text>
        <Text
          fontSize={"xl"}
          color="white"
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={"bold"}
          marginBottom={"10px"}
        >
          Login to Circle
        </Text>
        <Box display="flex" flexDirection="column" gap="10px" width="300px">
          <Input
            {...register("identifier")}
            size={"md"}
            border="1px solid #545454"
            borderRadius="5px"
            backgroundColor="#1D1D1D"
            type="text"
            placeholder="Email atau Username"
            _placeholder={{ color: "brand.text-input" }}
            color={"white"}
          />
          <Input
            {...register("passwordUsers")}
            size={"md"}
            border="1px solid #545454"
            borderRadius="5px"
            backgroundColor="#1D1D1D"
            type="password"
            placeholder="Password"
            _placeholder={{ color: "brand.text-input" }}
            color={"white"}
          />
          {errors.passwordUsers && (
            <p
              style={{
                color: "red",
                margin: 0,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {errors.passwordUsers.message}
            </p>
          )}
          <ChakraLink
            as={ReactRouterLink}
            to="/forgotpassword"
            _hover={{ textDecoration: "none", color: "none" }}
            display="flex"
            justifyContent="end"
            fontSize="12px"
            margin="0px"
            color="white"
          >
            Forgot your password?
          </ChakraLink>
          <Button
            type="submit"
            _hover={{ backgroundColor: "brand.green-disabled" }}
            backgroundColor="#04A51E"
            color="white"
            border="none"
            borderRadius="20px"
            padding="5px"
          >
            Login
          </Button>
        </Box>
        <Text
          color="white"
          fontFamily={"Plus Jakarta Sans"}
          fontSize="12px"
          marginTop={"10px"}
        >
          Don't have an account yet?
          <ChakraLink
            as={ReactRouterLink}
            to="/register"
            _hover={{ textDecoration: "none", color: "none" }}
            color={"brand.green"}
            fontSize="12px"
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"bold"}
            marginLeft="5px"
          >
            Create account
          </ChakraLink>
        </Text>
      </Box>
    </form>
  );
}
