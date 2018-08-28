import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import ListRow from '../../components/ListRow';
import VoteListItem from '../../components/VoteListItem';

class ListItem extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      title,
      tags,
      date,
      procedureId,
      activityIndex: { activityIndex, active },
      votedGovernment,
      voted,
      viewedStatus,
    } = nextProps.item;
    const { item } = this.props;

    if (
      title !== item.title ||
      tags !== item.tags ||
      date !== item.date ||
      procedureId !== item.procedureId ||
      activityIndex !== item.activityIndex.activityIndex ||
      active !== item.activityIndex.active ||
      votedGovernment !== item.votedGovernment ||
      voted !== item.voted ||
      viewedStatus !== item.viewedStatus
    ) {
      return true;
    }

    return false;
  }

  render() {
    const { onClick, item } = this.props;
    return (
      <TouchableHighlight onPress={onClick({ item })} underlayColor="rgba(68, 148, 211, 0.1)">
        <ListRow>
          <VoteListItem {...item} />
        </ListRow>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;
