import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductDTO } from "../types/Products";

type DetailsScreenRouteProp = RouteProp<{ Details: { productId: number } }, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({ route }: Props) => {
  const { productId } = route.params; // Recebe o ID do produto
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
      setDescription(data.description); // Inicializa a descrição
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>ID: {product.id}</Text>
        <Text style={styles.title}>Nome: {product.title}</Text>
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Salvar descrição" onPress={() => { /* Aqui você pode adicionar a lógica para salvar a descrição */ }} />
        
        <Text style={styles.title}>Imagens:</Text>
        {product.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Details;
