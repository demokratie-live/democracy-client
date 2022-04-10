import React from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, Text, Platform, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SvgShareIos from '../../../components/Icons/ShareIos';
import SvgShare from '../../../components/Icons/Share';
import SvgBell from '../../../components/Icons/Bell';
import SvgBellSlash from '../../../components/Icons/BellSlash';
import { theme } from '../../../styles/theme';

// Pick<Slice, 'percent' | 'large'>
const VoteIconButtonWrapper = styled.TouchableOpacity<
  Pick<Props, 'selection' | 'voteSelection' | 'voted'>
>`
  width: 88px;
  height: 88px;

  border-color: rgba(21, 192, 99, 0.8);
  border-radius: ${88 / 2}px;
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

const VoteIconButton = styled.Image.attrs<{ source: ImageSourcePropType }>(({ source }) => ({
  flex: 1,
  source,
  resizeMode: 'contain',
  width: null,
  height: null,
}))`
  width: 45px;
  height: 45px;
`;

interface Props {
  voteSelection?: string;
  onPress: () => void;
  selection: string;
  voted?: boolean;
  style?: ViewStyle;
  notify?: boolean;
}

const ActionButton: React.FC<Props> = ({
  voteSelection,
  onPress,
  selection,
  voted,
  style = {},
  notify,
}) => {
  let styleWrapper;
  let Icon;
  const ShareComponent = Platform.OS === 'ios' ? SvgShareIos : SvgShare;
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
        <SvgBell width={50} height={50} color="#fff" />
      ) : (
        <SvgBellSlash width={50} height={50} color="#fff" />
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
          style={{ marginBottom: Platform.OS === 'ios' ? 8 : 0 }}
        />
      );
      break;
    case 'UNKNOWN':
      Icon = (
        <Text
          style={{
            fontSize: 60,
            color: theme.oldColors.headerText,
            fontWeight: '200',
          }}
        >
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
      style={{ ...styleWrapper, ...style }}
    >
      {Icon}
    </VoteIconButtonWrapper>
  );
};

export default ActionButton;
