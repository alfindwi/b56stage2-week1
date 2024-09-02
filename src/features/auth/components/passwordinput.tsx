import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; 
import React from "react"


export function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Password'
          color={"white"}
          backgroundColor="#1D1D1D" 
          _placeholder={{color: 'brand.text-input'}}
          _hover={{backgroundColor: "#1D1D1D"}}
          border="1px solid #545454"
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} backgroundColor="#1D1D1D" 
          _active={{backgroundColor: "1D1D1D"}} _hover={{backgroundColor: "1D1D1D"}}>
            {show ? <ViewOffIcon color={"brand.green"} /> : <ViewIcon color={"brand.green"} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }