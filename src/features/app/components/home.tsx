import { Avatar, Box, Button, Flex, Icon, Img, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoIosArrowRoundBack, IoIosCloseCircle } from "react-icons/io";
import { useHome } from "../hooks/useHome";


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
    const [show, setShow] = useState(false);
    const [currentView, setCurrentView] = useState<'whatHappen' | 'postCard'>('whatHappen');
    const toggleImage = () => setShow(!show);
    const goToPostCard = () => setCurrentView('postCard');
    const goToWhatHappen = () => setCurrentView('whatHappen');

    const {register, handleSubmit, errors, isSubmitting, onSubmit, data} = useHome();

    return (
        <>
            {currentView === 'whatHappen' && (
                <>
                    <Text color={"white"} padding={"20px 20px 8px 20px"} fontSize={"xl"} fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>Home</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex padding="5px 20px 5px 20px" align="center">
                        <Avatar size="sm" src="/src/styles/cewe.png" name="Mohammed Jawahir" />
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
                            {errors.content && (
                                <p style={{ color: "red", margin: 0, fontFamily: "Plus Jakarta Sans" }}>
                                    {errors.content.message}
                                </p>
                            )}
                        </Box>
                        <Button size={"md"} bg={"none"} _hover={{ bg: "none" }} onClick={toggleImage}>
                            <Icon as={GrGallery} color="brand.green" _hover={{ bg: "none" }} />
                        </Button>
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
                        >
                            {isSubmitting ? "Submitting..." : "Post"}
                        </Button>
                    </Flex>

                    {show && (
                        <Box position="relative" ml={"75px"} mb={"20px"}>
                            <Img 
                                src="/src/styles/buku.png"
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
                                onClick={toggleImage}
                            />
                        </Box>
                    )}
                    </form>
                    {Array.isArray(data) ? (
                    data.map((thread) => (
                        <Flex  
                            border="1px solid #545454"
                            padding="12px 16px"
                            height={"auto"}
                            width={"545px"}
                            onClick={goToPostCard}    
                            cursor="pointer"
                        >
                            <Avatar size="sm" src={thread.user.image} name={thread.user.fullName} />
                            <Box ml="10px" width="100%">
                                <Flex>
                                    <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                        {thread.user.fullName}
                                    </Text>
                                    <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                        @{thread.user.fullName} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {new Date(thread.createdAt).toTimeString().toString().slice(0, 5)}
                                    </Text>
                                </Flex>
                                <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                    {thread.content}
                                </Text>
                                <Img mt="10px" src={thread.image} width={"400px"} height={"300px"} />
                                <Flex mt="10px" color="gray.500" fontSize="sm">
                                    <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                        <Icon as={FaRegHeart} size={"15px"} mr="5px" />
                                        {thread.likesCount}
                                    </Flex>
                                    <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                        <Icon as={BiMessageSquareDetail} mr="5px" />
                                        {thread.repliesCount} Replies
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                    ))
                    ) : (null)}
                </>
            )}

            {currentView === 'postCard' && (
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
   
                           {/* Main Post Reply */}
                           <Flex padding="12px 16px">
                               <Avatar size="sm" src='/src/styles/indah.png' name='Indah Pra Karya' />
                               <Box ml="10px" width="100%">
                                   <Flex>
                                       <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                           Indah Pra Karya
                                       </Text>
                                       <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                           @indahpra <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> 4h
                                       </Text>
                                   </Flex>
                                   <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                       Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.
                                   </Text>
                                   <Text fontSize="11px" mt="5px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="gray.500">
                                       11:32 PM <Text as="span" color="gray.500" ml="2px" mr="2px">•</Text> Jul 26, 2023
                                   </Text>
                                   <Flex mt="10px" color="gray.500" fontSize="sm">
                                       <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                           <Icon as={FaHeart} color="red.500" mr="5px" />
                                           36
                                       </Flex>
                                       <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                           <Icon as={BiMessageSquareDetail} mr="5px" />
                                           381 Replies
                                       </Flex>
                                   </Flex>
                               </Box>
                           </Flex>
   
                           
                           
   
                           {/* Reply Input */}
                           <Flex padding="5px 20px" border="1px solid #545454" direction="column">
                               <Flex align="center">
                                   <Avatar size="sm" src="/src/styles/cewe.png" name="Mohammed Jawahir" />
                                   <Input
                                       ml="10px"
                                       name="text"
                                       size="sm"
                                       border="none"
                                       _focus={{border: "none", boxShadow: "none"}}
                                       borderRadius="5px"
                                       backgroundColor="#1D1D1D"
                                       type="text"
                                       placeholder="Type your reply!"
                                       _placeholder={{color: 'brand.text-input'}}
                                       color="white"
                                   />
                                   <Button size="md" bg="none" _hover={{bg: "none"}} onClick={toggleImage}>
                                       <Icon as={GrGallery} color="brand.green" _hover={{bg: "none"}} />
                                   </Button>
                                   <Button mr="7px" size="sm" bg="brand.green-disabled" fontSize="11px" fontWeight="500" color="white" padding="8px 16px" _active={{bg: "brand.green"}} borderRadius="30px" _hover={{bg: "brand.green"}}>
                                       Post
                                   </Button>
                               </Flex>
                               {show && (
                                   <Box display="flex" ml="46px" mb="20px" dir="column" position="relative" mt="20px">
                                       <Img src="/src/styles/buku.png" width="380px" height="380px" ml="10px" borderRadius="10px" />
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
                                           onClick={toggleImage}
                                       />
                                   </Box>
                               )}
                           </Flex>
                           <>
                           <Flex
                       border={"1px solid #545454"}
                       padding="12px 16px"
                   >
                       <Avatar
                           size='sm'
                           src='/src/styles/jenifer.png'
                           name='Indah Pra Karya'
                       />
                       <Box ml="10px" width="100%">
                           <Flex>
                               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                               ngab-ngaban the explorer
                               </Text>
                               <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                   @devilbreak <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 4h
                               </Text>
                           </Flex>
                           <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                           Untuk 6 tahun terakhir, yes hahaha!
                           Bukan bermaksud buat ngepush luck sampe batas terakhir, tapi semesta belum juga melunak  🥲
                           </Text>
                           <Flex mt="10px" color="gray.500" fontSize="sm">
                               <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                   <Icon as={CiHeart} mr="5px" />
                                   293
                               </Flex>
                           </Flex>
                       </Box>
                   </Flex>
                   <Flex
                       border={"1px solid #545454"}
                       padding="12px 16px"
                   >
                       <Avatar
                           size='sm'
                           src='/src/styles/profile.png'
                           name='Indah Pra Karya'
                       />
                       <Box ml="10px" width="100%">
                           <Flex>
                               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                               Putra
                               </Text>
                               <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                   @rzkiypratama <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 18h
                               </Text>
                           </Flex>
                           <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                           Gw bg, kurleb 12bulan jobless, kondisi berumahtangga, jual2in gadget dll downgrade, sempat ada cahaya di jobless bulan ke8 krn 
                           diajak freelance eh ga dibayar berbulan2, tapi kok masih bisa survive, ada aja rejekinya, sampai hari pecah telor tiba pas kondisi bener2 0 duit
                           </Text>
                           <Flex mt="10px" color="gray.500" fontSize="sm">
                               <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                   <Icon as={CiHeart} mr="5px" />
                                   43
                               </Flex>
                           </Flex>
                       </Box>
                   </Flex>
                   <Flex
                       border={"1px solid #545454"}
                       padding="12px 16px"
                   >
                       <Avatar
                           size='sm'
                           src='/src/styles/docter.png'
                           name='Indah Pra Karya'
                       />
                       <Box ml="10px" width="100%">
                           <Flex>
                               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                               Menantu Idaman Ibumu
                               </Text>
                               <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                   @ninanenen <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 10h
                               </Text>
                           </Flex>
                           <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                           Sering banget. Lebih sering deg2annya daripada nyantainya. Karena sandwich gen, mau di planning in kaya apa juga, selalu ada kedaruratan tiap saat.
                           Tapi selalu terselamatkan. Sering bet ada rejeki nomplok pas injury time. Cape bat ya Allah
                           </Text>
                           <Flex mt="10px" color="gray.500" fontSize="sm">
                               <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                   <Icon as={CiHeart} mr="5px" />
                                   3
                               </Flex>
                           </Flex>
                       </Box>
                   </Flex>
                   <Flex
                       border={"1px solid #545454"}
                       padding="12px 16px"
                   >
                       <Avatar
                           size='sm'
                           src='/src/styles/hijabi.png'
                           name='Indah Pra Karya'
                       />
                       <Box ml="10px" width="100%">
                           <Flex>
                               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                               jena 👋🏻
                               </Text>
                               <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                   @sweetbubbly <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 6h
                               </Text>
                           </Flex>
                           <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                           Pas kmrn2 lg parah2nya punya kucing sampe 10 ekor pernah.. gangerti gmn tau2 ada aja rejeki buat beli makan sm pasir merekat
                           </Text>
                           <Flex mt="10px" color="gray.500" fontSize="sm">
                               <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                   <Icon as={CiHeart} mr="5px" />
                                   255
                               </Flex>
                           </Flex>
                       </Box>
                   </Flex>
                   <Flex
                       border={"1px solid #545454"}
                       padding="12px 16px"
                   >
                       <Avatar
                           size='sm'
                           src='/src/styles/profile.png'
                           name='Indah Pra Karya'
                       />
                       <Box ml="10px" width="100%">
                           <Flex>
                               <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                               Tama
                               </Text>
                               <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                   @josiSRG <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 8h
                               </Text>
                           </Flex>
                           <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                           Sering wkwk. Kuncinya percaya kalau tetep akan bisa survive
                           </Text>
                           <Flex mt="10px" color="gray.500" fontSize="sm">
                               <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                   <Icon as={CiHeart} mr="5px" />
                                   0
                               </Flex>
                           </Flex>
                       </Box>
                   </Flex>
                           </>
                       </Flex>
                   </>
           </Flex>
            )}
        </>
    );
}