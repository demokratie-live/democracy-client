import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { ActivityIndicator, Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import styled from 'styled-components/native';
// Components
import PartyComponent from '../../../components/Parties';
import ContactBox from '../../../components/ContactBox';
// GraphQL
import DEPUTIES_OF_CONSTITUENCY from '../../../graphql/queries/deputiesOfConstituency';
import GET_CONSTITUENCY from '../../../graphql/queries/local/constituency';
import Segment from '../../Detail/Segment';

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 18,
  },
})`
  flex-grow: 1;
  background-color: #fff;
`;

const MemberImageWrapper = styled.View`
  width: 100%;
  max-width: 284;
  height: 379;
  align-items: center;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 379;
  width: 284;
  border-radius: 142;
`;

const Party = styled(PartyComponent)`
  position: absolute;
  right: 0;
  bottom: 30;
`;

const Text = styled.Text`
  font-size: 15;
`;

const TextGrey = styled(Text)`
  color: #6d6d72;
`;

const TextLighGrey = styled(Text)`
  color: #9b9b9b;
`;

const SegmentWrapper = styled.View`
  width: 100%;
`;

class MemberProfil extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    if (!props.noMenu) {
      const menuIcon = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';

      Ionicons.getImageSource(menuIcon, 24, '#FFFFFF').then(icon => {
        props.navigator.setButtons({
          leftButtons: [
            {
              icon,
              id: 'menu',
            },
          ],
        });
      });
    }
  }

  getActivityIndicator = () => <ActivityIndicator size="large" />;

  render() {
    const { data } = this.props;
    const constituency = data.constituency.constituency || false;
    if (data.loading) {
      return this.getActivityIndicator();
    }
    return (
      <ScrollWrapper>
        {constituency && (
          <Query
            query={DEPUTIES_OF_CONSTITUENCY}
            variables={{
              constituency,
              directCandidate: true,
            }}
          >
            {({ data: { deputiesOfConstituency }, loading, error }) => {
              console.log({ deputiesOfConstituency, loading, error });
              if (loading) {
                return this.getActivityIndicator();
              }
              const { imgURL, party, name, job, biography, contact } = deputiesOfConstituency[0];
              return (
                <>
                  <MemberImageWrapper>
                    <MemberImage source={{ uri: imgURL }} />
                    <Party party={party} />
                  </MemberImageWrapper>
                  <Text>{name}</Text>
                  <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
                  <TextGrey>{job}</TextGrey>
                  <SegmentWrapper>
                    <Segment title="Biographie">
                      <TextGrey>{biography}</TextGrey>
                    </Segment>
                    <Segment title="Kontakt" open>
                      <TextGrey>{contact.address}</TextGrey>

                      <ContactBox />
                    </Segment>
                  </SegmentWrapper>
                </>
              );
            }}
          </Query>
        )}
      </ScrollWrapper>
    );
  }
}

MemberProfil.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  data: PropTypes.shape().isRequired,
  noMenu: PropTypes.bool,
};

MemberProfil.defaultProps = {
  noMenu: false,
};

export default graphql(GET_CONSTITUENCY, {
  options: {
    fetchPolicy: 'network-only',
  },
})(MemberProfil);
