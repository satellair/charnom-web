import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { FiShoppingCart, FiLogOut, FiLogIn, FiClock } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './Navitem';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  //@ts-ignore
  const profileRedux = useSelector((state) => state.authReducer.profile);

  const Signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    router.replace('/');
  };

  let LinkItems: Array<LinkItemProps> = [
    { name: 'Shopping', icon: FiShoppingCart, link: '/' },
  ];

  const LinkItemsPush = () => {
    if (profileRedux) {
      LinkItems.push(
        { name: profileRedux.name+'\'s Orders', icon: FiClock, link: '/order' },
        { name: 'Sign Out', icon: FiLogOut, link: '/' }
      );
    } else {
      LinkItems.push({ name: 'Sign In', icon: FiLogIn, link: '/signin' });
    }
  };

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
          ฌาณม
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItemsPush()}
      {LinkItems.map((link) =>
        link.name === 'Sign Out' ? (
          <Box onClick={Signout}>
            <NavItem key={link.name} icon={link.icon} link={link.link}>
              {link.name}
            </NavItem>
          </Box>
        ) : (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        )
      )}
    </Box>
  );
};

export default Sidebar;
