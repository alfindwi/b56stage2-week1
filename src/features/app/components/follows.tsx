import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/use-store";
import { RootState } from "../../../store/store";
import { fetchFollowers, fetchFollowing } from "../../../store/follows-slice";


export function Follows(){
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

    useEffect(() => {
      dispatch(fetchFollowers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchFollowing());
      }, [dispatch]);

    return (
        <Flex
            direction="column"
            width={`calc(100vw - 749px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            ml="325px"
            mr="430px"
        >   
            <Text mt={"5px"} color={"white"} padding={"20px 20px 8px 20px"} fontSize={"xl"} fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>Follows</Text>
            <FollowsContent activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "followers" ? <Followers /> : <Following />}
        </Flex>
    )
}


export function FollowsContent({ setActiveTab }: FollowsContentProps) {

    return (
        <Flex 
            direction="row" 
            alignItems="center" 
            justifyContent="center" 
            mt="5px" 
            padding="0px 5px" 
            width="100%"
        >
            <Box display={"flex"} textAlign={"center"} _hover={{bg: "#303030"}} padding={"0px 10px"} flex={"1"}>
            <Button onClick={() => setActiveTab("followers")} bg={"none"} color={"white"} _focus={{bg: "none", borderBottom: "3px solid #04A51E"}} _hover={{bg: "none"}} flex={"1"}>
                <Text fontSize={"sm"}>Followers</Text>
            </Button>
            </Box>
            <Box display={"flex"} textAlign={"center"} _hover={{bg: "#303030"}} padding={"0px 10px"} flex={"1"}>
            <Button onClick={() => setActiveTab("following")} bg={"none"} color={"white"} _focus={{bg: "none", borderBottom: "3px solid #04A51E"}} _hover={{bg: "none"}} flex="1">
                <Text fontSize={"sm"}>Following</Text>
            </Button>
            </Box>
        </Flex>
    );
}


export function Followers() {
    const followers = useSelector((state: RootState) => state.follows.followers);

    return (
      <Flex
        padding="12px 16px"
        width="100%"
        maxWidth="100%" 
        direction={"column"}
      >
        {followers.map((followers) => (
           <Flex mt={"10px"} ml="5px" width="100%">
           <Avatar
             size="sm"
             src= {followers.avatar}
             name="Indah Pra Karya"
           />
             <Flex ml={"10px"} direction={"column"}>
               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                 {followers.name}
               </Text>
               <Text mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                 {followers.username}
               </Text>
               <Text mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="11px" color="White">
               {followers.bio}
               </Text>
             </Flex>
             <Button  _hover={{bg: "none"}} marginLeft={"auto"} bg={"none"} mb={"40px"} border={followers.follow ? "1px solid #909090" : "1px solid white"} color={followers.follow ? "#909090" : "white"} fontSize={"12px"} borderRadius={"full"} size={"sm"}>
                {followers.follow ? "Following" : "Follow"}
             </Button>
           </Flex>
        ))}
      
        
        
      </Flex>
    );
}

export function Following() {
    const following = useSelector((state: RootState) => state.follows.following);

    return (
      <Flex
        padding="12px 16px"
        width="100%"
        maxWidth="100%" 
        direction={"column"}
      >
        {following.map((following) => (
           <Flex mt={"10px"} ml="5px" width="100%">
           <Avatar
             size="sm"
             src= {following.avatar}
             name="Indah Pra Karya"
           />
             <Flex ml={"10px"} direction={"column"}>
               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                 {following.name}
               </Text>
               <Text mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                 {following.username}
               </Text>
               <Text mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="11px" color="White">
               {following.bio}
               </Text>
             </Flex>
             <Button  _hover={{bg: "none"}} marginLeft={"auto"} bg={"none"} mb={"40px"} border={following.follow ? "1px solid #909090" : "1px solid white"} color={following.follow ? "#909090" : "white"} fontSize={"12px"} borderRadius={"full"} size={"sm"}>
                {following.follow ? "Following" : "Follow"}
             </Button>
           </Flex>
        ))}
      
        
        
      </Flex>
    );
}

