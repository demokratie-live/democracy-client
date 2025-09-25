import React, { PropsWithChildren } from "react";
import { Linking, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Markdown from "react-native-markdown-display";

interface CustomMarkdownProps extends PropsWithChildren {
  style?: StyleSheet.NamedStyles<any>;
  bodyStyle?: StyleProp<ViewStyle>;
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ 
  children, 
  style = {},
  bodyStyle = {}
}) => {
  const markdownStyles = {
    body: {
      paddingHorizontal: 0,
      ...(bodyStyle as object),
    },
    paragraph: {
      color: "#555",
    },
    link: {
      color: "#4494d3",
    },
    ...style,
  };

  return (
    <Markdown
      style={markdownStyles}
      onLinkPress={(url: string) => {
        Linking.openURL(url).catch((error) =>
          console.warn("An error occurred: ", error)
        );
        return false;
      }}
    >
      {children}
    </Markdown>
  );
};