import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { colors } from 'src/styles/theme';
import { IAuthState, getAuthStorage } from 'src/utils/storage';
import { useUserContext } from 'src/context';
import { apiWithAuth } from 'src/services';

type InputValue = {
  email: string;
  password: string;
};

const Login = () => {
  const { handleLogin } = useUserContext();
  const [inputValue, setInputValue] = useState({} as InputValue);
  const toast = useToast();
  const router = useRouter();
  const userAlreadyLogged = getAuthStorage();

  useEffect(() => {
    if (userAlreadyLogged) router.push('/');
  }, []);

  const submitLogin = async () => {
    try {
      const { data } = await apiWithAuth.post<IAuthState>('/auth/login', {
        email: inputValue.email,
        password: inputValue.password,
      });

      handleLogin(data);
    } catch (error: any) {
      toast({
        description: 'Email ou senha inválidos',
        status: 'error',
        duration: 4000,
        position: 'top-right',
        containerStyle: { color: 'white' },
        isClosable: true,
      });
      console.log(error);
    }
  };

  const loginContentMemo = useMemo(() => {
    return !userAlreadyLogged ? (
      <Flex
        flexDirection='column'
        alignItems='center'
        w={300}
        h={400}
        bg={colors.black[500]}
        margin='100px auto'
        color={colors.white['pure']}
        gap={5}
        borderRadius={5}
      >
        <Text fontWeight='700' fontSize={30} mt={10}>
          Login
        </Text>

        <Input
          w='90%'
          value={inputValue.email}
          mt={10}
          placeholder='email'
          name='email'
          type='email'
          onChange={(e) => {
            setInputValue((old) => ({ ...old, email: e.target.value }));
          }}
        />
        <Input
          w='90%'
          value={inputValue.password}
          placeholder='password'
          name='password'
          type='password'
          onChange={(e) => {
            setInputValue((old) => ({ ...old, password: e.target.value }));
          }}
        />
        <Button
          onClick={submitLogin}
          color={colors.gray['500']}
          mt={10}
          bg={colors.gray['300']}
        >
          Login
        </Button>
      </Flex>
    ) : null;
  }, [inputValue, userAlreadyLogged]);

  return <>{loginContentMemo}</>;
};

export default Login;
