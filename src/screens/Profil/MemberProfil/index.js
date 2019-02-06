import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import ContactBox from '../../../components/ContactBox';
// Components
import PartyComponent from '../../../components/Parties';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Chart from './Chart';
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
  padding-bottom: 8;
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
  padding-top: 18;
`;

class MemberProfil extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  getActivityIndicator = () => <ActivityIndicator size="large" />;

  render() {
    const { data } = this.props;
    const constituency = data.constituency.constituency || false;
    if (data.loading) {
      return this.getActivityIndicator();
    }

    const votingData = [
      {
        label: 'Zustimmungen',
        color: '#15C063',
        value: 37,
      },
      {
        label: 'Enthaltungen',
        color: '#2C82E4',
        value: 32,
      },
      {
        label: 'Ablehnungen',
        color: '#EC3E31',
        value: 2,
      },
      { label: 'Abwesend', value: 23, color: '#B1B3B4' },
    ];

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
            {({ data: { deputiesOfConstituency }, loading }) => {
              if (loading) {
                return this.getActivityIndicator();
              }
              const { imgURL, party, name, job, biography, contact } = deputiesOfConstituency[0];
              const contacts = contact.email
                ? [{ name: 'email', url: contact.email }, ...contact.links]
                : [...contact.links];

              return (
                <>
                  <MemberImageWrapper>
                    <MemberImage source={{ uri: imgURL }} />
                    <Party party={party} />
                  </MemberImageWrapper>
                  <Text>{name}</Text>
                  <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
                  <TextGrey>{job}</TextGrey>
                  {/* TODO AddRealData START */}
                  <Chart totalProcedures={150} votedProceduresCount={30} />
                  <ChartLegend data={votingData} />
                  {/* TODO AddRealData END */}
                  <SegmentWrapper>
                    <Segment title="Biographie">
                      <TextGrey>{biography}</TextGrey>
                    </Segment>
                    <Segment title="Kontakt" open>
                      <TextGrey>{contact.address}</TextGrey>
                      {contacts.length !== 0 && <ContactBox contacts={contacts} />}
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
  data: PropTypes.shape().isRequired,
};

MemberProfil.defaultProps = {};

export default graphql(GET_CONSTITUENCY, {
  options: {
    fetchPolicy: 'no-cache',
  },
})(MemberProfil);
