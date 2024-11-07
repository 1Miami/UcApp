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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { ICartItem } from "../types/Products";

type CheckoutProps = NativeStackScreenProps<RootStackParamList, "Checkout">;

const Checkout: React.FC<CheckoutProps> = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(route.params.cartItems);
  const [totalAmount, setTotalAmount] = useState(route.params.totalAmount);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleOpenPaymentDialog = () => {
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirmPayment = () => {
    setCartItems([]);
    setTotalAmount(0);
    setPaymentDialogOpen(false);
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    navigation.navigate("Menu"); // Redireciona para a tela do Menu
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 3 }}>
      <Button variant="outlined" color="primary" onClick={() => navigation.goBack()}>
        Back to Menu
      </Button>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, fontWeight: "bold" }}>
        Checkout
      </Typography>

      <List>
        {cartItems.map((item: ICartItem) => (
          <React.Fragment key={item.product.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={item.product.images[0]}
                  alt={item.product.title}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${item.product.title} x ${item.quantity}`}
                secondary={`$${(item.product.price * item.quantity).toFixed(2)}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenPaymentDialog}
        sx={{ mt: 2 }}
      >
        Proceed to Payment
      </Button>

      {/* Dialog de Pagamento */}
      <Dialog open={paymentDialogOpen} onClose={handleClosePaymentDialog}>
        <DialogTitle>Escolha o método de pagamento</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Cartão de Crédito"
              />
              <FormControlLabel
                value="debit"
                control={<Radio />}
                label="Cartão de Débito"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Confirmar Pagamento
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pop-up de Confirmação de Compra */}
      <Dialog open={confirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Compra Concluída</DialogTitle>
        <DialogContent>
          <Typography>
            Sua compra foi realizada com sucesso!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;
