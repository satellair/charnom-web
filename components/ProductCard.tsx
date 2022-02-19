import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

type ProductDetail = {
  name: string;
  image?: HTMLImageElement;
  imageURL: string;
  description: string;
  price: number;
};

function ProductAddToCart(data: ProductDetail) {
  return (
    <Flex w="full" alignItems="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        w={{ base: '40vw', md: '20vw' }}
        maxW={{ base: 'none', md: '250px' }}
        borderWidth="1px"
        rounded="lg"
        position="relative"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
          fit="cover"
          boxSize={{ base: '40vw', md: '20vw' }}
        />

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize={{ base: 'md', sm: 'lg', md: 'sm', lg: 'md', xl: 'xl' }}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
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
              {data.price}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1rem'}
            >
              <chakra.a href={'#'} display={'flex'} onClick={() => {}}>
                <Icon as={FiPlus} h={7} w={7} alignSelf={'center'} />
              </chakra.a>
            </Tooltip>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
