import React, { Component } from 'react';
import { RefreshControl, ActivityIndicator, Platform, Share } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import getProcedure from '../../graphql/queries/getProcedure';
import TOGGLE_NOTIFICATION from '../../graphql/mutations/toggleNotification';
import VIEW_PROCEDURE_LOCAL from '../../graphql/mutations/local/viewProcedure';
import F_PROCEDURE_VIEWED from '../../graphql/fragments/ProcedureViewed';

import ActivityIndex from '../../components/ActivityIndex';
import DateTime from '../../components/Date';
import SegmentDetails from './Segments/Details';
import SegmentDocuments from './Segments/Documents';
import History from './Segments/History';
import VoteResults from './Segments/VoteResults';
import Segment from './Segment';
import Voting from './Voting';

const LoadingWrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Reload = styled.Button``;

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const Intro = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding-vertical: 18;
  padding-horizontal: 18;
`;

const IntroMain = styled.View`
  flex: 1;
  padding-right: 10;
`;

const IntroTitle = styled.Text`
  font-size: 18;
`;

const IntroButtons = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 20;
  margin-left: -4;
`;

const IntroButton = styled.TouchableOpacity`
  align-items: center;
  width: 32;
`;

const NotificationButtonIcon = styled(Ionicons).attrs({
  size: 32,
  name: ({ active }) => (active ? 'ios-notifications' : 'ios-notifications-outline'),
  color: ({ active }) => (active ? 'rgb(255, 171, 33)' : 'rgb(0, 0, 0)'),
})``;

const ShareButtonIcon = styled(Ionicons).attrs({
  size: 32,
  name: () => (Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'),
  color: 'rgb(0, 0, 0)',
})`
  padding-left: 8;
`;

const IntroSide = styled.View`
  justify-content: space-between;
`;

const TagsWrapper = styled.View`
  background-color: rgb(239, 239, 244);
`;

const TagsText = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 14;
  padding-horizontal: 18;
  padding-vertical: 10;
`;

const Content = styled.View`
  flex: 1;
`;

const VerificationTouch = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

class Detail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
    navBarLeftButtonColor: '#FFFFFF',
    navBarButtonColor: '#FFFFFF',
    backButtonTitle: '',
  };

  componentDidMount() {
    this.props.viewProcedure();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.procedure && this.listType !== data.procedure.listType) {
      this.listType = data.procedure.listType;
      let newTitle;
      switch (data.procedure.listType) {
        case 'VOTING':
          newTitle = 'Abstimmung';
          break;

        default:
          newTitle = 'Vorbereitung';
          break;
      }
      this.props.navigator.setTitle({
        title: newTitle.toUpperCase(), // the new title of the screen as appears in the nav bar
      });
    }
  }

  onLayout = ({ nativeEvent: { layout: { height } } }) => {
    this.componentHeight = height;
  };

  onComplete = () => {
    this.props.data.refetch();
  };

  scrollTo = ({ y }) => {
    let scrollTo;
    if (y + this.componentHeight > this.contentHeight) {
      scrollTo = this.contentHeight - this.componentHeight;
    } else {
      scrollTo = y;
    }
    if (scrollTo > 0) {
      this.scrollView.scrollTo({ y: scrollTo });
    }
  };

  share = () => {
    const { title, procedureId } = this.props.data.procedure;

    const url = `democracyapp://procedure/${procedureId}`;
    const message = Platform.OS === 'ios'?title: `${title} – ${url}`
    Share.share(
      {
        message,
        url,
        title: 'Weil Deine Stimme Zählt!',
      },
      {
        // Android only:
        dialogTitle: title,
      },
    );
  };

  listType = 'VOTING';

  render() {
    const { procedureId, toggleNotification, navigator } = this.props;
    const { data: { networkStatus, refetch, loading, procedure } } = this.props;
    if (!procedure && loading) {
      return <LoadingWrapper>{loading && <ActivityIndicator size="large" />}</LoadingWrapper>;
    }
    if ((!procedure || !procedure._id) && !loading) {
      return (
        <LoadingWrapper>
          <Reload title="Neu Laden" onPress={() => refetch()} />
        </LoadingWrapper>
      );
    }
    const {
      _id,
      title,
      tags,
      abstract,
      voteDate: date,
      subjectGroups,
      submissionDate,
      importantDocuments,
      voteResults,
      currentStatus,
      currentStatusHistory,
      notify,
      listType,
      type,
      activityIndex,
      voted,
      verified,
    } = this.props.data.procedure;

    return (
      <Wrapper
        onContentSizeChange={(width, height) => {
          this.contentHeight = height;
        }}
        onLayout={this.onLayout}
        innerRef={comp => {
          this.scrollView = comp;
        }}
        refreshControl={<RefreshControl refreshing={networkStatus === 4} onRefresh={refetch} />}
      >
        <Intro>
          <IntroMain>
            <IntroTitle>{title}</IntroTitle>
            <IntroButtons>
              <IntroButton onPress={toggleNotification}>
                <NotificationButtonIcon active={notify} />
              </IntroButton>
              <IntroButton onPress={this.share}>
                <ShareButtonIcon />
              </IntroButton>
            </IntroButtons>
          </IntroMain>
          <IntroSide>
            {verified ? null : (
              <VerificationTouch
                onPress={() => {
                  navigator.showModal({
                    screen: 'democracy.SmsVerification',
                    passProps: {
                      procedureId,
                      onComplete: this.onComplete,
                    },
                  });
                }}
              />
            )}
            <ActivityIndex procedureId={procedureId} touchable {...activityIndex} skipFetchData />
            {date && <DateTime date={date} />}
          </IntroSide>
        </Intro>
        <Content>
          {tags.length > 0 && (
            <TagsWrapper>
              <TagsText>{tags && tags.join(', ')}</TagsText>
            </TagsWrapper>
          )}
          <Segment title="Details" open scrollTo={this.scrollTo}>
            <SegmentDetails
              subjectGroups={subjectGroups}
              submissionDate={submissionDate}
              dateVote={date}
              abstract={abstract}
              procedureId={procedureId}
              currentStatus={currentStatus}
              type={type}
              voted={voted}
            />
          </Segment>
          <Segment title="Dokumente" scrollTo={this.scrollTo}>
            <SegmentDocuments documents={importantDocuments} navigator={navigator} />
          </Segment>
          {currentStatusHistory.length > 0 && (
            <Segment title="Gesetzesstand" scrollTo={this.scrollTo}>
              <History history={currentStatusHistory} currentStatus={currentStatus} voted={voted} />
            </Segment>
          )}
          <VoteResults
            key="community"
            voteResults={voteResults}
            procedure={_id}
            scrollTo={this.scrollTo}
            type="community"
          />
          <VoteResults
            key="government"
            voteResults={voteResults}
            procedure={_id}
            scrollTo={this.scrollTo}
            currentStatus={currentStatus}
            type="goverment"
          />
          {listType === 'VOTING' && (
            <Voting
              verified={verified}
              procedureObjId={_id}
              procedureId={procedureId}
              navigator={this.props.navigator}
              type={type}
            />
          )}
        </Content>
      </Wrapper>
    );
  }
}

Detail.propTypes = {
  procedureId: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  toggleNotification: PropTypes.func.isRequired,
  viewProcedure: PropTypes.func.isRequired,
};

Detail.defaultProps = {};

export default compose(
  graphql(getProcedure, {
    options: ({ procedureId }) => ({
      variables: { id: procedureId },
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(VIEW_PROCEDURE_LOCAL, {
    props({ mutate, ownProps }) {
      return {
        viewProcedure: () => {
          const { procedureId } = ownProps;
          mutate({
            variables: { procedureId },
            optimisticResponse: {
              __typename: 'Mutation',
              viewProcedure: {
                id: procedureId,
                __typename: 'Procedure',
                viewedStatus: 'VIEWED',
              },
            },
            update: cache => {
              // set View Procedure
              const aiFragment = cache.readFragment({
                id: procedureId,
                fragment: F_PROCEDURE_VIEWED,
              });
              if (aiFragment) {
                aiFragment.viewedStatus = 'VIEWED';

                cache.writeFragment({
                  id: procedureId,
                  fragment: F_PROCEDURE_VIEWED,
                  data: aiFragment,
                });
              }
            },
          });
        },
      };
    },
  }),
  graphql(TOGGLE_NOTIFICATION, {
    props({ mutate, ownProps }) {
      return {
        toggleNotification: () => {
          const { data: { procedure: { notify, procedureId } } } = ownProps;
          mutate({
            variables: { procedureId },
            optimisticResponse: {
              __typename: 'Mutation',
              toggleNotification: {
                __typename: 'Procedure',
                notify: !notify,
              },
            },
            update: (cache, { data: { toggleNotification: { notify: newNotify } } }) => {
              const data = cache.readQuery({
                query: getProcedure,
                variables: { id: procedureId },
              });

              data.procedure.notify = newNotify;
              cache.writeQuery({
                query: getProcedure,
                variables: { id: procedureId },
                data,
              });
            },
          });
        },
      };
    },
  }),
)(Detail);
