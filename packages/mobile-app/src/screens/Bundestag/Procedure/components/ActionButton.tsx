import React from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Bell from '@democracy-deutschland/mobile-ui/src/components/Icons/Bell';
import BellSlash from '@democracy-deutschland/mobile-ui/src/components/Icons/BellSlash';
import ShareIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Share';
import ShareIconIos from '@democracy-deutschland/mobile-ui/src/components/Icons/ShareIos';
import { theme } from '../../../../styles';

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
  notify,
}) => {
  let styleWrapper;
  let Icon;
  const ShareComponent = Platform.OS === 'ios' ? ShareIconIos : ShareIcon;
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
      Icon = !notify ? (
        <Bell width={50} height={50} color="#fff" />
      ) : (
        <BellSlash width={50} height={50} color="#fff" />
      );
      break;
    case 'SHARE':
      styleWrapper = {
        borderColor: '#b10dd3',
      };
      Icon = (
        <ShareComponent
          width={45}
          height={45}
          color="#fff"
          style={{ marginBottom: 8 }}
        />
      );
      break;
    case 'UNKNOWN':
      Icon = (
        <Text
          style={{
            fontSize: 60,
            color: theme.colors.headerText,
            fontWeight: '200',
          }}>
          ?
        </Text>
      );
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
