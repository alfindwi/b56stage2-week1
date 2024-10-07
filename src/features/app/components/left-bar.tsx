import { Avatar, Box, Button, Flex, FormControl, FormLabel, Icon, Img, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCloseCircleOutline, IoHomeOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { Link as ReactRouterLink } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import "../styles/styles.css";
import { useLogout } from "../../auth/hooks/use-logout-form";

interface LeftBarProps {
    onOpenCreatePost: () => void;
}

export function LeftBar({ onOpenCreatePost }: LeftBarProps) {
  const { logout } = useLogout();
  
    return (
        <Flex 
        direction="column"
        width="325px"
        height="100vh"
        bg="brand.bg"
        padding="9px"
        color="white"
        position="fixed"
        border="1px solid #545454">
            
            <Text fontSize={"3xl"} ml={"19px"} color={"brand.green"} fontFamily={"Plus Jakarta Sans"} mb="20px" fontWeight={"bold"}>circle</Text>
            <Button as= {ReactRouterLink} to="/" bg={"none"} leftIcon={<IoHomeOutline  fontSize="20px" />} _active={{bg: "#B2B2B2"}} fontWeight={"500"} textDecoration={"none"} display={"flex"} justifyContent={"start"} padding={"10px 20px"} color={"white"} mb={"10px"} fontFamily={"Plus Jakarta Sans"} _hover={{textDecoration:"none", bg: "#303030"}}>
                Home
            </Button>
            <Button as= {ReactRouterLink} to="/search" bg={"none"} leftIcon={<RiUserSearchLine  fontSize="20px" />}  _active={{color: "#B2B2B2"}} fontWeight={"500"} display={"flex"} justifyContent={"start"} padding={"10px 20px"} color={"white"} mb={"10px"} fontFamily={"Plus Jakarta Sans"} _hover={{textDecoration:"none", bg: "#303030"}}>
                Search
            </Button>
            <Button as= {ReactRouterLink} to="/follows" bg={"none"} leftIcon={<FaRegHeart fontSize="20px" />} _active={{color: "#B2B2B2"}} fontWeight={"500"} display={"flex"} justifyContent={"start"} padding={"10px 20px"} color={"white"} mb={"10px"} fontFamily={"Plus Jakarta Sans"} _hover={{textDecoration:"none", bg: "#303030"}}>
                Follows
            </Button>
            <Button as= {ReactRouterLink} to="/profile" bg={"none"} leftIcon={<CgProfile fontSize="20px" />} _active={{color: "#B2B2B2"}} fontWeight={"500"} display={"flex"} justifyContent={"start"} padding={"10px 20px"} color={"white"} mb={"10px"} fontFamily={"Plus Jakarta Sans"} _hover={{textDecoration:"none", bg: "#303030"}}>
                Profile
            </Button>
            <Button onClick={onOpenCreatePost} margin={"0px 10px"} color={"white"} _active={{color: "brand.green"}} backgroundColor={"brand.green"} fontFamily={"Plus Jakarta Sans"} padding={"12px 16x"} gap={"10px"} borderRadius={"30px"} fontWeight={"semibold"} _hover={{backgroundColor: "brand.green-disabled"}}>
                Create Post
            </Button>

            <Button onClick={logout} leftIcon={<TbLogout2 fontSize="20px" />} bg={"transparent"} _active={{color: "#B2B2B2"}} fontWeight={"500"} display={"flex"} justifyContent={"start"} padding={"10px 20px"} color={"white"} mt={"auto"} fontFamily={"Plus Jakarta Sans"} _hover={{textDecoration:"none", bg: "#303030"}}>
                Logout
            </Button>
        </Flex>
    )
}



export function CreatePost({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null); 


    const handleClosePreview = () => {
      setShow(false);
      setImage(null);
  };

  const [show, setShow] = useState(false);

  const {register, handleSubmit, isSubmitting, onSubmit} = useHome();

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="brand.profile"
      padding="20px"
      direction="column"
      borderRadius="10px"
      zIndex={"10000"}
      width="500px"
    >
      <Flex justify="flex-end" width="100%">
        <Button
          size={"sm"}
          onClick={onClose}
          rightIcon={<IoCloseCircleOutline fontSize="20px" />}
          bg={"transparent"}
          _active={{ color: "#B2B2B2" }}
          fontWeight={"500"}
          color={"brand.text-input"}
          fontFamily={"Plus Jakarta Sans"}
          _hover={{ textDecoration: "none", bg: "none" }}
        />
      </Flex>
      
      <Flex width="100%" align="center">
        <Avatar size="sm" src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728142149/uploads/o8ivurqezrpbzwpj7k0y.png" name="Mohammed Jawahir" />
        <Input
          ml="10px"
          size={"sm"}
          width="100%"
          padding={"10px"}
          border="none"
          _focus={{ border: "none", boxShadow: "none" }}
          borderRadius="5px"
          backgroundColor="brand.profile"
          type="text"
          placeholder="What is happening?!"
          _placeholder={{ color: "brand.text-input" }}
          color={"white"}
          {...register("content")}
        />
      </Flex>
      {show && (
          <Flex justify="center" align="center" width="100%">
            <Box position="relative">
              <Img
                src={image || ""}
                width={"400px"}
                height={"315px"}
                borderRadius={"10px"}
                ml={"28px"}
                mt={"10px"}
              />
              <Icon
                as={IoIosCloseCircle}
                color="white"
                position="absolute"
                top="20px"
                right="10px"
                cursor="pointer"
                fontSize={"20px"}
                _hover={{ color: "white" }}
                onClick={handleClosePreview}
              />
            </Box>
          </Flex>
        )}

      <Flex
        mt="30px"
        borderTop={"1px solid #545454"}
        pt="10px"
        justify="space-between"
        width="100%"
        alignItems="center"
      >
        <FormControl display="flex" alignItems="center">
          <FormLabel cursor={"pointer"} size={"md"} color={"brand.green"} bg={"none"} _hover={{ bg: "none" }} mb="0">
            <GrGallery/>
          </FormLabel>
            <Input hidden type="file" {...register("image")}/>
        </FormControl>
        <Button
         type="submit"
          size={"sm"}
          bg={"brand.green-disabled"}
          fontSize={"11px"}
          fontWeight={"500"}
          color={"white"}
          padding={"8px 16px"}
          _active={{ bg: "brand.green" }}
          borderRadius={"30px"}
          _hover={{ bg: "brand.green" }}
        >
          {isSubmitting ? (<Spinner size={"sm"} position="absolute" top="27%" left="27%" transform="translate(-50%, -50%)" />
        ) : "Post"}
        </Button>
      </Flex>
      
    </Flex>
    </form>
  );
}



