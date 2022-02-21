import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { checkSignup } from '../utils/checkSignup';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  repassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  repassword: yup.string().min(8).required(),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      switch (await checkSignup(data)) {
        case '1':
          break;
        case '-1':
          throw new Error('Error: Email already exists');
      }
      toast({
        title: 'Success',
        description: `Register ${data.email} success`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/signin');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const checkRePassword = (data: RegisterFormInputs) => {
    if (data.password !== data.repassword) {
      return 'Password not match';
    }
    return true;
  }


  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} minW={'md'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <form>
              <Stack spacing={6}>
                {/* Name */}
                <FormControl
                  id="Name"
                  isInvalid={!!errors?.name?.message}
                  isRequired
                >
                  <FormLabel>Name</FormLabel>
                  <Input type="text" {...register('name')} />
                </FormControl>
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>

                {/* email */}
                <FormControl
                  id="email"
                  isInvalid={!!errors?.email?.message}
                  isRequired
                >
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" {...register('email')} />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                {/* Password */}
                <FormControl
                  id="password"
                  isInvalid={!!errors?.password?.message}
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="repassword"
                  isInvalid={!!errors?.password?.message}
                  isRequired
                >
                  <FormLabel>Retype-Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('repassword')}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowRePassword(!showRePassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={handleSubmit(onSubmit)}
                    disabled={
                      !!errors.name || !!errors.email || !!errors.password
                    }
                  >
                    Sign up
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <NextLink href="/signin" passHref>
                      <Link color={'blue.400'}>Sign In</Link>
                    </NextLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
