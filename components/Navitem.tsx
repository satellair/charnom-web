import React, { ReactText } from 'react';
import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}

const NavItem = ({ icon, link, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link} passHref>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default NavItem;
