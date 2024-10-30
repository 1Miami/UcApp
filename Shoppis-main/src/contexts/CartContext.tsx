import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, ProductDTO } from "../types/Products";
import { showError } from "../components/Toast";

type CartContextProps = {
  cart: ICartItem[];
  getCart: () => Promise<void>;
  addProduct: (product: ProductDTO) => void;
  removeProduct: (id: number) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const storeCart = async (value: ICartItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (error) {
      showError("Não foi possível salvar o carrinho");
    }
  };

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      const cartData = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setCart(cartData);
    } catch (error) {
      showError("Não foi possível recuperar o carrinho");
    }
  };

  const addProduct = (value: ProductDTO) => {
    const existingProduct = cart.find(({ product }) => value.id === product.id);

    if (existingProduct) {
      const newcart = cart.map((item) =>
        item.product.id === existingProduct.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(newcart);
      storeCart(newcart);
    } else {
      const newCart = [...cart, { product: value, quantity: 1 }];
      setCart(newCart);
      storeCart(newCart);
    }
  };

  const removeProduct = (id: number) => {
    const existingProduct = cart.find(item => item.product.id === id);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        // Diminui a quantidade do item
        const newCart = cart.map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(newCart);
        storeCart(newCart);
      } else {
        // Remove o item se a quantidade for 1
        const newCart = cart.filter(item => item.product.id !== id);
        setCart(newCart);
        storeCart(newCart);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, getCart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};
