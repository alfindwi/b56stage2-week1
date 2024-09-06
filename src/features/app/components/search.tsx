import { Avatar, Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/use-store";
import { setQuery, resetSearch } from "../../../store/search-slice";
import { IoIosCloseCircle } from "react-icons/io";


export function Search(){
    return (
        <Flex
            direction="column"
            width={`calc(100vw - 745px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            marginLeft="325px"
            marginRight="430px"
            padding="10px"
        >
            <SearchContent />
        </Flex>
    );
}

export function SearchContent() {
    const dispatch: AppDispatch = useAppDispatch();
    const searchQuery = useSelector((state: RootState) => state.search.query)
    const searchResults  = useSelector((state: RootState) => state.search.results)

    const filteredResults = searchResults.filter((result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <Flex direction="column" width="100%" height="auto" color="white" p="20px">
      <InputGroup mb="20px">
        <InputLeftElement pointerEvents="none">
          <Icon as={RiUserSearchLine} color="gray.500" />
        </InputLeftElement>
        <InputRightElement onClick={() => dispatch(resetSearch())}>
          <Icon as={IoIosCloseCircle} color="gray.500" />
        </InputRightElement>
        <Input
          placeholder="Search your friend"
          _placeholder={{ color: "gray.500" }}
          borderRadius="30px"
          bg={"#3F3F3F"}
          color="white"
          _hover={{ border: "1px solid #04A51E" }}
          border={"1px solid #04A51E"}
          size="md"
          _focus={{ border: "brand.bg", boxShadow: "none" }}
          value={searchQuery}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
      </InputGroup>

      <Flex direction="column" mt="20px">
        {searchQuery && filteredResults.map((search) => (
          <Flex alignItems="center" justifyContent="space-between" mb="10px">
            <Flex alignItems="left">
              <Avatar src={search.avatar} name={search.name} size="md" mr="10px" mb={"10px"} />
              <Box>
                <Text fontSize="md" fontWeight="bold">{search.name}</Text>
                <Text fontSize="xs" color="gray.400">{search.username}</Text>
                <Text fontSize="9px" color="gray.500">{search.bio}</Text>
              </Box>
            </Flex>
            <Button mb={"25px"} border={"1px solid white"} color={"white"} _hover={{bg: "brand.bg"}} bg={"brand.bg"} borderRadius="full" size="sm" fontSize={"sm"}>
              Follow
            </Button>
          </Flex>
        ))}

        {(searchQuery && filteredResults.length === 0) && (
                <Flex alignItems={"center"} justifyContent={"center"} mt={"30px"} direction="column">
                <Text
                mt={"200px"}
                color={"white"} 
                fontSize={"md"} 
                alignItems={"center"} 
                fontFamily={"Plus Jakarta Sans"} 
                fontWeight={"bold"}>
                    No results for “{searchQuery}”
                </Text>
                <Text
                mt={"8px"}
                color={"brand.text-input"} 
                fontSize={"11px"} 
                textAlign={"justify"}
                alignItems={"center"} 
                fontFamily={"Plus Jakarta Sans"} >
                    Try searching for something else or check the 
                </Text>
                <Text
                mt={"8px"}
                color={"brand.text-input"} 
                fontSize={"11px"} 
                textAlign={"justify"}
                alignItems={"center"} 
                fontFamily={"Plus Jakarta Sans"}>
                    spelling of what you typed.
                </Text>
            </Flex>
            )}

       {(!searchQuery || filteredResults.length > 0) && !searchQuery && (
                <Flex alignItems={"center"} justifyContent={"center"} mt={"30px"} direction="column">
                    <Text
                        mt={"200px"}
                        color={"white"} 
                        fontSize={"md"} 
                        alignItems={"center"} 
                        fontFamily={"Plus Jakarta Sans"} 
                        fontWeight={"bold"}>
                        Write and search something
                    </Text>
                    <Text
                        mt={"8px"}
                        color={"brand.text-input"} 
                        fontSize={"11px"} 
                        textAlign={"justify"}
                        alignItems={"center"} 
                        fontFamily={"Plus Jakarta Sans"} >
                        Try searching for something else or check the 
                    </Text>
                    <Text
                        mt={"8px"}
                        color={"brand.text-input"} 
                        fontSize={"11px"} 
                        textAlign={"justify"}
                        alignItems={"center"} 
                        fontFamily={"Plus Jakarta Sans"}>
                        spelling of what you typed.
                    </Text>
                </Flex>
            )}
      </Flex>
    </Flex>
  );
}