// src/screens/Cart.tsx
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamList";
import { CartContext } from "../contexts/CartContext";

const Cart: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, removeProduct, clearCart } = useContext(CartContext);

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleGoToCheckout = () => {
    const cartItems = cart.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }));
    const totalAmount = getTotal();

    // Passar os itens e o total para a tela de Checkout
    navigation.navigate("Checkout", {
      cartItems,
      totalAmount,
      clearCartItems: clearCart,  // Passando a função de limpar o carrinho para a tela de Checkout
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.thumbnail }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text>{item.product.title}</Text>
              <Text>
                ${item.product.price.toFixed(2)} x {item.quantity}
              </Text>
            </View>
            <Button title="Remover" onPress={() => removeProduct(item.product.id)} />
          </View>
        )}
      />
      <View style={styles.total}>
        <Text>Total: ${getTotal().toFixed(2)}</Text>
        <Button
          title="Ir para Checkout"
          onPress={handleGoToCheckout}
          disabled={cart.length === 0}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  total: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
