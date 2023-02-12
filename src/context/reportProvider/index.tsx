import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import { AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';
import { apiWithAuth, routes } from 'src/services';

export interface Transactions {
  id: number;
  cost: number;
  quantity: number;
  productId: number;
  product: {
    cost: number;
    familyId: number;
    id: number;
    locationId: number;
    name: string;
    quantity: number;
  };
}

interface ReportContext {
  transactions: Transactions[];
  fetchTransactions: () => Promise<void>;
}

const ReportContext = createContext({} as ReportContext);

export const ReportProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState([] as Transactions[]);

  const toast = useToast();

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await apiWithAuth.get<Transactions[]>(
        routes.transactions.list
      );

      setTransactions(data);
    } catch (error) {
      if (error instanceof AxiosError && error.status === 500) {
        if (!toast.isActive('transactionsError')) {
          toast({
            description: 'Não foi possivel buscar os as transações',
            status: 'error',
            duration: 4000,
            position: 'top-right',
            containerStyle: { color: 'white' },
            isClosable: true,
            id: 'transactionsError',
          });
        }
      }
    }
  }, [toast]);

  return (
    <ReportContext.Provider
      value={{
        transactions,
        fetchTransactions,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
