import React from 'react';
import {
  IconButton,
  Flex,
  useColorModeValue,
  Text,
  FlexProps,
} from '@chakra-ui/react';
import { FiMenu, FiShoppingBag } from 'react-icons/fi';

interface NavProps extends FlexProps {
  onOpenSidebarDrawer: () => void;
  onOpenCartDrawer: () => void;
}

const Navbar = ({ onOpenSidebarDrawer, onOpenCartDrawer, ...rest }: NavProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60, lg: '20vw' }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
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

      <IconButton
        size="lg"
        onClick={onOpenCartDrawer}
        variant="ghost"
        aria-label="cart"
        icon={<FiShoppingBag />}
      />
    </Flex>
  );
};

export default Navbar;
