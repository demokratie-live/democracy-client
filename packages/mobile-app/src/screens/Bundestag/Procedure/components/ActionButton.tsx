import React from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Pick<Slice, 'percent' | 'large'>
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
      case 'ACTIVITY_INDEX':
        return '#4494d3';
      case 'NOTIFY':
        return '#f5a623';
      case 'SHARE':
        return '#b10dd3';
      default:
        return 'grey';
    }
  }};
`;

const VoteIconButton = styled.Image.attrs<{ source: ImageSourcePropType }>(
  ({ source }) => ({
    flex: 1,
    source,
    resizeMode: 'contain',
    width: null,
    height: null,
  }),
)`
  width: 45;
  height: 45;
`;

interface Props {
  voteSelection?: string;
  onPress: () => void;
  selection: string;
  voted?: boolean;
  style?: any;
  notify?: boolean;
}

const ActionButton: React.FC<Props> = ({
  voteSelection,
  onPress,
  selection,
  voted,
  style,
  // notify,
}) => {
  let styleWrapper;
  let Icon;
  switch (selection) {
    case 'ACTIVITY_INDEX':
      styleWrapper = {
        borderColor: '#4494d3',
      };
      Icon = (
        <TouchableOpacity onPress={onPress}>
          <VoteIconButton source={require('./assets/arrowUp.png')} />
        </TouchableOpacity>
      );
      break;
    case 'NOTIFY':
      styleWrapper = {
        borderColor: '#f5a623',
      };
      Icon = <Text>notify</Text>;
      break;
    case 'SHARE':
      styleWrapper = {
        borderColor: '#b10dd3',
      };
      Icon = <Text>share</Text>;
      break;
    case 'UNKNOWN':
      Icon = <Text>help</Text>;
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
      {Icon}
    </VoteIconButtonWrapper>
  );
};

export default ActionButton;
