import React from 'react';
import {
  Drawer,
  DrawerContent,
  Spacer,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';

interface CartProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails = ({ isOpen, onClose, ...rest }: CartProps) => {
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
          w={{ base: '50vw', md: 60, lg: '20vw' }}
          pos="fixed"
          h="full"
          {...rest}
        >
          <Flex h="20" alignItems="center" mx="8" w="full">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Carts
            </Text>
            <Spacer />
            <CloseButton onClick={onClose}/>
          </Flex>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
export default ProductDetails;
