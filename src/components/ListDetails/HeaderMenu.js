import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Icon } from 'react-native-elements';

const Wrapper = styled.View`
  height: 35;
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

const MarkerIcon = styled(Icon).attrs({
  name: 'place',
})``;
const MarkerText = styled.Text``;

const CommentsIcon = styled(Icon).attrs({
  name: 'format-align-left',
})``;
const CommentText = styled.Text``;

const Date = styled.Text``;

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
