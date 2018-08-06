import React from "react";
import { TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

const IconButton = ({ onPress, name, size, font, color, ...props }) => {
  const IconFont = font || Ionicons;
  return <IconFont name={name} size={size} color={color} />;
};

Navigation.registerComponent("IconButton", () => IconButton);
