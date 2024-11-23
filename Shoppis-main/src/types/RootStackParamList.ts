import { ICartItem } from './Products';

export type RootStackParamList = {
  Cart: undefined;
  Checkout: {
    cartItems: ICartItem[];
    totalAmount: number;
    clearCartItems: () => void;
  };
  Login: undefined; // Adicionei a rota Login
  Menu: undefined; // Adicionei a rota Menu
  Details: {
    productId: number; // Exemplo de parâmetro, ajuste conforme necessário
  };
};
