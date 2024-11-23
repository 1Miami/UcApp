import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./AppRoutes"; // Importação corrigida
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import User from "../screens/User";
import Details from "../screens/Details";



export const Routes = () => {
  const { getToken, token } = useContext(UserContext);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AppRoutes />} {/* Certifique-se de que você tenha uma condição aqui para renderizar algo diferente se não houver token */}
    </NavigationContainer>
  );
};
