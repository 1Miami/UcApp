import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext"; // Importa o CartContext

const Cart = () => {
  const { cart, getCart } = useContext(CartContext);

  // Carrega o carrinho do AsyncStorage ao montar o componente
  useEffect(() => {
    getCart();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {cart.length === 0 ? (
        <Text>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.product.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemTitle}>{item.product.title}</Text>
              <Text>Quantidade: {item.quantity}</Text>
              <Text>Preço: ${item.product.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
