import type { NextPage } from 'next';
import React from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';

import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Cart from '../components/Carts';

const ProductItem = [
  {
    id: 1,
    name: 'Signature Charnom',
    imageURL:
      'https://i.pinimg.com/564x/13/72/98/1372984fa30b23c59157499167ea64d9.jpg',
    description: '',
    price: 45,
  },
  {
    id: 2,
    name: 'Milk Tea',
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
  {
    id: 3,
    name: 'Mali Tea',
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
  {
    id: 4,
    name: 'Chocolate',
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
  {
    id: 5,
    name: 'Boba Milk Tea',
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    description: '',
    price: 45,
  },
];

export default function IndexPage({ children }: { children: NextPage }) {
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

  const {
    isOpen: isOpenDetailDrawer,
    onOpen: onOpenDetailDrawer,
    onClose: onCloseDetailDrawer,
  } = useDisclosure();

  return (
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
          {ProductItem.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                imageURL={product.imageURL}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
