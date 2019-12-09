import React from 'react';
import styled from 'styled-components/native';
import VoteDate from '@democracy-deutschland/mobile-ui/src/components/shared/VoteDate.tsx/VoteDate';

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
  title: string;
  date: Date;
  endDate: Date;
}

export const Intro: React.FC<Props> = ({ title, date, endDate }) => {
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
      <IntroBottom>
        <IntroButtons>
          {/* <NotificationButton notify={notify} procedureId={procedureId} /> */}
          {/* <IntroButton onPress={this.share}>
            <IconCmp
              name={Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'}
            />
          </IntroButton> */}
        </IntroButtons>
        {date && <VoteDate date={date} endDate={endDate} long />}
      </IntroBottom>
    </Container>
  );
};
