import { useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import { Button, Flex, Text } from '@chakra-ui/react';
import PageWithAuth from 'src/components/PageWithAuth';
import { IRowStyle, ProductTable } from 'src/components/Table';
import { colors } from 'src/styles/theme';
import { TbLogout } from 'react-icons/tb';
import { useUserContext } from 'src/context/authProvider';
import { useIsAuthenticated } from 'src/hooks';
import { useRouter } from 'next/router';
import { useReportContext } from 'src/context/reportProvider';

const titles = [
  { title: 'Produto', value: '' },
  { title: 'Quantidade', value: '' },
  { title: 'Valor unitário', value: '' },
  { title: 'Preço Total', value: '' },
];

export default function Report() {
  const router = useRouter();
  const { handleLogout, userAuth } = useUserContext();

  const { transactions } = useReportContext();

  const isAuthenticated = useIsAuthenticated();

  const totalQuantity = useRef<number>(
    transactions.reduce((acc, transaction) => transaction.quantity + acc, 0) ??
      0
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!userAuth?.usuario.isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, router, userAuth?.usuario.isAdmin]);

  const rowStyles = useMemo<IRowStyle[]>(
    () =>
      transactions.map((_, index) => ({
        rowIndex: index,
        styles: {
          fontSize: 18,
          fontWeight: 700,
        },
      })),
    [transactions]
  );

  const tableContent = useMemo(() => {
    return transactions.map((transaction) => {
      const { id, quantity, cost, product } = transaction;
      return [
        <Text key={id}>{product.name}</Text>,
        <Text key={id}>{quantity}</Text>,
        <Text key={id}>{product.cost}</Text>,
        <Text key={id}>R$ {cost * quantity},00</Text>,
      ];
    });
  }, [transactions]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Head>
        <title>All product project</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/shoppingcart_80945.png' />
      </Head>

      <PageWithAuth>
        <Flex
          justifyContent='space-around'
          fontWeight='700'
          bg={colors.gray['800']}
          h='100px'
          alignItems='center'
          color={colors.gray['300']}
        >
          <Text>{`Quantidade Total: [${totalQuantity.current}]`}</Text>
          <Flex
            gap={2}
            alignItems='center'
            fontSize={18}
            cursor='pointer'
            onClick={handleLogout}
          >
            Sair <TbLogout size={30} color={colors.gray['300']} />
          </Flex>
        </Flex>

        <ProductTable
          content={tableContent}
          titlesAndValues={titles}
          titles={titles.map((title) => title.title)}
          rowsStyles={rowStyles}
          height='400px'
        />
        <Flex justifyContent='center'>
          <Button colorScheme='blackAlpha' onClick={() => router.push('/pdf')}>
            Gerar PDF
          </Button>
        </Flex>
      </PageWithAuth>
    </>
  );
}
