
// src/screens/Checkout.tsx
import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { ICartItem } from "../types/Products"; // Importar o ICartItem

interface CheckoutProps {
  route: {
    params: {
      cartItems: ICartItem[]; // Recebendo o ICartItem
      totalAmount: number;
    };
  };
}

const Checkout: React.FC<CheckoutProps> = ({ route }) => {
  const { cartItems, totalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.product.title}</Text>
            <Text>
              ${item.product.price.toFixed(2)} x {item.quantity}
            </Text>
          </View>
        )}
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  total: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});