import React from "react";
import styled from "styled-components/native";
import { ImageSourcePropType } from "react-native";

const Card = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
`;

interface ProfileCardProps {
  name: string;
  description: string;
  image: ImageSourcePropType;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <Card>
      <ProfileImage source={image} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Card>
  );
};

export default ProfileCard;
