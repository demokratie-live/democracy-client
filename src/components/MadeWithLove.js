import React from 'react';
import styled from 'styled-components/native';

const MadeWith = styled.Text`
  font-size: 12;
  text-align: center;
  color: rgb(143, 142, 148);
  padding-top: 7;
  padding-bottom: 7;
  background-color: rgb(239, 239, 244);
`;

const MadeWithLove = () => <MadeWith>Made with ❤ – DEMOCRACY Deutschland e.V.</MadeWith>;

export default MadeWithLove;
