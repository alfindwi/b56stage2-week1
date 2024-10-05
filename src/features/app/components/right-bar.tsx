import { Avatar, Box, Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { fetchDummyUsers } from "../../../store/auth-slice";
import { fetchFollowers, fetchFollowing, followUser, unfollowUser } from "../../../store/follows-slice";
import "../styles/styles.css";
import { fetchFolloweds } from "../../../store/following-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchSuggestedUsers } from "../../../store/suggestion-slice";

interface RigthBarProps {
    isProfileVisible: boolean;
    onEditProfileClick: () => void;
  }
  
  export function RightBar({ isProfileVisible, onEditProfileClick }: RigthBarProps) {
    const location = useLocation();

    return (
      <Flex
        direction="column"
        width="410px"
        height="100vh"
        bg="brand.bg"
        padding="10px 50px 10px 40px"
        color="white"
        border="1px solid #545454"
        position="fixed"
        right="0"
        top="0"
      >
    {location.pathname !== "/profile" && (
        <ProfileRight
          isProfileVisible={!isProfileVisible}
          onEditProfileClick={onEditProfileClick}
        />
      )}        
        <SuggestForYou  userId={useAppSelector((state) => state.auth.id)}/>
        <DevelopedBy />
      </Flex>
    );
  }

export function ProfileRight({ onEditProfileClick }: RigthBarProps) {
    const dispatch = useAppDispatch();
    
    const { username, fullName, image, bio, backgroundImage} = useAppSelector((state) => state.auth);
    const {following} = useSelector((state: RootState) => state.following);
    const { followers } = useSelector((state: RootState) => state.follows);

    useEffect(() => {
        dispatch(fetchFollowers());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchFolloweds());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(fetchDummyUsers());
    }, [dispatch]);

    return (
      <Box mr={"10px"} backgroundColor={"brand.profile"} height={"235px"} width={"340px"} position={"relative"} padding={"5px 0px 12px 0px"} borderRadius={"md"}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text padding={"5px 20px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"550"} fontSize={"14px"}>
            My Profile
          </Text>
          <Image src={backgroundImage || "https://res.cloudinary.com/db2rr1kej/image/upload/v1728136949/uploads/dxudu0wusd9ww8r3chjw.png" } width="435px" height={"65px"} padding={"0px 15px"} borderRadius="3xl" />
          <Avatar
            size="lg"
            position={"absolute"}
            top={"42%"}
            left={"10%"}
            transform={"translate(-50%, -50%)"}
            zIndex={"1"}
            border={"2px solid black"}
            margin={"0px 30px"}
            src={image}
            name={fullName}
          />
  
          <Button
            left={"73%"}
            top={"10px"}
            size={"sm"}
            border={"1px solid white"}
            bg={"transparent"}
            color={"white"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"500"}
            _hover={{ color: "none" }}
            _active={{ color: "none" }}
            borderRadius={"50px"}
            fontSize={"10px"}
            onClick={onEditProfileClick}
          >
            Edit Profile
          </Button>
  
          <Box margin={"10px 10px"}>
            <Text fontFamily={"Plus Jakarta Sans"} fontSize={"18px"} fontWeight={"700"}>
              {fullName}
            </Text>
            <Text fontFamily={"Plus Jakarta Sans"} fontSize={"10px"} color={"#909090"}>
              @{username}
            </Text>
            <Text fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"400"}>
              {bio}
            </Text>
            <Flex align={"center"} padding={"4px 0px"}>
              <Text fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                  {following.length}
              </Text>
              <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                  Following
              </Text>
              <Text ml="20px" fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                  {followers.length}
              </Text>
              <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                  Followers
              </Text>
            </Flex>
            
          </Box>
        </Box>
      </Box>
    );
}

export function SuggestForYou({ userId }: { userId: number }) {
  const dispatch = useAppDispatch();
  const { users: suggestedUsers } = useAppSelector((state) => state.suggestion);
  const { following } = useAppSelector((state) => state.follows); 

  useEffect(() => {
    dispatch(fetchFollowing()); 
    dispatch(fetchSuggestedUsers(userId));
  }, [dispatch, userId]);

  const isFollowing = (suggestedUserId: number) => {
    return following.some((follow) => follow.followed.id === suggestedUserId);
  };

  const handleFollowToggle = (suggestedUserId: number) => {
    if (isFollowing(suggestedUserId)) {
      dispatch(unfollowUser(suggestedUserId)); 
    } else {
      dispatch(followUser(suggestedUserId));
    }
  };

  return (
    <Box mt={"8px"} backgroundColor={"brand.profile"} height={"275px"} width={"340px"} position={"relative"} padding={"8px 0px 12px 0px"} borderRadius={"md"}>
      <Heading fontSize={"13px"} padding={"2px 24px"} mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"700"}>
        Suggested for you
      </Heading>

      {Array.isArray(suggestedUsers) && suggestedUsers.map((user) => (
        <Flex key={user.id} alignItems="center" mt={"12px"} padding="0 24px" justifyContent="space-between">
          <Flex alignItems="center">
            <Avatar size='sm' src={user.image || '/default_profile.png'} name={user.fullName} />
            <Box ml="12px">
              <Text fontSize={"12px"} fontWeight={"600"} fontFamily={"Plus Jakarta Sans"}>
                {user.fullName}
              </Text>
              <Text fontSize={"12px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"} color={"#909090"}>
                @{user.username}
              </Text>
            </Box>
          </Flex>

          <Button
            display={"flex"}
            justifyItems={"center"}
            size={"sm"}
            border={"1px solid #909090"} 
            bg={"transparent"} 
            color={isFollowing(user.id) ? "#909090" : "white"} 
            fontFamily={"Plus Jakarta Sans"} 
            fontWeight={"500"} 
            _hover={{ bg: "#e0e0e0" }} 
            borderRadius={"50px"} 
            fontSize={"11px"}
            onClick={() => handleFollowToggle(user.id)}
          >
            {isFollowing(user.id) ? "Following" : "Follow"}
          </Button>
        </Flex>
      ))}
    </Box>
  );
}



export function DevelopedBy() {
    return (
        <Box mt={"13px"} backgroundColor={"brand.profile"} height={"75px"} width={"340px"} position={"relative"} padding={"6px 0px 12px 0px"} borderRadius={"md"}>
            <Text fontSize={"12px"} padding={"3px 15px"} mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"500"} display={"flex"} alignItems={"center"}>
                Developed by Alfin Dwi <Text ml={"5px"} fontSize={"12px"} color={"#B2B2B2"} as={"span"}>•</Text>
                <a style={{display: "flex", alignItems: "center"}} href="https://github.com/pauslaper">
                <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaGithub} />
                </a>
                <a style={{display: "flex", alignItems: "center"}} href="https://www.linkedin.com/in/alvin-dwi-a20452308/">
                <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaLinkedin} />
                </a>
                <a style={{display: "flex", alignItems: "center"}} href="https://www.facebook.com/alvin.dwi.10297?locale=id_ID">
                <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaFacebook} />
                </a>
                <a style={{display: "flex", alignItems: "center"}} href="https://www.instagram.com/alvindvvi/">
                <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaInstagram} />
                </a>
            </Text>
            <Text fontSize={"9px"} padding={"0px 15px"}  fontFamily={"Plus Jakarta Sans"} fontWeight={"500"} display={"flex"} alignItems={"center"}>
                Powered by <Image ml={"5px"} mr={"5px"} src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728067866/uploads/heoqhnkhffnqknxltbju.png" width={"17px"} height={"9px"} alt=""/> DumbWays Indonesia • #1 Coding Bootcamp
            </Text>
        </Box>
    );
}