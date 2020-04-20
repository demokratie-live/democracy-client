import React from 'react';
import styled from 'styled-components/native';
import { linking } from '../../../../../lib/linking';
import { Contacts } from '../..';
import PlanetIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Planet';
import FacebookIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Facebook';
import TwitterIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Twitter';
import MailIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Mail';
import InstagramIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Instagram';

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
              <MailIcon width={40} height={40} color="#000" />
            </IconWrapper>
          </ServiceWrapper>
        );
      }

      case 'facebook':
      case 'Facebook':
      var regex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:#!\/)?@?([^\/\?\s]*)/;
      var user = regex.exec(url);
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <FacebookIcon width={40} height={40} color="#000" />
            </IconWrapper>
            <Domain>{user[1]}</Domain>
          </ServiceWrapper>
        );
      case 'twitter':
      case 'Twitter':
      var regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/;
      var user = regex.exec(url);
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <TwitterIcon width={40} height={40} color="#000" />
            </IconWrapper>
            <Domain>{user[1]}</Domain>
          </ServiceWrapper>
        );
      case 'instagram':
      case 'Instagram':
      var regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:#!\/)?@?([^\/\?\s]*)/;
      var user = regex.exec(url);
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <InstagramIcon width={40} height={40} color="#000" />
            </IconWrapper>
            <Domain>{user[1]}</Domain>
          </ServiceWrapper>
        );

      default:
        return (
          <ServiceWrapper key={url}>
            <IconWrapper onPress={linking(url)}>
              <PlanetIcon width={40} height={40} color="#000" />
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
