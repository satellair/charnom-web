import type { NextPage } from 'next';
import Head from 'next/head';
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
import { useDispatch, useSelector } from 'react-redux';

import { database } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const ProductItem = [
  {
    id: 1,
    name: 'Signature Charnom',
    image:
      'https://i.pinimg.com/564x/13/72/98/1372984fa30b23c59157499167ea64d9.jpg',
    description: '',
    price: 45,
  },
  {
    id: 2,
    name: 'Milk Tea',
    image:
      'https://firebasestorage.googleapis.com/v0/b/charnom-bymilktea.appspot.com/o/charnomkaimook.jpeg?alt=media&token=5d257e1a-5c7f-49e9-8b30-48d3d11670b9',
    description: '',
    price: 45,
  },
  {
    id: 3,
    name: 'Mali Tea',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
  {
    id: 4,
    name: 'Chocolate',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
  {
    id: 5,
    name: 'Boba Milk Tea',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
];

export default function IndexPage({ children }: { children: NextPage }) {
  const dispatch = useDispatch();
  //@ts-ignore
  const cart = useSelector((state) => state.cartReducer.cart);
  //@ts-ignore
  const total = useSelector((state) => state.cartReducer.total);
  const [productsList, setProductsList] = useState([]);

  const customersInstance = collection(database, 'customers');
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
