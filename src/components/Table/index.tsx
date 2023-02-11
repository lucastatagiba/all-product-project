import { memo, ReactNode, useState } from 'react';
import {
  Table as TableFromChakra,
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

interface IOrdering {
  [key: string]: ORDER_KEYS;
}

export interface IRowStyle {
  rowIndex: number;
  styles: TableRowProps;
}

interface SortProps {
  title: string;
  value: string;
}

enum ORDER_KEYS {
  ASC = 'asc',
  DESC = 'desc',
}

interface Props extends TableProps {
  titles: string[];
  titlesAndValues?: SortProps[];
  content: (ReactNode[] | JSX.Element[])[];
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

export const Table = memo(
  ({
    titles,
    titlesAndValues = [],
    content,
    rowsStyles,
    actionAfterOrdering,
    ...rest
  }: Props) => {
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
      <Box overflowX='auto' {...rest}>
        <TableFromChakra size='lg'>
          <Thead bg='black.900' textAlign='center'>
            <Tr>
              {titles.map((title, index) => {
                const cursorType =
                  !!titlesAndValues[index]?.value && !!actionAfterOrdering
                    ? 'pointer'
                    : 'auto';
                return (
                  <Th
                    key={title}
                    color='white'
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
                    bg={order?.[title] ? 'blackAlpha.500' : 'blackAlpha.900'}
                  >
                    <Flex>
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
        </TableFromChakra>
      </Box>
    ) : (
      <Text fontSize={'25px'} textAlign='center' padding={'30px'}>
        Nenhum item encontrado
      </Text>
    );
  }
);

Table.displayName = 'Table';
export default Table;
