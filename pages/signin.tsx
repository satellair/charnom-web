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
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
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

import { database } from '../firebase/firebaseConfig';
import { checkSignin, getProfile } from '../utils/checkSignin';
import { collection, getDocs } from 'firebase/firestore';

import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions/authAction';

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      switch (await checkSignin(data)) {
        case '1':
          break;
        case '-1':
          throw new Error('Error: No User found');
        case '-2':
          throw new Error('Error: Password is incorrect');
      }
      const profile = await getProfile(data.email);
      localStorage.setItem(
        'token',
        JSON.stringify({
          email: data.email,
          login_date: new Date().toLocaleDateString(),
        })
      );
      localStorage.setItem('profile', JSON.stringify(profile));
      toast({
        title: 'Success',
        description: 'You are now logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(updateProfile(profile));
      router.push('/');
      
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

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} minW={'md'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in</Heading>
            <Text fontSize={'lg'} color={'gray.600'}></Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <form>
              <Stack spacing={4}>
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

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={handleSubmit(onSubmit)}
                    disabled={!!errors.email || !!errors.password}
                  >
                    Sign in
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={'center'}>
                    Not a user?{' '}
                    <NextLink href="/signup" passHref>
                      <Link color={'blue.400'}>Sign Up</Link>
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
