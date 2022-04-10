import React from 'react';
import styled from 'styled-components/native';
import { HeadLogo } from './HeadLogo';
import { ActivityIndicator } from 'react-native';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../../api/state/constituency';
import { getConstituencySvgs } from '../../../components/svgs/constituencies';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16px;
  padding-left: 16px;
  padding-bottom: 8px;
`;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17px;
  padding-left: 16px;
`;

interface Props {
  onPress: () => void;
  label: string;
  testID?: string;
}

export const Header: React.FC<Props> = ({ onPress, label }) => {
  const { constituency } = useRecoilValue(constituencyState);

  const getConstituency = (wk: string) => {
    const DynComp = getConstituencySvgs(wk).default;
    return (
      <DynComp
        width={60}
        height={50}
        childProps={{ fill: '#fff', stroke: '#4494d344', strokeWidth: '2%' }}
      />
    );
  };
  return (
    <Container onPress={onPress}>
      {!constituency && label !== 'verbindet…' && <HeadLogo />}
      {!constituency && label === 'verbindet…' && <ActivityIndicator size="large" />}
      {!!constituency && getConstituency(constituency)}
      <HeadTextWrapper>
        <HeadText>{label}</HeadText>
        {!!constituency && <HeadText>Wahlkreis {constituency}</HeadText>}
      </HeadTextWrapper>
    </Container>
  );
};
