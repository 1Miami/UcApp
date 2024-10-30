// src/routes/AppRoutes.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from '../screens/Menu';
import ProductDetails from '../screens/ProductDetails'; // Altere se necessário
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Details" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
