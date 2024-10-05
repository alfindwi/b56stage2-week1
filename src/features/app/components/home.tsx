import { Avatar, Box, Button, Flex, FormControl, FormLabel, Icon, Image, Img, Input, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { GrGallery } from "react-icons/gr";
import { IoIosArrowRoundBack, IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { ThreadEntity } from "../../../entities/thread";
import { UserEntity } from "../../../entities/user";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { fetchFolloweds } from "../../../store/following-slice";
import { fetchFollowers, fetchFollowing, followUser, unfollowUser } from "../../../store/follows-slice";
import { fetchSelectedUser, fetchThreadsProfile } from "../../../store/profile-user-slice";
import { likeReply, unlikeReply } from "../../../store/replyLike-slice";
import { RootState } from "../../../store/store";
import { likeThread, unlikeThread } from "../../../store/threadLike-slice";
import { useHome } from "../hooks/useHome";
import { useReply } from "../hooks/useReply";

export function Home() {
    const [isWhatHappenVisible, setIsWhatHappenVisible] = useState(true);
    useEffect(() => {
        setIsWhatHappenVisible(true);
    }, []);


    return (
        <Flex
            direction="column"
            width={`calc(100vw - 749px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            marginLeft="325px" 
            marginRight="430px"
        >
            {isWhatHappenVisible && <WhatHappen />}
            {!isWhatHappenVisible && <WhatHappen />}
        </Flex>
    );
}


function WhatHappen() {
    const dispatch = useAppDispatch();


    const [currentView, setCurrentView] = useState<'whatHappen' | 'postCard' | 'profile'>('whatHappen');
    const [show, setShow] = useState(false);
    const replyLikes = useAppSelector((state) => state.reply.replies); 
    const [threadId, setThreadId] = useState<number | null>(null);
    const { following } = useSelector((state: RootState) => state.follows);
    const { register, handleSubmit, isSubmitting, onSubmit, data} = useHome();
    const { likes } = useAppSelector((state) => state.like);
    const validThreadId = threadId ?? 0;
    const {register: reply, handleSubmit: replySubmit, isSubmitting: replyIsSubmitting, onSubmit: replyOnSubmit, data: replyData} = useReply(validThreadId);
    const profiles = useAppSelector((state) => state.profile.threads)
    const [selectedThread, setSelectedThread] = useState<ThreadEntity | null>(null);
    const [image, setImage] = useState<string | null>(null); 



    useEffect(() => {
        dispatch(fetchFollowing()); 
    }, [dispatch]);

    const isFollowing = (userId: number) => {
        return following.some((user) => user.followed && user.followed.id === userId);
    };

  const handleFollow = (followedId: number) => {
    dispatch(followUser(followedId));
  };

  const handleUnfollow = (followedId: number) => {
    dispatch(unfollowUser(followedId));
  };

    const goToPostCard = (thread: ThreadEntity, ) => {
        setSelectedThread(thread);
        setCurrentView('postCard');
        handleThreadClick(thread.id);
    };
    
    const selectedUser = useSelector((state: RootState) => state.profile.selectedUser);

    const goToProfile = (userId: number, thread: ThreadEntity, user: UserEntity) => {
        dispatch(fetchThreadsProfile(userId));
        console.log(user)
        dispatch(fetchSelectedUser(userId));

        setCurrentView('profile');
        
        handleThreadClick(thread.id);
    };



    const goToWhatHappen = () => {
        setCurrentView('whatHappen');
    };

    const handleThreadClick = (id: number) => {
        setThreadId(id);
    };


   

    const handleLike = (threadId: number) => {
        const likeData = likes[threadId];
        if (likeData?.isLiked) {
          dispatch(unlikeThread(threadId));
        } else {
          dispatch(likeThread(threadId));
        }
    };
    


    const handleLikeReply = (replyId: number) => {
        const reply = replyLikes.find(r => r.id === replyId);
    
        if (reply?.isLikedReply) {
          dispatch(unlikeReply(replyId));
        } else {
          dispatch(likeReply(replyId));
        }
      };

    useEffect(() => {
        dispatch(fetchFollowers());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchFolloweds());
    }, [dispatch]);



    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file); // Membuat URL dari file gambar
            setImage(imageUrl); // Menyimpan URL ke state
            setShow(true); // Menampilkan preview
        } else {
            setImage(null); // Menghapus gambar jika tidak ada file yang dipilih
            setShow(false);
        }
    };
    

      return (
        <>  
            {/* Thread */}
            {currentView === 'whatHappen' && (
                <>
                    <Text color={"white"} padding={"20px 20px 8px 20px"} fontSize={"xl"} fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>Home</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex padding="5px 20px 5px 20px" align="center">
                        <Avatar size="sm" src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728142149/uploads/o8ivurqezrpbzwpj7k0y.png" name="Mohammed Jawahir" />
                        <Box ml="10px" width="100%">
                            <Input
                                size={"sm"}
                                border="none"
                                _focus={{ border: "none", boxShadow: "none" }}
                                borderRadius="5px"
                                backgroundColor="#1D1D1D"
                                type="text"
                                placeholder="What is happening?!"
                                _placeholder={{ color: 'brand.text-input' }}
                                color={"white"}
                                {...register("content")}
                            />
                        </Box>
                        <Flex alignItems="center" justifyContent="space-between">
                            <FormControl display="flex" alignItems="center">
                                <FormLabel cursor={"pointer"} size={"md"} color={"brand.green"} bg={"none"} _hover={{ bg: "none" }} mb="0">
                                    <GrGallery />
                                </FormLabel>
                                <Input 
                                    hidden 
                                    type="file" 
                                    accept="image/*" 
                                    {...register("image", { onChange: handleChangeImage })} 
                                />
                            </FormControl>
                        </Flex>
                        <Button
                            type="submit"
                            mr="7px"
                            size={"sm"}
                            bg={"brand.green-disabled"}
                            fontSize={"11px"}
                            fontWeight={"500"}
                            color={"white"}
                            padding={"8px 16px"}
                            _active={{ bg: "brand.green" }}
                            borderRadius={"30px"}
                            _hover={{ bg: "brand.green" }}
                            position="relative"
                        >
                            {isSubmitting ? (
                                <Spinner size={"sm"} position="absolute" top="30%" left="27%" transform="translate(-50%, -50%)" />
                            ) : "Post"}
                        </Button>
                    </Flex>

                    {show && (
                            <Box position="relative" ml={"75px"} mb={"20px"}>
                                <Img 
                                    src={image || ""}
                                    width={"350px"}
                                    height={"390px"}
                                    borderRadius={"10px"}
                                />
                                <Icon 
                                    as={IoIosCloseCircle} 
                                    color="white" 
                                    position="absolute" 
                                    top="10px" 
                                    fontSize={"20px"}
                                    right="120px" 
                                    cursor="pointer" 
                                    _hover={{ color: "white" }} 
                                    zIndex="10" 
                                    onClick={() => {
                                        setShow(false); 
                                    }}
                                />
                            </Box>
                    )}
                    </form>

                    {/* Thread */}
                    {Array.isArray(data) ? (
                                data.map((thread) => {
                                const likeData = likes[thread.id] || { isLiked: false, likesCount: 0 };
                                return (
                                    <Flex
                                    key={thread.id}
                                    border="1px solid #545454"
                                    padding="12px 16px"
                                    height={"auto"}
                                    width={"545px"}
                                    cursor="pointer"
                                    >
                                    <Box>
                                        <Avatar
                                        size="sm"
                                        src={thread.user.image}
                                        name={thread.user.fullName}
                                        onClick={() => goToProfile(thread.user.id, thread, thread.user)}
                                        />
                                    </Box>
                                    <Box
                                        ml="10px"
                                        width="100%"
                                        onClick={() => {
                                        goToPostCard(thread);
                                        handleThreadClick(thread.id);
                                        }}
                                    >
                                        <Flex>
                                        <Text
                                            fontWeight="700"
                                            fontFamily="Plus Jakarta Sans"
                                            fontSize="12px"
                                        >
                                            {thread.user.fullName}
                                        </Text>
                                        <Text
                                            ml="5px"
                                            mb="5px"
                                            fontFamily="Plus Jakarta Sans"
                                            fontSize="12px"
                                            color="gray.500"
                                        >
                                            @{thread.user.username}
                                            <Text as="span" color="gray.500" ml="1px" mr="1px">
                                            •
                                            </Text>
                                            {new Date(thread.createdAt).toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            })}
                                        </Text>
                                        </Flex>
                                        <Text
                                        fontSize="12px"
                                        fontFamily="Plus Jakarta Sans"
                                        fontWeight="400"
                                        color="white"
                                        >
                                        {thread.content}
                                        </Text>
                                        <Img mt="10px" src={thread.image} width={"400px"} height={"300px"} />
                                        <Flex mt="10px" color="gray.500" fontSize="sm">
                                        <Flex
                                            fontFamily="Plus Jakarta Sans"
                                            fontWeight="400"
                                            fontSize="12px"
                                            alignItems="center"
                                            mr="20px"
                                            onClick={() => handleLike(thread.id)} 
                                            cursor="pointer"
                                        >
                                            <Icon as={likeData.isLiked ? FcLike : FaRegHeart} size={"15px"} mr="5px" />
                                            {thread.likes?.length}
                                        </Flex>
                                        <Flex
                                            fontFamily="Plus Jakarta Sans"
                                            fontWeight="400"
                                            fontSize="12px"
                                            alignItems="center"
                                            mr="20px"
                                        >
                                            <Icon as={BiMessageSquareDetail} mr="5px" />
                                            {thread.replies?.length} Replies
                                        </Flex>
                                        </Flex>
                                    </Box>
                                    </Flex>
                                );
                                })
                    ) : null}
                </>
            )}

            {/* Profile */}
            {currentView === 'profile' && (
                <>
                {selectedUser && (
                    console.log("selectedUser", selectedUser),
                     <Box height={"300px"} width={"530px"} position={"relative"}borderRadius={"md"} >
                     <Box display="flex"
                     flexDirection="column"
                     alignItems="flex-start">
                     <Flex>
                     <Button 
                     onClick={goToWhatHappen} 
                     leftIcon={<IoIosArrowRoundBack size="30px" />} 
                     bg="transparent" 
                     _active={{color: "white", bg: "none"}} 
                     fontWeight="500" 
                     justifyContent="start" 
                     padding="0px 10px" 
                     color="white" 
                     mt="10px" 
                     fontFamily="Plus Jakarta Sans" 
                     _hover={{textDecoration:"none", bg: "none"}}/>
                     <Text 
                     padding={"10px 0px"} 
                     fontFamily={"Plus Jakarta Sans"} 
                     fontWeight={"550"} 
                     fontSize={"23px"}
                     > {selectedUser.fullName}
                     </Text>
                     </Flex>
                     <Image 
                     src={selectedUser.backgroundImage || "https://res.cloudinary.com/db2rr1kej/image/upload/v1728136949/uploads/dxudu0wusd9ww8r3chjw.png" }
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
                     src={selectedUser.image}
                     name={selectedUser.fullName} />
                    <Button 
                        left={"83%"}
                        top={"10px"} 
                        size={"sm"}
                        border={"1px solid white"} 
                        bg={"transparent"} 
                        color={isFollowing(selectedUser.id) ? "#909090" : "white"} 
                        fontFamily={"Plus Jakarta Sans"} 
                        fontWeight={"500"} 
                        _hover={{color: "none"}} 
                        _active={{color: "none"}}
                        borderRadius={"50px"} 
                        fontSize={"10px"}
                        onClick={() => {
                            if (selectedUser) {
                            if (isFollowing(selectedUser.id)) {
                                handleUnfollow(selectedUser.id);
                            } else {
                                handleFollow(selectedUser.id);
                            }
                            }
                        }}
                        >
                        {selectedUser ? (isFollowing(selectedUser.id) ? "Following" : "Follow") : "Loading..."}
                        </Button>

                        <Box margin={"20px 10px"}>
                        <Text fontFamily={"Plus Jakarta Sans"} fontSize={"18px"} fontWeight={"700"}>{selectedUser.fullName}</Text>
                         <Text fontFamily={"Plus Jakarta Sans"} fontSize={"10px"} color={"#909090"}>@{selectedUser.username}</Text>
                         <Text fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"400"} >{selectedUser.bio}</Text>
                         <Flex align={"center"} padding={"4px 0px"}>
                        <Text fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                                {selectedUser.followers?.length || 0}
                        </Text>
                        <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                                Followers
                        </Text>
                        <Text ml="20px" fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                                {selectedUser.followeds?.length || 0}
                        </Text>
                        <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>
                                Following
                        </Text>
                         </Flex>

                        </Box>
                     </Box>
                     </Box>
                )}
               
                <Flex direction="column" width="520px" ml={"5px"}>
                    {profiles?.map((thread) => {
                        const likeData = likes[thread.id] || { isLiked: false, likesCount: 0 };

                        return (
                            (
                                <Flex key={thread.id} direction="column" mt="10px" mb="0px" width="100%">
                                    <Flex mt="10px" borderBottom="1px solid #545454">
                                        <Avatar
                                            size='sm'
                                            src={thread.user.image}
                                            name={thread.user.fullName}
                                        />
                                        <Box ml="10px" width="100%">
                                            <Flex>
                                                <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                                    {thread.user.fullName}
                                                </Text>
                                                <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                                    @{thread.user.username} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {new Date(thread.createdAt).toTimeString().toString().slice(0, 5)} 
                                                </Text>
                                            </Flex>
                                            <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                                {thread.content}
                                            </Text>
                                            <Img mt="10px" src={thread.image} width={"400px"} height={"300px"} />
                                            <Flex mb="10px" mt="10px" color="gray.500" fontSize="sm">
                                                <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                                    <Icon as={likeData.isLiked ? FcLike : FaRegHeart} mr="5px" />
                                                    {thread.likes?.length}
                                                </Flex>
                                                <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                                    <Icon as={BiMessageSquareDetail} mr="5px" />
                                                    {thread.replies?.length} Replies
                                                </Flex>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Flex>
                            )
                        )
                    })}
                </Flex>
                </>
                
            )}

            {/* Replies */}
            {currentView === 'postCard' &&(
                <Flex direction="column" width="545px">
                <>
                       <Flex direction="column" width="545px">
                        <Flex>
                               <Button 
                                   onClick={goToWhatHappen} 
                                   leftIcon={<IoIosArrowRoundBack size="30px" />} 
                                   bg="transparent" 
                                   _active={{color: "white", bg: "none"}} 
                                   fontWeight="500" 
                                   display="flex" 
                                   justifyContent="start" 
                                   padding="10px 10px" 
                                   color="white" 
                                   mt="auto" 
                                   fontFamily="Plus Jakarta Sans" 
                                   _hover={{textDecoration:"none", bg: "none"}}
                               />
                               <Text color="white" mt="3px" fontSize="xl" fontFamily="Plus Jakarta Sans" fontWeight="bold">
                                   Status
                               </Text>
                        </Flex>
                           

                           {/* User Thread*/}
                            {selectedThread && (
                                <Flex padding="12px 16px" key={selectedThread.id}>
                                    <Box>
                                        <Avatar size="sm" cursor={"pointer"} src={selectedThread.user.image} name={selectedThread.user.fullName} />
                                    </Box>
                                    <Box ml="10px" width="100%">
                                        <Flex>
                                            <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                                {selectedThread.user.fullName}
                                            </Text>
                                            <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                                @{selectedThread.user.username} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {new Date(selectedThread.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                            {selectedThread.content}
                                        </Text>
                                        <Text fontSize="11px" mt="5px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="gray.500">
                                            {new Date(selectedThread.createdAt).toLocaleString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})}
                                            <Text as="span" color="gray.500" ml="2px" mr="2px">•</Text>
                                            {new Date(selectedThread.createdAt).toDateString().slice()}
                                        </Text>
                                        <Img mt="10px" src={selectedThread.image} width={"400px"} height={"300px"} />
                                        
                                        <Flex mt="10px" color="gray.500" fontSize="sm">
                                            <Flex 
                                                onClick={() => handleLike(selectedThread.id)} 
                                                cursor="pointer" 
                                                fontFamily="Plus Jakarta Sans" 
                                                fontWeight="400" 
                                                fontSize="12px" 
                                                alignItems="center" 
                                                mr="20px"
                                            >
                                                <Icon as={likes[selectedThread.id]?.isLiked ? FcLike : FaRegHeart} mr="5px" />
                                                {selectedThread.likes?.length || 0} 
                                            </Flex>
                                            <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                                <Icon as={BiMessageSquareDetail} mr="5px" />
                                                {selectedThread.replies?.length || 0} Replies
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </Flex>
                            )}

                           
                           {/* Reply Input */}
                           <form onSubmit={replySubmit(replyOnSubmit)} >
                           <Flex padding="5px 20px" border="1px solid #545454" direction="column">
                               <Flex align="center">
                                   <Avatar size="sm" src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728142149/uploads/o8ivurqezrpbzwpj7k0y.png" name="Mohammed Jawahir" />
                                   <Input
                                       ml="10px"
                                       size="sm"
                                       {...reply("content")}
                                       border="none"
                                       _focus={{border: "none", boxShadow: "none"}}
                                       borderRadius="5px"
                                       backgroundColor="#1D1D1D"
                                       type="text"
                                       placeholder="Type your reply!"
                                       _placeholder={{color: 'brand.text-input'}}
                                       color="white"
                                   />
                                   <Flex alignItems="center" justifyContent="space-between">
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel cursor={"pointer"} size={"md"} color={"brand.green"} bg={"none"} _hover={{ bg: "none" }} mb="0">
                                        <GrGallery/>
                                        </FormLabel>
                                        <Input hidden type="file" {...reply("image" ,{ onChange: handleChangeImage })}/>
                                    </FormControl>
                                    </Flex>
                                    <Button
                                    type="submit"
                                    mr="7px"
                                    size={"sm"}
                                    bg={"brand.green-disabled"}
                                    fontSize={"11px"}
                                    fontWeight={"500"}
                                    color={"white"}
                                    padding={"8px 16px"}
                                    _active={{ bg: "brand.green" }}
                                    borderRadius={"30px"}
                                    _hover={{ bg: "brand.green" }}
                                    position="relative"
                                >
                                    {replyIsSubmitting ? (
                                    <Spinner size={"sm"} position="absolute" top="30%" left="27%" transform="translate(-50%, -50%)" />
                                    ) : "Post"}
                                </Button>
                               </Flex>
                               {show && (
                                   <Box display="flex" ml="46px" mb="20px" dir="column" position="relative" mt="20px">
                                       <Img src={image || ""} width="380px" height="380px" ml="10px" borderRadius="10px" />
                                       <Icon 
                                           as={IoIosCloseCircle} 
                                           color="white" 
                                           position="absolute" 
                                           top="10px" 
                                           fontSize="20px"
                                           right="80px" 
                                           cursor="pointer" 
                                           _hover={{ color: "white" }} 
                                           zIndex="10"
                                           onClick={() => setShow(false)}
                                       />
                                   </Box>
                               )}
                           </Flex>
                            </form>

                            {/* Main Post Reply*/}
                            {Array.isArray(replyData) ? (
                                replyData.map((reply) => (
                                    <Box key={reply.id}>
                                        <Flex
                                    border={"1px solid #545454"}
                                    padding="12px 16px"
                                    >
                                        <Avatar
                                        size='sm'
                                        src={reply.user.image}
                                        name={reply.user.fullName}
                                        />
                                        <Box ml="10px" width="100%">
                                        <Flex>
                                            <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                                                {reply.user.fullName}
                                            </Text>
                                            <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                                @{reply.user.username} <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> {new Date(reply.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                                            {reply.content}
                                        </Text>
                                        <Img mt="10px" src={reply.image} width="380px" height="300px" />
                                        <Flex mt="10px" color="gray.500" fontSize="sm">
                                            <Flex 
                                                onClick={() => handleLikeReply(reply.id)} 
                                                cursor={"pointer"} 
                                                fontFamily={"Plus Jakarta Sans"} 
                                                fontWeight="400" 
                                                fontSize={"12px"} 
                                                alignItems="center" 
                                                mr="20px"
                                            >
                                                <Icon 
                                                as={replyLikes.find(r => r.id === reply.id)?.isLikedReply ? FcLike : FaRegHeart} 
                                                mr="5px" 
                                                />
                                                {replyLikes.find(r => r.id === reply.id)?.likesCount || 0}
                                            </Flex>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                    </Box>
                                ))
                            ) : (null)}
                        
                    </Flex>
                </>
                </Flex>
            )}
        </>
    );
}

