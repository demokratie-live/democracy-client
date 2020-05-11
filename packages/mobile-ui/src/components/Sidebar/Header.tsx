import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { HeadLogo } from './HeadLogo';
import { ActivityIndicator } from 'react-native';
import { ConstituencyContext } from '../../../../mobile-app/src/context/Constituency';
import constituencies from '../../../../mobile-app/src/screens/Bundestag/Procedure/components/svgs/constituencies';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16;
  padding-left: 16;
  padding-bottom: 8;
`;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17;
  padding-left: 16;
`;

interface Props {
  onPress: () => void;
  label: string;
  testID?: string;
}

export const Header: React.FC<Props> = ({ onPress, label }) => {
  const { constituency } = useContext(ConstituencyContext);

  const getConstituency = (wk: string) => {
    const DynComp = constituencies(wk);
    return (
      <DynComp.default
        width={60}
        height={50}
        childProps={{ fill: '#fff', stroke: '#4494d344', strokeWidth: '2%' }}
      />
    );
  };
  return (
    <Container onPress={onPress}>
      {!constituency && label !== 'verbindet…' && <HeadLogo />}
      {!constituency && label === 'verbindet…' && (
        <ActivityIndicator size="large" />
      )}
      {!!constituency && getConstituency(constituency)}
      <HeadTextWrapper>
        <HeadText>{label}</HeadText>
        {!!constituency && <HeadText>Wahlkreis {constituency}</HeadText>}
      </HeadTextWrapper>
    </Container>
  );
};
