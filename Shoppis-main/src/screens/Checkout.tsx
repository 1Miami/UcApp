// src/screens/Checkout.tsx
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList"; // Certifique-se de que o tipo RootStackParamList está correto
// src/screens/Checkout.tsx
import { ICartItem } from "../types/Products"; // Atualize o caminho conforme necessário


// Defina o tipo das props com NativeStackScreenProps
type CheckoutProps = NativeStackScreenProps<RootStackParamList, "Checkout">;

const Checkout: React.FC<CheckoutProps> = ({ route, navigation }) => {
  const { cartItems, totalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Button title="Back to Menu" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.product.title} x {item.quantity}
            </Text>
            <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total Amount: ${totalAmount.toFixed(2)}</Text>
      {/* Aqui você pode adicionar mais componentes, como botões de pagamento */}
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
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});