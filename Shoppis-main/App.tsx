
// App.tsx
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Routes } from "./src/routes"; // Importa as rotas definidas no aplicativo
import { UserContextProvider } from "./src/contexts/UserContext"; // Contexto do usuário
import { CartContextProvider } from "./src/contexts/CartContext"; // Contexto do carrinho

export default function App() {
  return (
    <RootSiblingParent>
      <UserContextProvider>
        <CartContextProvider>
          <Routes /> {/* Renderiza as rotas do aplicativo */}
        </CartContextProvider>
      </UserContextProvider>
    </RootSiblingParent>
  );
}