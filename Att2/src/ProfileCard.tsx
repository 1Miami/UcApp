import React, { useState } from "react";
import styled from "styled-components/native";
import { ImageSourcePropType, TouchableOpacity } from "react-native";

const Card = styled.View`
  background-color: #e2e97e;
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

const AdditionalInfo = styled.Text`
  font-size: 15.5px;
  color: #333;
  margin-top: 10px;
`;

interface ProfileCardProps {
  name: string;
  description: string;
  image: ImageSourcePropType;
  additionalInfo: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  image,
  additionalInfo,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card>
        <ProfileImage source={image} />
        <Name>{name}</Name>
        <Description>{description}</Description>
        {expanded && <AdditionalInfo>{additionalInfo}</AdditionalInfo>}
      </Card>
    </TouchableOpacity>
  );
};

export default ProfileCard;
