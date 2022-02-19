import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { FiShoppingCart, FiLogOut, FiLogIn, FiUser } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './Navitem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Shopping', icon: FiShoppingCart, link: '/' },
  // { name: 'Profile', icon: FiUser, link: '/profile' },
  { name: 'Sign In', icon: FiLogIn, link: '/signin' },
  // { name: 'Sign Out', icon: FiLogOut, link: '/signout' },
];

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition={{ base: '3s ease', md: 'none' }}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60, lg: '20vw' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          ฌานม
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
