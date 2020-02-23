import React from 'react';
import { styled } from '../../../../styles';
import { ImageSourcePropType } from 'react-native';

interface Props {
  icon?: ImageSourcePropType;
  owner?: string;
  title: string;
  text?: string;
}

const Wrapper = styled.View`
  background-color: #0007;
  margin-horizontal: 11;
  padding-horizontal: 11;
  padding-top: 11;
  padding-bottom: 18;
  border-radius: 12;
`;

const Head = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8;
`;

const Icon = styled.Image`
  width: 20;
  height: 20;
  margin-right: 5;
`;

const Owner = styled.Text`
  font-size: 13;
  color: #fff;
`;

const Title = styled.Text`
  font-size: 15;
  font-weight: bold;
  color: #fff;
`;

const Text = styled.Text`
  font-size: 15;
  color: #fff;
`;

export const NotificationBox: React.FC<Props> = ({
  title,
  text,
  icon,
  owner,
}) => {
  return (
    <Wrapper>
      {(!!icon || !!owner) && (
        <Head>
          {!!icon && <Icon source={icon} />}
          {!!owner && <Owner>{owner}</Owner>}
        </Head>
      )}
      <Title>{title}</Title>
      {!!text && <Text>{text}</Text>}
    </Wrapper>
  );
};
