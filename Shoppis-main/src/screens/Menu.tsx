import { FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../types/Products";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../components/ItemCard";
import { showError } from "../components/Toast";

const Menu = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ItemCard product={item} />}
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
});
