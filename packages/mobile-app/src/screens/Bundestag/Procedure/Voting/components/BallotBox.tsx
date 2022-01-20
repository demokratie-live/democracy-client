import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  PanResponder,
  Animated,
  Dimensions,
  LayoutChangeEvent,
  PanResponderGestureState,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';

import VoteButton from '../../components/VoteButton';
import { useMutation, useLazyQuery, PureQueryOptions } from '@apollo/client';
import { VOTE } from './graphql/mutation/vote';
import { Vote, VoteVariables } from './graphql/mutation/__generated__/vote';
import { VoteSelection } from '../../../../../../__generated__/globalTypes';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PROCEDURE } from '../../graphql/query/Procedure';
import { LocalVotesContext } from '../../../../../context/LocalVotes';
import { ConstituencyContext } from '../../../../../context/Constituency';
import {
  Procedure,
  ProcedureVariables,
} from '../../graphql/query/__generated__/Procedure';
import { SEARCH_PROCEDURES } from '../../../Search/graphql/query/searchProcedures';
import { SearchContext } from '../../../../../context/Search';

import { NotificationsContext } from '../../../../../context/NotificationPermission';
import { RootStackParamList } from '../../../../../routes';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 18px;
  background-color: #fafafa;
`;

const DropZone = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.Image.attrs(() => ({
  source: require('./assets/voteDropZone.png'),
}))``;

// const CheckIcon = styled(SimpleLineIcons).attrs(() => ({
//   size: 80,
//   color: "#000000",
//   name: "check"
// }))`
//   padding-top: 5px;
// `;

const LineWrapper = styled.View`
  position: absolute;
  left: 120px;
  right: 120px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Line = styled.Image.attrs(() => ({
  source: require('./assets/vote-line.png'),
  resizeMode: 'stretch',
}))``;

interface Props {
  selection: VoteSelection.YES | VoteSelection.ABSTINATION | VoteSelection.NO;
  procedureId: string;
  procedureObjId: string;
  title: string;
}

const BalloutBox: React.FC<Props> = ({
  selection,
  procedureId,
  procedureObjId,
  title,
}) => {
  const {
    notificationSettings,
    hasPermissions,
    outcomePushsDenied,
  } = useContext(NotificationsContext);
  const { setLocalVote } = useContext(LocalVotesContext);
  const { constituency } = useContext(ConstituencyContext);
  const { term } = useContext(SearchContext);
  const constituencies = constituency ? [constituency] : [];
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'Voting'>
  >();
  let searchRefetchQuery: PureQueryOptions[] = [];
  if (term) {
    searchRefetchQuery = [
      {
        query: SEARCH_PROCEDURES,
        variables: {
          term,
        },
      },
    ];
  }

  const [vote] = useMutation<Vote, VoteVariables>(VOTE, {
    refetchQueries: [
      {
        query: PROCEDURE,
        variables: {
          id: procedureId,
          constituencies,
        },
      },
      ...searchRefetchQuery,
    ],
  });
  const [refetchProcedure] = useLazyQuery<Procedure, ProcedureVariables>(
    PROCEDURE,
    {
      variables: {
        id: procedureId,
        constituencies,
      },
    },
  );
  const [isDraggable, setIsDraggable] = useState(true);

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const isDropArea = (gesture: PanResponderGestureState) =>
    gesture.moveX > Dimensions.get('window').width - 100;

  const showNotification = () => {
    Alert.alert('Stimme abgeben', 'Ziehe deine Auswahl auf den Haken.');
  };

  const previewAnimation = useCallback(() => {
    Animated.timing(pan, {
      toValue: { x: 50, y: 0 },
      duration: 1500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [pan]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).stop();
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).stop();
          if (isDraggable) {
            Animated.event([null, { dx: pan.x }])(e, gestureState);
          }
        },
        onPanResponderRelease: (e, gesture) => {
          if (isDraggable) {
            if (isDropArea(gesture)) {
              Animated.spring(pan, {
                toValue: {
                  x: Dimensions.get('window').width - 94 - 2 * 18,
                  y: 0,
                },
                friction: 5,
                useNativeDriver: true,
              }).start();
              setIsDraggable(false);

              // TODO remove delay after drop in zone
              vote({
                variables: {
                  constituency,
                  procedure: procedureObjId,
                  selection,
                },
              })
                .then(() => {
                  setLocalVote({
                    procedureId,
                    constituency,
                    selection,
                  });
                  if (
                    (!notificationSettings.outcomePushs ||
                      !notificationSettings.enabled ||
                      !hasPermissions) &&
                    !outcomePushsDenied
                  ) {
                    navigation.replace('OutcomePush', {
                      finishAction: () => navigation.goBack(),
                      procedureId: procedureId,
                      title,
                    });
                  } else {
                    navigation.goBack();
                  }
                })
                .catch(() => {
                  refetchProcedure();
                  navigation.goBack();
                });
            } else {
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                friction: 5,
                useNativeDriver: true,
              }).start(({ finished }) => {
                if (finished) {
                  previewAnimation();
                }
              });
              showNotification();
            }
          }
        },
      }),
    [
      pan,
      isDraggable,
      vote,
      constituency,
      procedureObjId,
      selection,
      setLocalVote,
      procedureId,
      notificationSettings.outcomePushs,
      notificationSettings.enabled,
      hasPermissions,
      outcomePushsDenied,
      navigation,
      title,
      refetchProcedure,
      previewAnimation,
    ],
  );

  useEffect(() => {
    previewAnimation();
  }, [previewAnimation]);

  const onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    if (!isDraggable) {
      Animated.spring(pan, {
        toValue: {
          x: width - 94 - 2 * 18,
          y: 0,
        },
        useNativeDriver: true,
      }).start();
    }
  };

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };
  return (
    <Wrapper onLayout={onLayout}>
      <DropZone onPress={showNotification}>
        <CheckIcon />
      </DropZone>
      <LineWrapper>
        <Line />
      </LineWrapper>
      <Animated.View {...panResponder.panHandlers} style={panStyle}>
        <VoteButton selection={selection} />
      </Animated.View>
    </Wrapper>
  );
};

export default BalloutBox;
