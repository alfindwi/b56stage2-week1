import { Avatar, Box, Button, Flex, FormControl, FormLabel, Icon, Image, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { GrGallery } from "react-icons/gr";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAppSelector } from "../../../hooks/use-store";
import { useEditProfile } from "../hooks/useEditProfile";

interface EditProfileProps {
    onClose: () => void;
}

export function EditProfile({ onClose }: EditProfileProps) {
    const { username,fullName, image, bio} = useAppSelector((state) => state.auth);
    const {register, handleSubmit, isSubmitting, onSubmit} = useEditProfile();
    return (
        <Box 
            ml="16px" 
            height="478px" 
            bg="brand.profile" 
            width="520px" 
            position="fixed" 
            borderRadius="md" 
            top="11%" 
            left="25%"
            zIndex={1}
        >
            <form onSubmit={handleSubmit(onSubmit)}>    
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Text 
                    padding="10px 20px" 
                    fontFamily="Plus Jakarta Sans" 
                    fontWeight="550" 
                    fontSize="23px"
                    color="white"
                >
                    Edit Profile
                    <Icon onClick={onClose} color={"brand.text-input"} as={IoCloseCircleOutline} cursor={"pointer"} ml="330px"/>
                </Text>
                <Image 
                    src="/src/styles/image.png" 
                    width="700px" 
                    height="89px"
                    padding="0px 15px" 
                    borderRadius='3xl'
                />
                <Avatar
                    size='lg' 
                    position="absolute" 
                    top="29%" 
                    left="7%" 
                    transform="translate(-50%, -50%)" 
                    zIndex="1" 
                    border="2px solid black" 
                    margin="0px 30px" 
                    src={image}
                    name={fullName}
                />
                <FormControl>
                    <FormLabel position="absolute"
                    top="10%" 
                    left="50%"
                    transform="translate(-1260%, -50%)"
                    zIndex="2"
                    color="brand.green">
                        <GrGallery />
                    </FormLabel>
                    <Input hidden type="file" {...register("image")}  />
                </FormControl>
                <Box mt="50px" ml="30px" width="450px">
                    <Input 
                        placeholder="name"
                        fontFamily="Plus Jakarta Sans" 
                        fontSize="12px" 
                        fontWeight="md" 
                        color={"white"}
                        border="1px solid #B2B2B2"
                        _hover={{border:"1px solid #B2B2B2"}}
                        _placeholder={{color: "white"}}
                        _focus={{border:"1px solid #B2B2B2", boxShadow: "none"}}
                        defaultValue={fullName}
                        {...register("fullName")}
                    ></Input>
                    <Input 
                        mt="10px"
                        placeholder="username"
                        fontFamily="Plus Jakarta Sans" 
                        fontSize="12px" 
                        fontWeight="md" 
                        color={"white"}
                        border="1px solid #B2B2B2"
                        _hover={{border:"1px solid #B2B2B2"}}
                        _placeholder={{color: "white"}}
                        _focus={{border:"1px solid #B2B2B2", boxShadow: "none"}}
                        defaultValue={username}
                        {...register("username")}
                    />
                    <Textarea 
                        resize="none"
                        mt="10px"
                        placeholder="bio"
                        fontFamily="Plus Jakarta Sans" 
                        fontSize="12px" 
                        fontWeight="md" 
                        color={"white"}
                        border="1px solid #B2B2B2"
                        _hover={{border:"1px solid #B2B2B2"}}
                        _placeholder={{color: "white"}}
                        _focus={{border:"1px solid #B2B2B2", boxShadow: "none"}}
                        defaultValue={bio}
                        {...register ("bio")}
                    />
                </Box>
            </Box>
           
            <Flex borderTop="1px solid #B2B2B2" mt="20px">
                <Button type="submit" mt="15px" borderRadius="30px" textAlign="center" _hover={{bg:"brand.green", color:"white"}} size="md" ml="430px" bg="brand.green" color="white">
                    {isSubmitting ? <Spinner/> : "Save"}
                </Button>
            </Flex>
            </form>
        </Box> 
    );
}
