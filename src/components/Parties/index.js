import React from 'react';
import styled from 'styled-components/native';
import GRUENEN from './B90_DIE_GRUENEN';
import Union from './CDU_CSU';
import FDP from './FDP';
import SPD from './SPD';

const Text = styled.Text``;

const Image = styled.Image``;

const Party = ({ party, ...restProps }) => {
  switch (party) {
    case 'Union':
      return <Union width={150} {...restProps} />;
    case 'SPD':
      return <SPD width={150} {...restProps} />;
    case 'FDP':
      return <FDP width={150} {...restProps} />;
    case 'Grüne':
      return <GRUENEN width={150} {...restProps} />;
    case 'AfD':
      return (
        <Image
          width={150}
          height={59}
          source={require('../../../assets/parties/AfD.png')}
          {...restProps}
        />
      );
    case 'Linke':
      return (
        <Image
          width={150}
          height={56}
          source={require('../../../assets/parties/DIE_LINKE.png')}
          {...restProps}
        />
      );
    default:
      return <Text>{party}</Text>;
  }
};

export default Party;
