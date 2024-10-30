// screens/CheckoutScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductDTO } from '../types/Products'; // Ajuste o caminho conforme necessário
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CartContextProvider } from "./CartContext";
interface CheckoutProps {
  navigation: StackNavigationProp<any>; // Tipagem para navegação
  route: RouteProp<{
    params: {
      cartItems: ProductDTO[];
      totalAmount: number;
    };
  }>;
}

const CheckoutScreen: React.FC<CheckoutProps> = ({ route }) => {
  const { cartItems, totalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text>
      <Text style={styles.subTitle}>Items:</Text>
      {cartItems.map((item) => (
        <Text key={item.id}>{item.title} - ${item.price.toFixed(2)}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CheckoutScreen;
