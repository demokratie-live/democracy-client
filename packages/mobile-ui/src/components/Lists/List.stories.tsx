import React from 'react';
import { Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import faker from 'faker';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

import { Row } from './Row';
import { VoteItem } from './VoteItem';
import { generateDates } from '../shared/VoteDate.tsx/Dates';
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
          return (
            <Row
              key={date.toString() + endDate.toString()}
              onPress={() => {
                Alert.alert(`Row ${i} Clicked 👌`);
              }}>
              <VoteItem
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
