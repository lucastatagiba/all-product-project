import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Page, Document, StyleSheet, View, Text } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import PageWithAuth from 'src/components/PageWithAuth';
import { Transactions, useReportContext } from 'src/context/reportProvider';
import { useUserContext } from 'src/context/authProvider';
import { useIsAuthenticated } from 'src/hooks';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  title: {
    padding: '0px 5px',
    backgroundColor: 'black',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50px',
    alignItems: 'center',
    fontSize: '15px',
  },
  column: {
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50px',
    alignItems: 'center',
  },
  row: {
    padding: '0px 30px',
    width: '25%',
  },
  line: {
    backgroundColor: 'gray',
    justifyContent: 'space-around',
    height: '1px',
  },
});

const PdfDocument = ({ transactions }: { transactions: Transactions[] }) => {
  const contentTransactions = transactions.map((transaction) => {
    const { id, cost, quantity, product } = transaction;
    return (
      <>
        <View key={id} style={[styles.column, { fontSize: 10 }]}>
          <Text style={[styles.row]}>{product.name}</Text>
          <Text style={[styles.row]}>{quantity}</Text>
          <Text style={[styles.row]}>R$ {product.cost},00</Text>
          <Text style={[styles.row]}>R$ {quantity * cost},00</Text>
        </View>
        <View style={styles.line}></View>
      </>
    );
  });

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.title}>
          <Text>Nome</Text>
          <Text>Quantidade</Text>
          <Text>Valor unitário</Text>
          <Text>Preço total</Text>
        </View>

        {contentTransactions}
        <Text
          style={{
            marginTop: '20px',
            fontSize: '14px',
          }}
        >
          Quantidade total:{' '}
          {transactions.reduce((acc, { quantity }) => quantity + acc, 0) ?? 0}
        </Text>
      </Page>
    </Document>
  );
};

export default function Pdf() {
  const { transactions } = useReportContext();
  const isAuthenticated = useIsAuthenticated();
  const { userAuth } = useUserContext();

  const router = useRouter();
  const isAdmin = userAuth?.usuario.isAdmin;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, router, isAdmin]);

  if (!isAuthenticated || isAdmin) return null;

  return (
    <>
      <Head>
        <title>All product project</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/shoppingcart_80945.png' />
      </Head>

      <PageWithAuth>
        <PDFViewer style={{ width: '100vw', height: '100vh' }}>
          <PdfDocument transactions={transactions} />
        </PDFViewer>
      </PageWithAuth>
    </>
  );
}
