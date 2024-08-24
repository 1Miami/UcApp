import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #f8f8f8;
  padding: 10px;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #333;
`;

const Footer = () => {
  return (
    <Container>
      <Text>© Senac Rs</Text>
    </Container>
  );
};

export default Footer;
