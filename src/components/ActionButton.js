import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

const VoteIconButtonWrapper = styled.TouchableOpacity`
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

const IconCmp = styled(Ionicons).attrs(({ name }) => ({
  size: 50,
  name,
  color: '#fff',
}))``;

const VoteIconButton = styled.Image.attrs(({ source }) => ({
  flex: 1,
  source,
  resizeMode: 'contain',
  width: null,
  height: null,
}))`
  width: 45;
  height: 45;
`;

const ActionButton = props => {
  const { voteSelection, onPress, selection, voted, style, notify } = props;
  let styleWrapper;
  let Icon;
  switch (selection) {
    case 'ACTIVITY_INDEX':
      styleWrapper = {
        borderColor: '#4494d3',
      };
      Icon = (
        <VoteIconButton source={require('../../assets/icons/arrowUp.png')} onPress={onPress} />
      );
      break;
    case 'NOTIFY':
      styleWrapper = {
        borderColor: '#f5a623',
      };
      Icon = (
        <IconCmp name={notify ? 'ios-notifications-off-outline' : 'ios-notifications-outline'} />
      );
      break;
    case 'SHARE':
      styleWrapper = {
        borderColor: '#b10dd3',
      };
      Icon = <IconCmp name={Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'} />;
      break;
    case 'UNKNOWN':
      Icon = <IconCmp name="ios-help-outline" />;
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

ActionButton.propTypes = {
  voteSelection: PropTypes.string,
  onPress: PropTypes.func,
  selection: PropTypes.string.isRequired,
  voted: PropTypes.bool,
  style: PropTypes.shape(),
  notify: PropTypes.bool,
};

ActionButton.defaultProps = {
  voteSelection: null,
  onPress: null,
  voted: null,
  style: {},
  notify: false,
};

export default ActionButton;
