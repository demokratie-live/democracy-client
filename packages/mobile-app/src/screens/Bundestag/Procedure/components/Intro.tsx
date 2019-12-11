import React from 'react';
import styled from 'styled-components/native';
import VoteDate from '@democracy-deutschland/mobile-ui/src/components/shared/VoteDate.tsx/VoteDate';
import ShareIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Share';
import { IntroButton } from './IntroButton';
import { Share, Platform } from 'react-native';
import { getShareLink } from '../../../../lib/shareLink';
import speakingurl from 'speakingurl';

const Container = styled.View`
  background-color: #fff;
  padding-top: 18;
  padding-bottom: 10;
  margin-horizontal: 18;
`;

const IntroTop = styled.View`
  flex-direction: row;
`;

const IntroTitle = styled.Text`
  flex: 1;
  font-size: 18;
  margin-right: 12;
`;

const Subline = styled.Text`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
`;

const IntroButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-left: -8;
`;

const IntroBottom = styled.View`
  padding-top: 8;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

interface Props {
  procedureId: string;
  title: string;
  topHeading?: string | null;
  type: string;
  date: Date;
  endDate: Date;
}

export const Intro: React.FC<Props> = ({
  title,
  topHeading,
  date,
  endDate,
  type,
  procedureId,
}) => {
  const share = () => {
    const url = `${getShareLink()}/${type.toLowerCase()}/${procedureId}/${speakingurl(
      title,
    )}`;
    const message = Platform.OS === 'ios' ? title : `${title} – ${url}`;
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

  return (
    <Container>
      <IntroTop>
        <IntroTitle>{title}</IntroTitle>
        {/* <ActivityIndex
          procedureId={procedureId}
          touchable
          verified={verified}
          {...activityIndex}
          skipFetchData
          navigator={navigator}
        /> */}
      </IntroTop>
      <Subline>{topHeading}</Subline>
      <IntroBottom>
        <IntroButtons>
          {/* <NotificationButton notify={notify} procedureId={procedureId} /> */}
          {
            // TODO Notification icon if needed
          }
          <IntroButton onPress={share}>
            <ShareIcon width={20} height={20} color="#000" />
            {
              // TODO Add iOS share icon
            }
          </IntroButton>
        </IntroButtons>
        {date && <VoteDate date={date} endDate={endDate} long />}
      </IntroBottom>
    </Container>
  );
};
