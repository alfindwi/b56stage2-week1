import { Box, Text, Input, Textarea, Button, Avatar, Image, Icon, Flex } from "@chakra-ui/react";
import { GrGallery } from "react-icons/gr";
import { IoCloseCircleOutline } from "react-icons/io5";

interface EditProfileProps {
    onClose: () => void;
}

export function EditProfile({ onClose }: EditProfileProps) {
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
                    top="30%" 
                    left="7%" 
                    transform="translate(-50%, -50%)" 
                    zIndex="1" 
                    border="2px solid black" 
                    margin="0px 30px" 
                    src='/src/styles/profile.png' 
                    name='Dan Abrahmov'
                />
                <Icon as={GrGallery} ml="57px" zIndex={"12"}  size={"20px"} color={"black"} cursor={"pointer"}/>
                <Box mt="30px" ml="30px" width="450px">
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
                    />
                </Box>
            </Box>

            <Flex borderTop="1px solid #B2B2B2" mt="20px">
                <Button mt="15px" borderRadius="30px" textAlign="center" _hover={{bg:"brand.green", color:"white"}} size="md" ml="430px" bg="brand.green" color="white">
                    save
                </Button>
            </Flex>
        </Box> 
    );
}
