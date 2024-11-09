import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  TextField,
  Box,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { ICartItem } from "../types/Products";
import { ScrollView } from "react-native";

type CheckoutProps = NativeStackScreenProps<RootStackParamList, "Checkout"> & {
  route: {
    params: {
      cartItems: ICartItem[];
      totalAmount: number;
      clearCartItems: () => void;
    };
  };
};

const Checkout: React.FC<CheckoutProps> = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(route.params.cartItems);
  const [totalAmount, setTotalAmount] = useState(route.params.totalAmount);

  // Estados para o cartão
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cards, setCards] = useState<string[]>([]); // Lista de cartões registrados
  const [selectedCard, setSelectedCard] = useState<string | null>(null); // Cartão selecionado

  // Snackbar para exibir tokens
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tokenMessage, setTokenMessage] = useState("");

  // Função para registrar um novo cartão
  const handleRegisterCard = () => {
    if (!cardNumber || !cardHolder || !cardExpiration || !cardCvv) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const newCard = `${cardHolder} | ${cardNumber}`;
    setCards((prev) => [...prev, newCard]);
    setTokenMessage(`Cartão registrado com sucesso! Token: ${generateToken()}`);
    setSnackbarOpen(true);

    // Limpa os campos
    setCardNumber("");
    setCardHolder("");
    setCardExpiration("");
    setCardCvv("");
  };

  // Função para finalizar o pagamento
  const handleConfirmPayment = () => {
    if (!selectedCard) {
      alert("Selecione um cartão registrado antes de finalizar o pagamento!");
      return;
    }

    // Limpa os itens do carrinho
    setCartItems([]);
    setTotalAmount(0);

    // Token de confirmação
    setTokenMessage(`Pagamento realizado com sucesso! Token: ${generateToken()}`);
    setSnackbarOpen(true);

    // Limpa os itens nas demais páginas do aplicativo
    route.params.clearCartItems();
  };

  // Gerar tokens aleatórios
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container maxWidth="sm" sx={{ padding: 3 }}>
        <Button variant="outlined" color="primary" onClick={() => navigation.goBack()}>
          Voltar ao Menu
        </Button>

        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, fontWeight: "bold" }}>
          Checkout
        </Typography>

        {/* Exibição dos itens do carrinho */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Produtos no Carrinho
          </Typography>
          
          
          <Divider />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: R${totalAmount}
          </Typography>
        </Box>

        {/* Registro de novo cartão */}
        <Box sx={{ mt: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cadastrar Novo Cartão
          </Typography>

          {/* Visualizador do cartão */}
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {cardNumber || "#### #### #### ####"}
            </Typography>
            <Typography variant="subtitle1">
              {cardHolder || "Nome do Titular"}
            </Typography>
            <Typography variant="subtitle2">
              {cardExpiration || "MM/AA"} | {cardCvv || "CVV"}
            </Typography>
          </Box>

          {/* Campos do cartão */}
          <TextField
            fullWidth
            label="Número do Cartão"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nome do Titular"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Data de Validade (MM/AA)"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="CVV"
            type="password"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterCard}
            sx={{ mt: 2 }}
          >
            Registrar Cartão
          </Button>
        </Box>

        {/* Lista de cartões registrados */}
        {cards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Selecione um Cartão Registrado
            </Typography>

            <RadioGroup
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              {cards.map((card, index) => (
                <FormControlLabel
                  key={index}
                  value={card}
                  control={<Radio />}
                  label={card}
                />
              ))}
            </RadioGroup>
          </Box>
        )}

        {/* Botão para finalizar pagamento */}
        {selectedCard && (
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmPayment}
            sx={{ mt: 2 }}
          >
            Finalizar Pagamento
          </Button>
        )}

        {/* Snackbar para exibir tokens */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={tokenMessage}
        />
      </Container>
    </ScrollView>
  );
};

export default Checkout;
