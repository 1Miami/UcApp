import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #706b6b;
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
