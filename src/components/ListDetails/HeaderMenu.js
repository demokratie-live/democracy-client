import React, { Component } from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemWrapper = styled.View`
  width: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MarkerIcon = styled(MaterialIcons).attrs({
  size: 24,
  name: 'place',
  color: '#4a4a4a',
})``;
const MarkerText = styled.Text`
  font-size: 12;
  letter-spacing: -0.26;
  color: #4a4a4a;
`;

const CommentsIcon = styled(MaterialIcons).attrs({
  size: 24,
  name: 'format-align-left',
  color: '#4a4a4a',
})``;
const CommentText = styled.Text`
  font-size: 12;
  letter-spacing: -0.26;
  color: #4a4a4a;
`;

const Date = styled.Text`
  font-size: 12;
  letter-spacing: -0.26;
  color: #44db5e;
`;

export default class ListDetailsHeaderMenu extends Component {
  render() {
    return (
      <Wrapper>
        <ItemWrapper>
          <MarkerIcon />
          <MarkerText>234</MarkerText>
        </ItemWrapper>
        <ItemWrapper>
          <CommentsIcon />
          <CommentText>74</CommentText>
        </ItemWrapper>
        <ItemWrapper>
          <Date>3:21</Date>
        </ItemWrapper>
      </Wrapper>
    );
  }
}
