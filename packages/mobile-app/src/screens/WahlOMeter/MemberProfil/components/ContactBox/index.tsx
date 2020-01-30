import React from 'react';
import styled from 'styled-components/native';
import { linking } from '../../../../../lib/linking';
import { Contacts } from '../..';

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

const ContactIcons = styled.Text``;

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

interface Props {
  contacts: Contacts[];
}

class ContactBox extends React.PureComponent<Props> {
  getIcon = ({ name, url }: { name: string; url: string }) => {
    switch (name) {
      case 'email': {
        const email = `mailto:${url}`;
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(email)}>
              <ContactIcons>E-Mail ICON</ContactIcons>
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
            <IconWrapper onPress={linking(url)}>
              <ContactIcons>{name.toLowerCase()} ICON</ContactIcons>
            </IconWrapper>
          </ServiceWrapper>
        );

      default:
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <ContactIcons>GLOBUS ICON</ContactIcons>
            </IconWrapper>
            <Domain>{name}</Domain>
          </ServiceWrapper>
        );
    }
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

export default ContactBox;
