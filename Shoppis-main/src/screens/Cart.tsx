// src/screens/Cart.tsx
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import React, { useContext } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { CartContext } from '../contexts/CartContext'; 

const Cart: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, removeProduct } = useContext(CartContext);

  // Função para calcular o total do carrinho
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  // Função para ir para a tela de checkout
  const handleGoToCheckout = () => {
    const cartItems = cart.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }));
    navigation.navigate("Checkout", {
      cartItems,
      totalAmount: getTotal(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.thumbnail }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text>{item.product.title}</Text>
              <Text>${item.product.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <Button title="Remove" onPress={() => removeProduct(item.product.id)} />
          </View>
        )}
      />
      <View style={styles.total}>
        <Text>Total: ${getTotal().toFixed(2)}</Text>
        <Button
          title="Go to Checkout"
          onPress={handleGoToCheckout} // Mantenha a função aqui
          disabled={cart.length === 0} // Desabilitar se o carrinho estiver vazio
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
    alignItems: 'center',
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
