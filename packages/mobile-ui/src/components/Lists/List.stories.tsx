import React from 'react';
import { Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import faker from 'faker';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

import { Row } from './Row';
import { ListItem } from './ListItem';
import { generateDates } from '../shared/VoteDate.tsx/Dates';
import { Slice } from '../shared/Charts/PieChart';
// import CenterView from '../../decorators/CenterView';

storiesOf('List', module)
  // .addDecorator(CenterView)
  .add('Rows', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {Array.from(Array(30).keys()).map(n => (
          <Row
            key={n}
            onPress={() => {
              Alert.alert(`Row ${n} Clicked 👌`);
            }}>
            <Text>Row {n}</Text>
          </Row>
        ))}
      </ScrollView>
    </SafeAreaView>
  ))
  .add('VoteItem', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {generateDates().map(({ date, endDate }, i) => {
          const communityVotesYes = Math.floor(Math.random() * 90) + 1;
          const communityVotesNo =
            Math.floor(Math.random() * (100 - communityVotesYes)) + 1;
          const large = Math.floor(Math.random() * 3);
          const communityVotes: Slice[] = faker.random.boolean()
            ? [{ percent: 1, color: '#d8d8d8' }]
            : [
                {
                  percent: communityVotesYes / 100,
                  color: '#16c063',
                  large: large === 0,
                },
                {
                  percent: (100 - communityVotesYes - communityVotesNo) / 100,
                  color: '#2882e4',
                  large: large === 1,
                },
                {
                  percent: communityVotesNo / 100,
                  color: '#ec3e31',
                  large: large === 2,
                },
              ];
          const governmentVotes = communityVotes
            ? [...communityVotes].reverse()
            : undefined;
          return (
            <Row
              key={date.toString() + endDate.toString()}
              onPress={() => {
                Alert.alert(`Row ${i} Clicked 👌`);
              }}>
              <ListItem
                communityVotes={communityVotes}
                govermentChart={{
                  votes: governmentVotes,
                }}
                title={faker.lorem.sentence(faker.random.number(30))}
                subline={faker.lorem.sentence(faker.random.number(30))}
                voted={faker.random.boolean()}
                votes={faker.random.number()}
                voteDate={faker.date.between(date, endDate)}
                endDate={faker.date.between(date, endDate)}
              />
            </Row>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  ));
