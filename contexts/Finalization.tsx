import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import React from "react";

// Define o tipo Product que será utilizado para representar os produtos (reaproveitado do código anterior)
type Product = {
  id: number;
  name: string;
  price: number;
};

// Props esperadas para o componente CheckoutScreen (recebe os itens do carrinho e o total)
interface CheckoutProps {
  cartItems: Product[];
  totalAmount: number;
}

// Componente de Finalização de Compra
const CheckoutScreen = ({ cartItems, totalAmount }: CheckoutProps) => {
  
  /**
   * Função que simula a finalização da compra.
   * Ao clicar no botão, exibe um alerta de sucesso.
   */
  const handleCheckout = () => {
    Alert.alert("Compra Finalizada", "Obrigado pela sua compra!", [{ text: "OK" }]);
    // Aqui você poderia implementar a lógica para processar a compra
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Compra</Text>
      
      {/* Lista dos itens no carrinho para revisão */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      {/* Exibe o total da compra */}
      <View style={styles.total}>
        <Text>Total: ${totalAmount.toFixed(2)}</Text>
      </View>

      {/* Botão para finalizar a compra */}
      <Button title="Finalizar Compra" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20, // Espaçamento ao redor do conteúdo
  },
  title: {
    fontSize: 22, // Tamanho da fonte para o título
    fontWeight: "bold",
    marginBottom: 20, // Espaçamento abaixo do título
  },
  cartItem: {
    flexDirection: "row", // Itens alinhados em linha (horizontal)
    justifyContent: "space-between", // Espaço entre nome e preço
    padding: 10, // Preenchimento interno
    backgroundColor: "#f8f8f8", // Cor de fundo dos itens no carrinho
    borderBottomWidth: 1, // Borda inferior para separação dos itens
    borderBottomColor: "#ccc", // Cor da borda
  },
  total: {
    marginTop: 20, // Espaçamento acima do total
    padding: 10, // Preenchimento interno
    backgroundColor: "#e6e6e6", // Cor de fundo
    borderRadius: 5, // Arredondamento dos cantos
    alignItems: "center", // Alinhamento do texto no centro
  },
});
