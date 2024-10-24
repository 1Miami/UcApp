import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert } from "react-native";
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
  const [title, setTitle] = useState(""); // Nome do produto
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // Preço
  const [category, setCategory] = useState(""); // Categoria
  const [images, setImages] = useState<string[]>([]); // Imagens

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price.toString()); // Converter preço para string
      setCategory(data.category);
      setImages(data.images);
    };

    fetchProduct();
  }, [productId]);

  const saveChanges = async () => {
    // Função para salvar as alterações
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price), // Converte o preço de volta para número
          category,
          images,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        Alert.alert("Erro", "Falha ao atualizar o produto.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações.");
    }
  };

  const handleImageChange = (index: number, newImage: string) => {
    const updatedImages = [...images];
    updatedImages[index] = newImage;
    setImages(updatedImages);
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>ID: {product.id}</Text>

        {/* Campo para editar o nome do produto */}
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          editable={false} // Tornar o nome não editável conforme solicitado
        />

        {/* Campo para editar a descrição */}
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        {/* Campo para editar o preço */}
        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Campo para editar a categoria */}
        <Text style={styles.label}>Categoria:</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        {/* Exibir e editar as imagens */}
        <Text style={styles.label}>Imagens:</Text>
        {images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
            <TextInput
              style={styles.input}
              value={img}
              onChangeText={(newImage) => handleImageChange(index, newImage)}
            />
          </View>
        ))}

        <Button title="Salvar alterações" onPress={saveChanges} />
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
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
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
});

export default Details;
