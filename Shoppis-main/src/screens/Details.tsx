import { StyleSheet, Text, View, Image, ScrollView, Button, Alert } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { RouteProp } from '@react-navigation/native';
import { ProductDTO } from "../types/Products";
import { CartContext } from "../contexts/CartContext"; // Importa o CartContext

type DetailsScreenRouteProp = RouteProp<{ Details: { productId: number } }, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({ route }: Props) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const { addProduct } = useContext(CartContext); // Acessa o contexto

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  // Função para adicionar ao carrinho e mostrar o Alert
  const handleAddToCart = () => {
    if (product) {
      addProduct(product); // Adiciona o produto ao carrinho
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!"); // Mostra uma mensagem de sucesso
    }
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>

        {product.images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
          </View>
        ))}

        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Preço: ${product.price}</Text>

        {/* Botão para adicionar ao carrinho */}
        <Button
          title="Adicionar ao Carrinho"
          onPress={handleAddToCart} // Chama a função que adiciona ao carrinho e mostra o alert
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Details;
