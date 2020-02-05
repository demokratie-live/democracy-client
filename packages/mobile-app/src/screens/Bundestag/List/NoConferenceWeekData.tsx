import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_CONFERENCE_WEEK } from './graphql/query/currentConferenceWeek';
import { CurrentConferenceWeek } from './graphql/query/__generated__/CurrentConferenceWeek';
import dateFormat from 'dateformat';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 15;
  text-align: center;
  padding-horizontal: 18;
  padding-bottom: 11;
`;

const TextGrey = styled(Text)`
  color: #9b9b9b;
`;

export const NoConferenceWeekData = () => {
  const { data } = useQuery<CurrentConferenceWeek>(CURRENT_CONFERENCE_WEEK);
  return (
    <Container>
      <Text>Es liegen derzeit noch keine Abstimmungsdaten vor.</Text>
      {!!data && (
        <TextGrey>
          {`Die nächste Sitzungswoche findet gemäß Sitzungswochenkalener in KW ${
            data.currentConferenceWeek.calendarWeek
          } 
(${dateFormat(data.currentConferenceWeek.start, 'dd.mm.yyyy')} – ${dateFormat(
            data.currentConferenceWeek.end,
            'dd.mm.yyyy',
          )})
statt.
          `}
        </TextGrey>
      )}
      {/* TODO show button only if notifications not requested (show explanation for push) */}
      <Button
        text="Benachrichtigen"
        textColor="blue"
        onPress={() => Alert.alert('navigate to notifications')}
      />
    </Container>
  );
};
