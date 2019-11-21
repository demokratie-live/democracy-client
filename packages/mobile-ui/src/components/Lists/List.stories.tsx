import React from 'react';
import { Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import faker from 'faker/locale/de';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';

import { Row } from './Row';
import { VoteItem } from './VoteItem';
// import CenterView from '../../decorators/CenterView';

storiesOf('List', module)
  // .addDecorator(CenterView)
  .add('Row', () => (
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
        {Array.from(Array(30).keys()).map(n => (
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
            />
          </Row>
        ))}
      </ScrollView>
    </SafeAreaView>
  ));
