import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const ContactWrapper = styled.View`
  flex-wrap: wrap;
  padding-top: 18;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
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

const ServiceWrapper = styled.View`
  align-items: center;
  flex: 1;
  min-width: 80;
  max-width: 200;
  height: 100;
`;

const Domain = styled.Text`
  font-size: 12;
  padding-top: 5;
`;

class ContactBox extends React.PureComponent {
  getIcon = ({ name, url }) => {
    switch (name) {
      case 'email': {
        const email = `mailto:${url}`;
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={this.linking(email)}>
              <ContactIcons name="envelope" size={30} />
            </IconWrapper>
          </ServiceWrapper>
        );
      }

      case 'facebook':
      case 'Facebook':
      case 'twitter':
      case 'Twitter':
      case 'instagram':
      case 'Instagram':
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={this.linking(url)}>
              <ContactIcons name={name.toLowerCase()} />
            </IconWrapper>
          </ServiceWrapper>
        );

      default:
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={this.linking(url)}>
              <ContactIcons name="globe" />
            </IconWrapper>
            <Domain>{name}</Domain>
          </ServiceWrapper>
        );
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
        {contacts.map(({ name, URL }) => this.getIcon({ name, url: URL }))}
      </ContactWrapper>
    );
  }
}

ContactBox.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      URL: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

ContactBox.defaultProps = {};

export default ContactBox;
