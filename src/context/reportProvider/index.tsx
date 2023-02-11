import { useToast } from '@chakra-ui/react';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useIsAuthenticated } from 'src/hooks';
import { apiWithAuth } from 'src/services';

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
}

const ReportContext = createContext({} as ReportContext);

export const ReportProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState([] as Transactions[]);

  const toast = useToast();
  const isAuthenticated = useIsAuthenticated();

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await apiWithAuth.get<Transactions[]>(
        '/transactions?_expand=product'
      );

      setTransactions(data);
    } catch (error: any) {
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
            description: 'Não foi possível buscar as transações',
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
    fetchTransactions();
  }, [fetchTransactions, isAuthenticated]);

  return (
    <ReportContext.Provider
      value={{
        transactions,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
