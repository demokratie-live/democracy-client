import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.View`
  margin-top: 11;
  background-color: #fff;
  border-radius: 5;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 9;
  padding-horizontal: 9;
`;

const Headline = styled.Text`
  flex: 1;
  font-size: 17;
`;

const CollapseIcon = styled(Ionicons).attrs({
  color: 'rgb(151, 151, 151)',
  name: 'ios-arrow-up-outline',
  size: 20,
})`
  align-self: flex-start;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Divider = styled.View`
  height: 1;
  background-color: #efeff4;
  margin-top: 9;
`;

const Text = styled.Text`
  padding-vertical: 9;
  padding-horizontal: 9;
  color: #666666;
`;

class Folding extends Component {
  state = {
    open: false,
  };

  render() {
    const { title, text } = this.props;
    const { open } = this.state;
    return (
      <Wrapper>
        <Header onPress={() => this.setState({ open: !open })}>
          <Headline>{title}</Headline>
          <CollapseIcon open={open} />
        </Header>
        {open && (
          <Fragment>
            <Divider />
            <Text>{text}</Text>
          </Fragment>
        )}
        <Divider />
      </Wrapper>
    );
  }
}

Folding.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Folding;
