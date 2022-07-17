import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../routes';
import { ButtonNext } from '../screens/Verification/Start';
import Constituency from '../screens/Voting/components/Constituency';
import { PieChart } from './PieChart';
import { Space } from './Space';

const Wrapper = styled.View<Pick<Props, 'noButton'>>`
  align-items: center;
  /* justify-content: space-around; */
  min-height: ${({ noButton }) => (noButton ? 200 : 300)}px;
  /* flex: 1; */
`;

const ImageWrapper = styled.View``;

const PieChartWrapper = styled.View`
  position: absolute;
  right: 18px;
  bottom: 0px;
  width: 100px;
`;

const Text = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
  padding-horizontal: 18px;
`;

const TextBold = styled.Text`
  color: #000;
`;

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sidebar'>;

interface Props {
  noButton?: boolean;
}

export const NoConstituency: React.FC<Props> = ({ noButton }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const randomMainValue = Math.random() * (1 - 0.7);
  const randomSecondValue = Math.min(...[Math.random() * (1 - randomMainValue), 0.2]);

  const pieChartData = [
    { percent: randomMainValue, color: '#59BC6D', label: 'Zustimmungen' },
    { percent: randomSecondValue, color: '#4183DD', label: 'Enthaltungen' },
    {
      percent: 1 - randomMainValue - randomSecondValue,
      color: '#DB4D3C',
      label: 'Ablehnungen',
    },
  ];

  const navigateToSelectConstituency = () => {
    navigation.navigate('Constituency', {
      goBack: true,
    });
  };

  return (
    <Wrapper noButton={noButton}>
      <Space space={18} />
      <ImageWrapper>
        <Constituency width={249} height={155} />
        <PieChartWrapper>
          <PieChart data={pieChartData} size={20} />
        </PieChartWrapper>
      </ImageWrapper>
      <Space space={18} />
      <Text>
        Ab sofort können mit DEMOCRACY auch <TextBold>Wahlkreis-Community-Ergebnisse</TextBold>{' '}
        ermittelt werden. Mach mit und inspiriere Deinen Abgeordneten noch direkter!
      </Text>
      <Space space={18} />
      {!noButton && (
        <ButtonNext variant="primary" onPress={navigateToSelectConstituency}>
          {'Wahlkreis einstellen'.toUpperCase()}
        </ButtonNext>
      )}
    </Wrapper>
  );
};
