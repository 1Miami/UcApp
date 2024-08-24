import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #f8f8f8;
  padding: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #333;
`;

const Header = () => {
  return (
    <Container>
      <Title> Atividade 2 </Title>
    </Container>
  );
};

export default Header;
