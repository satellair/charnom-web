import type { NextPage } from 'next';
import React from 'react';
import {
  Drawer,
  DrawerContent,
  Spacer,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  BoxProps,
  VStack,
  Image,
  HStack,
  Button,
  IconButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useSelector,useDispatch } from 'react-redux';

interface CartProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose, ...rest }: CartProps) => {
  //@ts-ignore
  const cart = useSelector(state => state.cartReducer.cart);
  //@ts-ignore
  const total = useSelector(state => state.cartReducer.total);
  const dispatch = useDispatch();

  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size="md"
    >
      <DrawerContent>
        <Box
          transition="3s ease"
          bg={useColorModeValue('white', 'gray.900')}
          borderLeft="1px"
          borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
          w="100%"
          pos="fixed"
          h="full"
          {...rest}
        >
          <DrawerHeader>
            <Flex
              h="20"
              alignItems="center"
              mx="8"
              borderBottom="1px"
              borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Carts
              </Text>
              <Spacer />
              <CloseButton onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            {/* product list */}
            <VStack m="5">
              {cart.map((s:any, index:number) => {
                return (
                  <Box key={index} w="90%" rounded="lg" borderWidth="1px">
                    <HStack>
                      <Image
                        src={s.image}
                        alt={`Picture of ${s.name}`}
                        roundedLeft="md"
                        objectFit="cover"
                        boxSize={'100px'}
                        loading='lazy'
                      />
                      <VStack>
                        <HStack mt="-2" w="100%">
                          <Heading as="h4" size="md">
                            {s.name}
                          </Heading>
                          <Spacer />
                          <Text mr="2">{s.price}฿</Text>
                        </HStack>
                        <HStack mt="10" w="100%">
                          <Heading as="h6" size="sm">
                            Quantity:
                          </Heading>
                          <Spacer />
                          <IconButton
                            size="xsm"
                            aria-label="decrease"
                            icon={<FiMinus />}
                          ></IconButton>
                          <Text> {s.qty} </Text>
                          <IconButton
                            size="xsm"
                            aria-label="increase"
                            icon={<FiPlus />}
                          ></IconButton>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Flex justify="space-between" align="center" w="50%">
              <Text>Total: {cart.reduce((acc:any, curr:any) => acc + curr.price, 0)}฿</Text>
              <Spacer />
              <Button colorScheme="blue" onClick={onClose}>Order Now</Button>
            </Flex>
          </DrawerFooter>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
export default Cart;
