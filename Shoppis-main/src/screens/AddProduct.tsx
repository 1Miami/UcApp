import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([""]);

  const handleAddProduct = () => {
    const newProduct = {
      id: Math.floor(Math.random() * 1000), // Apenas um ID mock
      title,
      description,
      price: Number(price),
      images,
    };

    // Aqui você pode adicionar a lógica de chamada para a API que vai adicionar o produto
    console.log("Novo Produto Adicionado", newProduct);
  };

  const handleImageChange = (index: number, newImageUrl: string) => {
    const updatedImages = [...images];
    updatedImages[index] = newImageUrl;
    setImages(updatedImages);
  };

  const addNewImageField = () => {
    setImages([...images, ""]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Nome do Produto"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição do Produto"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Preço"
        keyboardType="numeric"
      />

      {/* Campos de Imagens */}
      {images.map((image, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={image}
          onChangeText={(text) => handleImageChange(index, text)}
          placeholder={`URL da Imagem ${index + 1}`}
        />
      ))}

      <Button title="Adicionar Imagem" onPress={addNewImageField} />
      <Button title="Salvar Produto" onPress={handleAddProduct} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});


export default AddProduct;
