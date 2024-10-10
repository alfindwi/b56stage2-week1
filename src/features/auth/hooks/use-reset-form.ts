import { useState } from 'react';
import { apiV1 } from '../../../libs/api';
import { useToast } from '@chakra-ui/react';

export const useResetPassword = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (token: string, newPassword: string) => {
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await apiV1.post('/auth/reset-password', { token, passwordUsers: newPassword });
            setMessage(response.data.message);
            toast({
                title: "Success!",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to reset password.";
            setError(errorMessage);
            toast({
                title: "Error!",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, message, error };
};
