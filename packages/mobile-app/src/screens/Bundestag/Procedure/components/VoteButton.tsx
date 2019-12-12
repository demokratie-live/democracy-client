import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const VoteIconButtonWrapper = styled.TouchableOpacity<
  Pick<Props, 'selection' | 'voteSelection' | 'voted'>
>`
  width: 88;
  height: 88;

  border-color: rgba(21, 192, 99, 0.8);
  border-radius: ${88 / 2};
  align-items: center;
  justify-content: center;
  background-color: ${({ selection, voteSelection, voted }) => {
    if ((voted || voteSelection) && selection !== voteSelection) {
      return 'grey';
    }
    switch (selection) {
      case 'YES':
        return '#15C063';
      case 'ABSTINATION':
        return '#2C82E4';
      case 'NO':
        return '#EC3E31';
      default:
        return 'grey';
    }
  }};
`;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3;
  right: -3;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30;
  height: 30;
  align-items: center;
  justify-content: center;
  border-radius: 14;
  border-width: 1;
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
`;

const VoteIconButton = styled.Image.attrs(() => ({
  flex: 1,
  resizeMode: 'contain',
  width: null,
  height: null,
}))`
  width: 40;
  height: 40;
`;

interface Props {
  voteSelection?: string;
  onPress: () => void;
  selection: string;
  voted: boolean;
  style?: any;
}

const VoteButton: React.FC<Props> = ({
  voteSelection,
  onPress,
  selection,
  voted,
  style,
}) => {
  let styleWrapper;
  let styleButton;
  switch (selection) {
    case 'YES':
      styleButton = {
        marginBottom: 5,
      };
      break;
    case 'ABSTINATION':
      styleWrapper = {
        borderColor: 'rgba(44, 130, 228, 0.8)',
      };
      styleButton = {
        transform: [{ rotate: '-90deg' }],
        marginRight: 5,
      };

      break;
    case 'NO':
      styleWrapper = {
        borderColor: 'rgba(236, 62, 49, 0.8)',
      };
      styleButton = {
        transform: [{ rotate: '180deg' }],
        marginTop: 5,
      };
      break;
    case 'UNKNOWN':
      styleButton = {
        transform: [{ rotate: '180deg' }],
        marginTop: 5,
      };
      break;

    default:
      break;
  }
  return (
    <VoteIconButtonWrapper
      voted={voted}
      disabled={!!(!onPress || voted)}
      selection={selection}
      voteSelection={voteSelection}
      onPress={onPress}
      style={{ ...styleWrapper, ...style }}>
      {voted && (
        <LockIconWrapper>
          <Text>lock icon</Text>
        </LockIconWrapper>
      )}
      <VoteIconButton
        style={styleButton}
        source={require('./assets/thumbsUp.png')}
      />
    </VoteIconButtonWrapper>
  );
};

export default VoteButton;
