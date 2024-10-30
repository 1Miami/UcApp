import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { RouteProp } from '@react-navigation/native';
import { ProductDTO } from "../types/Products";
import { CartContext } from "../contexts/CartContext";

type DetailsScreenRouteProp = RouteProp<{ Details: { productId: number } }, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({ route }: Props) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addProduct(product);
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
    }
  };

  if (!product) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.mainImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.galleryContainer}>
          {product.images.slice(1).map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.thumbnail} />
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  mainImage: {
    width: '90%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#666",
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: 'justify',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Details;
