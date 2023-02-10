import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { Button, Center, Flex, Text, useToast } from '@chakra-ui/react';
import PageWithAuth from 'src/components/PageWithAuth';
import { IRowStyle, ProductTable } from 'src/components/Table';
import { colors } from 'src/styles/theme';
import { TbLogout } from 'react-icons/tb';
import { apiWithAuth } from 'src/services';
import { useUserContext } from 'src/context';
import { useIsAuthenticated } from 'src/hooks';

const titles = [
  { title: 'id', value: 'id' },
  { title: 'nome', value: 'name' },
  { title: 'preço', value: 'cost' },
  { title: 'quantidade', value: 'quantity' },
  { title: 'localidade', value: 'locationId' },
  { title: 'familia', value: 'familyId' },
];

interface Products {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  locationId: number;
  familyId: number;
}

interface Locations {
  id: number;
  name: string;
}

interface Families {
  id: number;
  name: string;
}

interface Pagination {
  _page: number;
}
interface Ordenation {
  keys: string;
  orders: string;
}

export default function Home() {
  const [products, setProducts] = useState([] as Products[]);
  const [locations, setLocations] = useState([] as Locations[]);
  const [families, setFamilies] = useState([] as Families[]);
  const [pagination, setPagination] = useState<Pagination>({
    _page: 1,
  });
  const [ordenation, setOrdenation] = useState<Ordenation>();
  const toast = useToast();
  const totalProduct = useRef<number>();
  const { handleLogout } = useUserContext();

  const isAuthenticated = useIsAuthenticated();

  const rowStyles = useMemo<IRowStyle[]>(
    () =>
      products.map((_, index) => ({
        rowIndex: index,
        styles: {
          fontSize: 18,
          fontWeight: 700,
        },
      })),
    [products]
  );

  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiWithAuth.get<Products[]>('/products', {
        params: {
          ...pagination,
          _limit: 6,
          _sort: ordenation?.keys,
          _order: ordenation?.orders,
        },
      });
      totalProduct.current = response.headers['x-total-count'];

      setProducts(response.data);
    } catch (error: any) {
      console.log(error.message);
      if (error.status === 401 && error.message.includes('token')) {
        if (!toast.isActive('token-error-id')) {
          toast({
            description:
              'Token de autenticação expirado, para continuar refaça login',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'token-error-id',
          });
        }
      } else {
        if (!toast.isActive('toast-error-id')) {
          toast({
            description: 'Não foi possível buscar os produtos',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'toast-error-id',
          });
        }
      }
    }
  }, [pagination, ordenation]);

  const fetchLocations = useCallback(async () => {
    try {
      const { data } = await apiWithAuth.get<Locations[]>('/locations');
      setLocations(data);
    } catch (error: any) {
      if (error.status === 401) {
        if (!toast.isActive('token-error-id')) {
          toast({
            description:
              'Token de autenticação expirado, para continuar refaça login',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'token-error-id',
          });
        }
      } else {
        if (!toast.isActive('toast-error-id')) {
          toast({
            description: 'Não foi possível buscar as Localizações',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'toast-error-id',
          });
        }
      }
    }
  }, []);

  const fetchFamilies = useCallback(async () => {
    try {
      const { data } = await apiWithAuth.get<Families[]>('/families');
      setFamilies(data);
    } catch (error: any) {
      if (error.status === 401) {
        if (!toast.isActive('token-error-id')) {
          toast({
            description:
              'Token de autenticação expirado, para continuar refaça login',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'token-error-id',
          });
        }
      } else {
        if (!toast.isActive('toast-error-id')) {
          toast({
            description: 'Não foi possível buscar as Localizações',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'toast-error-id',
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchProducts();
    fetchLocations();
    fetchFamilies();
  }, [pagination, ordenation]);

  const tableContent = useMemo(() => {
    return products.map((product) => {
      const { id, name, cost, quantity, locationId, familyId } = product;
      return [
        <Text key={id}>{id}</Text>,
        <Text key={id}>{name}</Text>,
        <Text key={id}>{cost}</Text>,
        <Text key={id}>{quantity}</Text>,
        <Text key={id}>
          {locations.find((location) => location.id === locationId)?.name ?? ''}
        </Text>,
        <Text key={product.id}>
          {families.find((family) => family.id === familyId)?.name ?? ''}
        </Text>,
      ];
    });
  }, [products, families, locations]);

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
          <Text>{`Total de Produtos: [${totalProduct.current}]`}</Text>
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
          actionAfterOrdering={(query) => setOrdenation(query)}
          rowsStyles={rowStyles}
        />

        <Center
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          justifyContent={{ base: 'space-around', lg: 'space-evenly' }}
        >
          <Flex mt='100px' gap={20}>
            <Button
              isDisabled={pagination._page === 1}
              bg={colors.gray['700']}
              onClick={() => {
                if (pagination._page > 1) {
                  setPagination({
                    _page: pagination._page - 1,
                  });
                }
              }}
            >
              {'<'}
            </Button>
            <Text fontWeight='700'>{`Página: [${pagination._page}]`}</Text>
            <Button
              bg={colors.gray['700']}
              isDisabled={
                !!totalProduct.current &&
                totalProduct.current < pagination._page * 6
              }
              onClick={() => {
                if (
                  !!totalProduct.current &&
                  totalProduct.current > pagination._page * 6
                ) {
                  setPagination({
                    _page: pagination._page + 1,
                  });
                }
              }}
            >
              {'>'}
            </Button>
          </Flex>
        </Center>
      </PageWithAuth>
    </>
  );
}
