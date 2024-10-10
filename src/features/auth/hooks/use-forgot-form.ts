import { useState } from 'react';
import { apiV1 } from '../../../libs/api';
import { useToast } from '@chakra-ui/react';

const useForgotPassword = () => {
    const toast = useToast(); // Initialize the toast
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (email: string) => {
        setLoading(true);

        try {
            const response = await apiV1.post('/auth/forgot-password', { email });
            toast({
                title: "Success!",
                description: response.data.message || "Instructions sent to your email.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } catch (err: any) {
            toast({
                title: "Error!",
                description: err.response?.data?.message || "Failed to send instructions.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading };
};

export default useForgotPassword;
