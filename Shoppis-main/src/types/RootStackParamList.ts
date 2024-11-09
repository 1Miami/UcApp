import { ICartItem } from './Products';

export type RootStackParamList = {
  Cart: undefined;
  Checkout: {
    cartItems: ICartItem[];
    totalAmount: number;
    clearCartItems: () => void; // Adicionando clearCartItems
  };
};
