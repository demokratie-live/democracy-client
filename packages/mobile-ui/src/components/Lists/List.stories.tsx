import React from 'react';
import { Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import faker from 'faker';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

import { Row } from './Row';
import { VoteItem } from './VoteItem';
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
        {Array.from(Array(30).keys()).map(n => {
          const earlyDate = new Date();
          earlyDate.setDate(earlyDate.getDate() - 3);
          const laterDate = new Date();
          laterDate.setDate(laterDate.getDate() + 3);
          return (
            <Row
              key={n}
              onPress={() => {
                Alert.alert(`Row ${n} Clicked 👌`);
              }}>
              <VoteItem
                title={faker.lorem.sentence(faker.random.number(30))}
                subline={faker.lorem.sentence(faker.random.number(30))}
                voted={faker.random.boolean()}
                votes={faker.random.number()}
                voteDate={faker.date.between(earlyDate, laterDate)}
                endDate={faker.date.between(earlyDate, laterDate)}
              />
            </Row>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  ));
