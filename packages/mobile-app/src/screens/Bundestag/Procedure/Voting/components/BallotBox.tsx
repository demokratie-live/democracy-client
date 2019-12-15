import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
import { useMutation } from '@apollo/react-hooks';
import { VOTE } from './graphql/mutation/vote';
import { Vote, VoteVariables } from './graphql/mutation/__generated__/vote';
import { VoteSelection } from '../../../../../../__generated__/globalTypes';

// import VOTE from '../../graphql/mutations/vote';
// import VOTE_LOCAL from '../../graphql/mutations/local/vote';
// import VOTED from '../../graphql/queries/voted';
// import VOTES from '../../graphql/queries/votes';
// import VOTE_SELECTION_LOCAL from '../../graphql/queries/local/voteSelection';
// import F_ACTIVITY_INDEX from '../../graphql/fragments/ProcedureActivityIndex';
// import F_VOTED from '../../graphql/fragments/ProcedureVoted';
// import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 18;
  background-color: #fafafa;
`;

const DropZone = styled.TouchableOpacity`
  position: absolute;
  right: 18;
  width: 100;
  height: 100;
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
//   padding-top: 5;
// `;

const LineWrapper = styled.View`
  position: absolute;
  left: 120;
  right: 120;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Line = styled.Image.attrs(() => ({
  source: require('./assets/vote-line.png'),
  resizeMode: 'stretch',
}))``;

interface Props {
  selection: VoteSelection;
  procedureId: string;
}

const BalloutBox: React.FC<Props> = ({ selection, procedureId }) => {
  const [vote] = useMutation<Vote, VoteVariables>(VOTE);
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
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 300,
        }).start();
      }
    });
  }, [pan]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          Animated.timing(pan, { toValue: { x: 0, y: 0 } }).stop();
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).stop();
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
              }).start();
              setIsDraggable(false);

              // TODO remove delay after drop in zone
              vote({
                variables: {
                  constituency: '103',
                  procedureId,
                  selection,
                },
                // TODO refetch procedure detail page
              })
                .then(() => {
                  Alert.alert('go back');
                })
                .catch(voteError => {
                  console.log(voteError);
                  Alert.alert(JSON.stringify(voteError.messages));
                });
              // TODO navigate back
              // navigator.dismissAllModals({
              //   animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              // });
            } else {
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                friction: 5,
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
    [pan, isDraggable, vote, procedureId, selection, previewAnimation],
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
