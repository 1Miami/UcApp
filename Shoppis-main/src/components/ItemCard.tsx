
import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { CartContext } from '../contexts/CartContext';
import { ProductDTO } from '../types/Products';

interface ItemCardProps {
  product: ProductDTO;
}

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addProduct } = useContext(CartContext); // Importa o contexto do carrinho

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Comprar" onPress={() => addProduct(product)} />
        <Button
          title="Detalhes"
          onPress={() => navigation.navigate('Details', { productId: product.id })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ItemCard;