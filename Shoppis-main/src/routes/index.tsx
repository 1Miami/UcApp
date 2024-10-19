import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import User from "../screens/User";
import Payment from "../screens/Payment";
import Details from "../screens/Details";

export const Routes = () => {
  const { getToken, token } = useContext(UserContext);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
};
