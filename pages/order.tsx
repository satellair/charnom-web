import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Tooltip,
  Stack,
  Text,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Cart from '../components/Carts';

import { addToCart } from '../redux/actions/cartAction';
import { updateProfile } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

import { database } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function IndexPage({ children }: { children: NextPage }) {
  const dispatch = useDispatch();
  //@ts-ignore
  const cart = useSelector((state) => state.cartReducer.cart);
  //@ts-ignore
  const total = useSelector((state) => state.cartReducer.total);

  const router = useRouter();
  const [productsList, setProductsList] = useState([]);
  const productsInstance = collection(database, 'products');
  const ordersInstance = collection(database, 'orders');

  const {
    isOpen: isOpenSidebarDrawer,
    onOpen: onOpenSidebarDrawer,
    onClose: onCloseSidebarDrawer,
  } = useDisclosure();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    //@ts-ignore
    const profileValue = JSON.parse(localStorage.getItem('profile'));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <Box minW="100vw" minH="100vh">
        <Sidebar
          onClose={() => onCloseSidebarDrawer}
          display={{ base: 'none', md: 'block' }}
        />
        {/* sidebar mb */}
        <Drawer
          autoFocus={false}
          isOpen={isOpenSidebarDrawer}
          placement="left"
          onClose={onCloseSidebarDrawer}
          returnFocusOnClose={false}
          onOverlayClick={onCloseSidebarDrawer}
          size="full"
        >
          <DrawerContent>
            <Sidebar onClose={onCloseSidebarDrawer} />
          </DrawerContent>
        </Drawer>

        {/* NavBar */}
        <Flex
          ml={{ base: 0, md: 60, lg: '20vw' }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpenSidebarDrawer}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />

          {/* logo here */}
          <Text
            display={{ base: 'flex', md: 'none' }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            ฌานม
          </Text>
        </Flex>

        {/* Order List Area */}
        <Box ml={{ base: 0, md: 60, lg: '20vw' }} p="0">
          <Heading
            as="h1"
            size="2xl"
            m={8}
            pb={10}
            pl={3}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          >
            Orders History
          </Heading>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            spacing={{ base: 10, md: 5, lg: 10 }}
            p={{ base: 10, md: 5, lg: 10 }}
          >
            {/* order 02 */}
            <Flex w="full" justify="center" alignItems="baseline">
              <Box
                bg={useColorModeValue('white', 'gray.800')}
                w={{ base: '40vw', md: '20vw' }}
                borderWidth="1px"
                rounded="lg"
                position="relative"
              >
                <Heading
                  as="h3"
                  size="md"
                  p={5}
                  mb={3}
                  borderBottomWidth="1px"
                  borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  Order: 002
                </Heading>
                <Stack
                  borderBottomWidth="1px"
                  borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                  mb={5}
                  pb={3}
                >
                  <HStack spacing={5}>
                    <Text fontSize="md" pl={5}>
                      1x Assam Black Tea
                    </Text>
                    <Text fontSize="md">50฿</Text>
                  </HStack>
                </Stack>
                <Heading as="h3" size="md" pl={5} pb={5}>
                  Total : 50฿
                </Heading>
              </Box>
            </Flex>
            {/* order 01 */}
            <Flex w="full" justify=""alignItems="baseline">
              <Box
                bg={useColorModeValue('white', 'gray.800')}
                w={{ base: '40vw', md: '20vw' }}
                borderWidth="1px"
                rounded="lg"
                position="relative"
              >
                <Heading
                  as="h3"
                  size="md"
                  p={5}
                  mb={3}
                  borderBottomWidth="1px"
                  borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  Order: 001
                </Heading>
                <Stack
                  borderBottomWidth="1px"
                  borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                  mb={5}
                  pb={3}
                >
                  <HStack spacing={5}>
                    <Text fontSize="md" pl={5}>
                      2x Bubble Milk Tea
                    </Text>
                    <Text fontSize="md">120฿</Text>
                  </HStack>
                  <HStack spacing={5}>
                    <Text fontSize="md" pl={5}>
                      1x Normal Milk Tea
                    </Text>
                    <Text fontSize="md">50฿</Text>
                  </HStack>
                  <HStack spacing={5}>
                    <Text fontSize="md" pl={5}>
                      1x Chocolate Milk
                    </Text>
                    <Text fontSize="md">100฿</Text>
                  </HStack>
                </Stack>
                <Heading as="h3" size="md" pl={5} pb={5}>
                  Total : 270฿
                </Heading>
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
