import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const ContactWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const ContactIcons = styled(FontAwesome).attrs(() => ({
  size: 40,
  color: '#000000',
}))``;

class ContactBox extends React.PureComponent {
  getIcon = ({ service, url }) => {
    switch (service) {
      case 'email': {
        const email = `mailto:${url}`;
        return (
          <IconWrapper onPress={this.linking(email)}>
            <ContactIcons name="envelope" size={30} />
          </IconWrapper>
        );
      }

      default:
        return null;
    }
  };
  linking = url => () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).catch(() => null);
      } else {
        Alert.alert(
          'Nicht unterstützt',
          'Diese Operation wird auf Deinem Gerät zurzeit nicht unterstützt!',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }
    });
  };

  render() {
    const { contacts } = this.props;
    return (
      <ContactWrapper>
        {contacts.map(({ service, URL }) => this.getIcon({ service, url: URL }))}
      </ContactWrapper>
    );
  }
}

ContactBox.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape()),
};

ContactBox.defaultProps = {
  contacts: [
    { service: 'facebook', URL: 'http://facebook.com' },
    { service: 'email', URL: 'test@test.de' },
  ],
};

export default ContactBox;
