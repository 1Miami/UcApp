// src/screens/Menu.tsx
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../types/Products";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../components/ItemCard";
import { showError } from "../components/Toast";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

const Menu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await getCart();
        const url = "https://dummyjson.com/products";
        const response = await axios.get<{ products: ProductDTO[] }>(url);
        setProducts(response.data.products);
      } catch (error) {
        showError("Não foi possível recuperar os produtos");
      }
    };
    getData();
  }, []);

  const handleProductPress = (productId: number) => {
    navigation.navigate("Details", { productId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão para navegar até o carrinho */}
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Carrinho</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item.id)}>
            <ItemCard product={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cartButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cartButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
  },
});
