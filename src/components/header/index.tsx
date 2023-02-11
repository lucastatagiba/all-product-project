import { Flex, Text } from '@chakra-ui/react';
import { TbLogout } from 'react-icons/tb';
import { useUserContext } from 'src/context/authProvider';

const Header = (props: { leftContentHeader: string }) => {
  const { handleLogout } = useUserContext();

  return (
    <Flex
      justifyContent='space-around'
      fontWeight='700'
      bg='blackAlpha.700'
      h='100px'
      alignItems='center'
      color='gray.300'
    >
      <Text>{props.leftContentHeader}</Text>
      <Flex
        gap={2}
        alignItems='center'
        fontSize={18}
        cursor='pointer'
        onClick={handleLogout}
      >
        Sair <TbLogout size={30} color='lightgray' />
      </Flex>
    </Flex>
  );
};

export default Header;
