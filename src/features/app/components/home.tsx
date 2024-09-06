import { Avatar, Box, Button, Flex, Icon, Img, Input, Text } from "@chakra-ui/react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

export function Home() {
    return (
        <Flex
            direction="column"
            width={`calc(100vw - 749px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            border="1px solid #545454"
            marginLeft="325px" 
            marginRight="430px"
        >
            <Text color={"white"} padding={"20px 20px 8px 20px"} fontSize={"xl"} fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>Home</Text>
            <Flex padding="5px 20px 5px 20px" align="center">
            <Avatar
            size="sm"
            src="/src/styles/cewe.png" 
            name="Mohammed Jawahir"
            />
            <Input
            ml="10px"
            name="text" 
            size={"sm"} 
            border="none"
            _focus={{border: "none", boxShadow: "none"}}
            borderRadius="5px" 
            backgroundColor="#1D1D1D" 
            type="text" 
            placeholder="What is happening?!" 
            _placeholder={{color: 'brand.text-input'}} color={"white"}/>
            <Button size={"md"} bg={"none"} _hover={{bg: "none"}}>
                <Icon  as={GrGallery} color="brand.green" _hover={{bg: "none"}}></Icon>
            </Button>
            <Button mr="7px" size={"sm"} bg={"brand.green-disabled"} fontSize={"11px"} fontWeight={"500"} color={"white"} padding={"8px 16px"} _active={{bg: "brand.green"}} borderRadius={"30px"} _hover={{bg: "brand.green"}}>
                Post
            </Button>
            </Flex>
            <PostCard />
        </Flex>
    );
}

export function PostCard() {
    return (
        <>
        <Flex
            border={"1px solid #545454"}
            padding="12px 16px"
        >
            <Avatar
                size='sm'
                src='/src/styles/indah.png'
                name='Indah Pra Karya'
            />
            <Box ml="10px" width="100%">
                <Flex>
                    <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                        Indah Pra Karya
                    </Text>
                    <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                        @indahpra <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 4h
                    </Text>
                </Flex>
                <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                    Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.
                </Text>
                <Flex mt="10px" color="gray.500" fontSize="sm">
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={FaHeart} color={"red.500"} mr="5px" />
                        36
                    </Flex>
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={BiMessageSquareDetail} mr="5px" />
                        381 Replies
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
                    Mona
                    </Text>
                    <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                    @nmonarizqa <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 17h
                    </Text>
                </Flex>
                <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                Pernah nggak dapet dream job terus lama-lama ngerasa lah kok tidak seperti yang diharapkan (atau simply lelah) terus fall out of love dengan job/bidang tsb?</Text>
                <Flex mt="10px" color="gray.500" fontSize="sm">
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={CiHeart} mr="5px" />
                        293
                    </Flex>
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={BiMessageSquareDetail} mr="5px" />
                        381 Replies
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
                        tuantigabelas
                    </Text>
                    <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                        @tuantigabelas <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> 10h
                    </Text>
                </Flex>
                <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                Dibanding rekan2 media menginterview saya terkait issue yg lg ramai, ada baiknya mending interview instansi yg ngasih izin, BKSDA dll, manfaatkan moment untuk mendorong regulasi nya jadi lebih ketat.
                Ketua mpr kita pak Bamsut juga pelihara singa, ga mau push berita ini aja?
                </Text>
                <Flex mt="10px" color="gray.500" fontSize="sm">
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={CiHeart} mr="5px" />
                        293
                    </Flex>
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={BiMessageSquareDetail} mr="5px" />
                        381 Replies
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
                    Compounding Quality
                    </Text>
                    <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                    @QCompounding <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> Jul 25
                    </Text>
                </Flex>
                <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                52 Books you should know:                
                </Text>
                <Img mt="10px" src="/src/styles/buku.png" width={"320px"} height={"400px"} />
                <Flex mb={"5px"} mt="10px" color="gray.500" fontSize="sm">
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={CiHeart} mr="5px" />
                        889
                    </Flex>
                    <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                        <Icon as={BiMessageSquareDetail} mr="5px" />
                        381 Replies
                    </Flex>
                </Flex>
            </Box>
        </Flex>
       
        </>
    );
}
