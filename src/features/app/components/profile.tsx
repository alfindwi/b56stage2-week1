import { Avatar, Box, Button, Flex, Icon, Image, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector, } from "react-redux";
import { fetchContent } from "../../../store/profile-slice";
import { AppDispatch, RootState } from "../../../store/store";
import { EditProfile } from "./edit-profile";


export function Profile(){
    const [isEditProfileVisible, setEditProfileVisible] = useState(false);

    const handleEditProfileClick = () => {
        setEditProfileVisible(true);
    };

    const handleCloseEditProfile = () => {
        setEditProfileVisible(false);
    };
    return (
        <Flex
            direction="column"
            width={`calc(100vw - 749px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            ml="322px"
        >
            <ProfileContent onEditProfileClick={handleEditProfileClick}  />
            <PostCard/>
            {isEditProfileVisible && <EditProfile onClose={handleCloseEditProfile} />}
        </Flex>
    )
}

export function ProfileContent({ onEditProfileClick }: { onEditProfileClick: () => void }){
    return (
        <Box ml="3px" height={"300px"} width={"530px"} position={"relative"}borderRadius={"md"} >
                <Box display="flex"
                flexDirection="column"
                alignItems="flex-start">
                <Text 
                padding={"10px 20px"} 
                fontFamily={"Plus Jakarta Sans"} 
                fontWeight={"550"} 
                fontSize={"23px"}
                > ✨ Stella Audhina ✨
                </Text>
                <Image 
                src="/src/styles/image.png" 
                width="708px" 
                height={"100px"}
                padding={"0px 15px"} 
                borderRadius='3xl'/>
                <Avatar 
                size='lg' 
                position={"absolute"} 
                top={"55%"} 
                left={"7%"} 
                transform={"translate(-50%, -50%)" } 
                zIndex={"1"} 
                border={"2px solid black"} 
                margin={"0px 30px"} 
                src='/src/styles/profile.png' 
                name='Dan Abrahmov' />
                <Button 
                left={"83%"}
                top={"10px"} 
                size={"sm"}
                border={"1px solid white"} 
                bg={"transparent"} 
                color={"white"} 
                fontFamily={"Plus Jakarta Sans"} 
                fontWeight={"500"} 
                _hover={{color: "none"}} 
                _active={{color: "none"}}
                borderRadius={"50px"} 
                fontSize={"10px"}
                onClick={onEditProfileClick}
                >Edit Profile
                </Button>
                   <Box margin={"20px 10px"}>
                   <Text fontFamily={"Plus Jakarta Sans"} fontSize={"18px"} fontWeight={"700"}>✨ Stella Audhina ✨</Text>
                    <Text fontFamily={"Plus Jakarta Sans"} fontSize={"10px"} color={"#909090"}>@audhinafh</Text>
                    <Text fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"400"} >picked over by the worms, and weird fishes</Text>
                    <Flex align={"center"} padding={"4px 0px"}>
                        <Text fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>291</Text>
                        <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>Following</Text>
                        <Text ml="20px" fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} >23</Text>
                        <Text ml="4px"  color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>Followers</Text>
                    </Flex>
                   </Box>
                </Box>
        </Box> 
    )
}

export function PostCard() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchContent());
    })
    const content = useSelector((state: RootState) => state.profile.content);
    console.log(content);
    
    return (
        <Flex width="520px">
        <Flex direction="column" mt="10px" ml="10px" mb="0px" width="100%">
            {content.map((content) => (
            <Flex mt="10px" borderBottom="1px solid #545454" >
                <Avatar
                    size='sm'
                    src='/src/styles/profile.png'
                    name='Indah Pra Karya'
                />
                <Box ml="10px" width="100%">
                    <Flex>
                        <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                            {content.name}
                        </Text>
                        <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                            {content.username} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {content.post_date}
                        </Text>
                    </Flex>
                    <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                        {content.content}
                    </Text>
                    {content.image && content.image !== "" && (
                        <Img mt="10px" src={content.image} width="320px" height="400px" />
                    )}
                    <Flex mb="10px" mt="10px" color="gray.500" fontSize="sm">
                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                            <Icon as={CiHeart} mr="5px" />
                            {content.likeCount}
                        </Flex>
                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                            <Icon as={BiMessageSquareDetail} mr="5px" />
                            {content.commentCount} Replies
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            ))}
        </Flex>
    </Flex>
    );
}

