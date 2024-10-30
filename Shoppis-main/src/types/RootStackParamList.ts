// src/types/RootStackParamList.ts
import { ProductDTO } from "./Products"; // Importe o ProductDTO

export type RootStackParamList = {
  Menu: undefined;
  Details: { productId: number };
  Cart: undefined;
  Checkout: { cartItems: { product: ProductDTO; quantity: number }[]; totalAmount: number };
};
