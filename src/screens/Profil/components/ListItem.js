import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  height: 44;
  align-items: center;
  padding-left: 16;
  border-bottom-width: 1;
  border-bottom-color: #c8c7cc;
  font-size: 17;
`;

const Text = styled.Text`
  font-size: 17;
  margin-right: auto;
`;

const Value = styled.Text`
  font-size: 17;
  color: #8f8e94;
`;

const NavigationIoniconsIcon = styled(Ionicons).attrs(() => ({
  size: 24,
  color: 'grey',
}))`
  text-align: center;
  width: 24;
`;

const ListItem = ({ children }) => (
  <Wrapper>
    <Text>{children}</Text>
    <Value>XY</Value>
    <NavigationIoniconsIcon name="ios-arrow-forward" />
  </Wrapper>
);

export default ListItem;
