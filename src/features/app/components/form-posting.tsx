import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import "../styles/styles.css";

export function FormPost(){
    return(
      <Card align='center'>
      <CardHeader>
        <Heading size='md'> Customer dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue'>View here</Button>
      </CardFooter>
    </Card>
    )
}