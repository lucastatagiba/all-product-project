export const routes = {
  auth: {
    login: '/auth/login',
  },
  product: {
    list: '/products?_expand=family&_expand=location',
  },
  transactions: {
    list: '/transactions?_expand=product',
  },
};
