import { memo, ReactNode, useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableProps,
  TableRowProps,
  Flex,
  Icon,
  Box,
  Text,
} from '@chakra-ui/react';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { colors } from 'src/styles/theme';

export interface IOrdering {
  [key: string]: ORDER_KEYS;
}

export interface IRowStyle {
  rowIndex: number;
  styles: TableRowProps;
}

export interface SortProps {
  title: string;
  value: string;
}

enum ORDER_KEYS {
  ASC = 'asc',
  DESC = 'desc',
}

interface IProps extends TableProps {
  titles: string[];
  titlesAndValues?: SortProps[];
  content: (ReactNode[] | JSX.Element[])[];
  data?: any;
  rowsStyles?: IRowStyle[];
  actionAfterOrdering?: ({
    keys,
    orders,
  }: {
    keys: string;
    orders: string;
  }) => void;
}

function createSortQueryString(order: IOrdering, titles: SortProps[]) {
  const keyQuery: string[] = [];
  const orderQuery: string[] = [];

  Object.keys(order).forEach((key) => {
    const property = titles.find(({ title }) => title === key)?.value;
    keyQuery.push(property ?? '');
  });

  Object.keys(order).forEach((key) => {
    orderQuery.push(order[key]);
  });

  return {
    keys: keyQuery.join(','),
    orders: orderQuery.join(','),
  };
}

export const ProductTable = memo(
  ({
    titles,
    titlesAndValues = [],
    content,
    data,
    rowsStyles,
    actionAfterOrdering,
    ...rest
  }: IProps) => {
    const [order, setOrder] = useState({} as IOrdering);

    const handleChangeOrdering = (title: string) => {
      if (!titlesAndValues.length) return;

      const tmpOrder = { ...order };

      if (tmpOrder?.[title]) {
        if (tmpOrder[title] === ORDER_KEYS.ASC) {
          tmpOrder[title] = ORDER_KEYS.DESC;
        } else {
          delete tmpOrder[title];
        }
      } else {
        tmpOrder[title] = ORDER_KEYS.ASC;
      }
      setOrder(tmpOrder);
      const query = createSortQueryString(tmpOrder, titlesAndValues);
      actionAfterOrdering?.(query);
    };

    return content.length > 0 ? (
      <Box overflowX='auto' height='500px'>
        <Table size='lg' {...rest}>
          <Thead bg={colors.black[900]}>
            <Tr>
              {titles.map((title, index) => {
                const cursorType =
                  !!titlesAndValues[index]?.value && !!actionAfterOrdering
                    ? 'pointer'
                    : 'auto';
                return (
                  <Th
                    key={title}
                    color={colors.white['pure']}
                    fontSize={14}
                    fontFamily='Roboto'
                    lineHeight='16px'
                    cursor={cursorType}
                    onClick={() =>
                      !!titlesAndValues[index]?.value &&
                      handleChangeOrdering(title)
                    }
                    width='300px'
                    height='60px'
                    bg={order?.[title] ? colors.black[500] : colors.black[900]}
                  >
                    <Flex alignItems='center' justifyContent='space-between'>
                      {title}

                      <Box minWidth='17px' ml='10px'>
                        {order?.[title] &&
                          (order[title] === ORDER_KEYS.ASC ? (
                            <Icon
                              as={BsFillArrowUpCircleFill}
                              width='17px'
                              height='17px'
                            />
                          ) : (
                            <Icon
                              as={BsFillArrowDownCircleFill}
                              width='17px'
                              height='17px'
                            />
                          ))}
                      </Box>
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {content.map((row, i) => (
              <Tr
                key={i}
                fontSize='14px'
                {...rowsStyles?.find((row) => row.rowIndex === i)?.styles}
              >
                {row.map((val: ReactNode | JSX.Element, index: number) => (
                  <Td key={index}>{val}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    ) : (
      <Text fontSize={'25px'} textAlign='center' padding={'30px'}>
        Nenhum item encontrado
      </Text>
    );
  }
);

ProductTable.displayName = 'ProductTable';
export default ProductTable;
