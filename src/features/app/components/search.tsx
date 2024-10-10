import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../../store/follows-slice";
import { resetSearch, setQuery } from "../../../store/search-slice";
import { AppDispatch, RootState } from "../../../store/store";

export function Search() {
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
  const dispatch: AppDispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const searchResults = useSelector((state: RootState) => state.search.results);
  const { following } = useSelector((state: RootState) => state.follows);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const isFollowing = (userId: number) => {
    return following.some((user) => user.followed?.id === userId);
  };

  const handleFollow = (followedId: number) => {
    dispatch(followUser(followedId));
  };

  const handleUnfollow = (followedId: number) => {
    dispatch(unfollowUser(followedId));
  };

  const filteredResults = Array.isArray(searchResults)
    ? searchResults.filter((result) =>
        result.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
        {searchQuery &&
          filteredResults.map(
            (search) => (
              console.log("Filtered Results:", filteredResults),
              (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  mb="10px"
                  key={search.id}
                >
                  <Flex alignItems="left">
                    <Avatar
                      src={search.image}
                      name={search.fullName}
                      size="md"
                      mr="10px"
                      mb="10px"
                    />
                    <Box>
                      <Text fontSize="md" fontWeight="bold">
                        {search.fullName}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        {search.username}
                      </Text>
                      <Text fontSize="9px" color="gray.500">
                        {search.bio}
                      </Text>
                    </Box>
                  </Flex>
                  <Button
                    mb="25px"
                    border="1px solid white"
                    color={isFollowing(search.id) ? "#909090" : "white"}
                    _hover={
                      isFollowing(search.id) ? { bg: "#none" } : { bg: "#none" }
                    }
                    bg="none"
                    borderRadius="full"
                    size="sm"
                    fontSize="sm"
                    onClick={async () => {
                      try {
                        if (isFollowing(search.id)) {
                          await handleUnfollow(search.id);
                        } else {
                          await handleFollow(search.id);
                        }
                      } catch (error) {
                        console.error("Error following/unfollowing:", error);
                      }
                    }}
                  >
                    {isFollowing(search.id) ? "Following" : "Follow"}
                  </Button>
                </Flex>
              )
            )
          )}

        {searchQuery && filteredResults.length === 0 && (
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            mt={"30px"}
            direction="column"
          >
            <Text
              mt={"200px"}
              color={"white"}
              fontSize={"md"}
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={"bold"}
            >
              No results for “{searchQuery}”
            </Text>
            <Text
              mt={"8px"}
              color={"brand.text-input"}
              fontSize={"11px"}
              textAlign={"justify"}
              fontFamily={"Plus Jakarta Sans"}
            >
              Try searching for something else or check the spelling of what you
              typed.
            </Text>
          </Flex>
        )}

        {!searchQuery && filteredResults.length === 0 && (
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            mt={"30px"}
            direction="column"
          >
            <Text
              mt={"200px"}
              color={"white"}
              fontSize={"md"}
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={"bold"}
            >
              Write and search something
            </Text>
            <Text
              mt={"8px"}
              color={"brand.text-input"}
              fontSize={"11px"}
              textAlign={"justify"}
              fontFamily={"Plus Jakarta Sans"}
            >
              Try searching for something else or check the spelling of what you
              typed.
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
