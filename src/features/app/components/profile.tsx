import { Flex, Text } from "@chakra-ui/react";

export function Profile(){
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
            <ProfileContent />
        </Flex>
    )
}

export function ProfileContent(){
    return (
        <Text>Profile</Text>
    )
}