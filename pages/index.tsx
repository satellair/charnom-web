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
  Image,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

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

  const {
    isOpen: isOpenCartDrawer,
    onOpen: onOpenCartDrawer,
    onClose: onCloseCartDrawer,
  } = useDisclosure();

  const addCart = (p:any) => {
    const product = {
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      qty: 1,
    };
    dispatch(addToCart(product, cart));
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const getMenu = () => {
    getDocs(productsInstance).then((products) => {
      setProductsList(
        //@ts-ignore
        products.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const getProfile = () => {
    //@ts-ignore
    const profileValue = JSON.parse(localStorage.getItem('profile'));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  }

  return (
    <>
      <Head>
        <title>Charnom</title>
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
        <Navbar
          onOpenSidebarDrawer={onOpenSidebarDrawer}
          onOpenCartDrawer={onOpenCartDrawer}
        />
        {/* cart drawer */}
        <Cart onClose={onCloseCartDrawer} isOpen={isOpenCartDrawer} />
        {/* detail drawer */}

        {/* ProductArea */}
        <Box ml={{ base: 0, md: 60, lg: '20vw' }} p="0">
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            spacing={{ base: 10, md: 5, lg: 10 }}
            p={{ base: 10, md: 5, lg: 10 }}
          >
            {productsList.map((product:any) => {
              return (
                <Flex w="full" alignItems="center">
                  <Box
                    bg={useColorModeValue('white', 'gray.800')}
                    w={{ base: '40vw', md: '20vw' }}
                    borderWidth="1px"
                    rounded="lg"
                    position="relative"
                  >
                    <Image
                      src={product.image}
                      alt={`Picture of ${product.name}`}
                      roundedTop="lg"
                      objectFit="cover"
                      boxSize={{ base: '40vw', md: '20vw' }}
                      loading="lazy"
                    />

                    <Box p="4">
                      <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Box
                          fontSize={{
                            base: 'md',
                            sm: 'lg',
                            md: 'sm',
                            lg: 'md',
                            xl: 'xl',
                          }}
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                        >
                          {product.name}
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Box
                          fontSize={{
                            base: 'xl',
                            sm: '2xl',
                            md: 'lg',
                            lg: 'xl',
                            xl: '3xl',
                          }}
                          color={useColorModeValue('gray.800', 'white')}
                        >
                          <Box as="span" color={'gray.600'} fontSize="lg">
                            ฿
                          </Box>
                          {product.price}
                        </Box>
                        <Tooltip
                          label="Add to cart"
                          bg="white"
                          placement={'top'}
                          color={'gray.800'}
                          fontSize={'1rem'}
                        >
                          <IconButton
                            aria-label="addtocart"
                            icon={<FiShoppingCart />}
                            size="md"
                            alignSelf={'center'}
                            bgColor={'white'}
                            onClick={() => addCart(product)}
                          />
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
