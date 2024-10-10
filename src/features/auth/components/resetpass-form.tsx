import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useResetPassword } from "../hooks/use-reset-form";
import { useLocation } from "react-router-dom";

export function ResetForm() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token"); 

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, loading} = useResetPassword();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!token) {
      console.error("Token is missing");
      return;
    }

    setNewPassword("");
    setConfirmPassword("");

    await resetPassword(token, newPassword);
  };

  return (
    <Box margin="50px">
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
        Reset Password
      </Text>
      <Box display="flex" flexDirection="column" gap="10px" width="300px">
        <Input
          name="newpassword"
          onChange={(e) => setNewPassword(e.target.value)}
          padding="10px"
          border="1px solid #545454"
          borderRadius="5px"
          backgroundColor="#1D1D1D"
          type="password" 
          placeholder="New Password"
          _placeholder={{ color: "brand.text-input" }}
          color={"white"}
        />
        <Input
          name="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)} 
          padding="10px"
          border="1px solid #545454"
          borderRadius="5px"
          backgroundColor="#1D1D1D"
          type="password"
          placeholder="Confirm New Password"
          _placeholder={{ color: "brand.text-input" }}
          color={"white"}
        />
        <Button
          onClick={handleSubmit}
          isLoading={loading} 
          _hover={{ backgroundColor: "brand.green-disabled" }}
          backgroundColor="#04A51E"
          color="white"
          border="none"
          borderRadius="20px"
          padding="10px"
        >
          Create New Password
        </Button>
      </Box>
    </Box>
  );
}
