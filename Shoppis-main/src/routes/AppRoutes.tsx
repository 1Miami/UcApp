// src/routes/AppRoutes.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from '../screens/Menu';
import ProductDetails from '../screens/ProductDetails'; // Altere se necessário
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Login from '../screens/Login';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Details" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
