import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductDTO } from "../types/Products";

interface Props {
  product: ProductDTO;
}

const ItemCard = ({ product }: Props) => {
  const navigation = useNavigation<any>();
  
  // State para armazenar o título e a descrição editáveis
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { productId: product.id })}>

      <View style={styles.card}>
        <Image
          resizeMode="center"
          style={styles.image}
          source={{ uri: product.thumbnail }}
        />

        <View style={styles.details}>
          {/* Campo de entrada para o título */}
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Edit title"
          />
          {/* Campo de entrada para a descrição */}
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Edit description"
          />
          <Text>Price: ${product.price}</Text>
          {/* Botão para exibir o ID do produto */}
          <TouchableOpacity style={styles.idButton} onPress={() => alert(`ID: ${product.id}`)}>
            <Text style={styles.idButtonText}>Show ID</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    marginLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 5,
    width: '100%',
  },
  idButton: {
    marginTop: 10,
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 5,
  },
  idButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ItemCard;
