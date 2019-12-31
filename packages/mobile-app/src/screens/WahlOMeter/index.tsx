import React, { PureComponent, createRef } from 'react';
import styled from 'styled-components/native';
import {
  Platform,
  // eslint-disable-next-line react-native/split-platform-components
  SegmentedControlIOS,
  Dimensions,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from 'react-native';
import MaterialTabs from 'react-native-material-tabs';

// Components
import Bundestag from './Bundestag';
import Fraktionen from './Fraktionen';
import Wahlkreis from './Wahlkreis';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { WahlOMeterStackParamList } from '../../routes/Sidebar/WahlOMeter';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SegmentControlsWrapper = styled.View`
  background-color: #4494d3;
  height: 50;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10;
`;

const AndroidControlsWrapper = styled.SafeAreaView`
  elevation: 2;
`;

const ScrollViewCmp = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
}))`
  flex: 1;
`;

export type WahlOMeterScreenNavigationProp = StackNavigationProp<
  WahlOMeterStackParamList,
  'WahlOMeter'
>;

type WahlOMeterScreenRouteProp = RouteProp<
  WahlOMeterStackParamList,
  'WahlOMeter'
>;

interface Props {
  route: WahlOMeterScreenRouteProp;
  navigation: WahlOMeterScreenNavigationProp;
}

class WahlOMeter extends PureComponent<Props> {
  state = {
    width: Dimensions.get('window').width,
    selectedIndex: 0,
    routes: ['Bundestag', 'Fraktionen', 'Wahlkreis'],
  };
  scrollView = createRef<ScrollView>().current;

  onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (this.state.selectedIndex !== pageNum) {
      this.setState({ selectedIndex: pageNum });
    }
  };

  onLayout = () => {
    const { width } = Dimensions.get('window');
    if (this.state.width !== width) {
      this.setState({
        width,
      });
    }
  };

  width = Dimensions.get('window').width;

  scrollTo = ({ x, y }: { x: number; y: number }) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({
        y,
        x,
      });
    }
  };

  render() {
    const { selectedIndex, width, routes } = this.state;
    const bundestagScreen = (
      <View key="bundestag" style={{ flex: 1, width: width }}>
        <Bundestag navigation={this.props.navigation} />
      </View>
    );
    const fraktionenScreen = (
      <View key="fraktionen" style={{ flex: 1, width: width }}>
        <Fraktionen navigation={this.props.navigation} />
      </View>
    );
    const wahlkreisScreen = (
      <View key="wahlkreis" style={{ flex: 1, width: width }}>
        <Wahlkreis navigation={this.props.navigation} />
      </View>
    );
    return (
      <Wrapper onLayout={this.onLayout}>
        {Platform.OS === 'ios' && (
          <>
            <SegmentControlsWrapper>
              <SegmentedControlIOS
                style={{
                  alignSelf: 'flex-end',
                  width: '100%',
                }}
                values={routes}
                tintColor="#ffffff"
                selectedIndex={selectedIndex}
                onChange={event => {
                  this.setState({
                    selectedIndex: event.nativeEvent.selectedSegmentIndex,
                  });
                  this.scrollTo({
                    y: 0,
                    x:
                      event.nativeEvent.selectedSegmentIndex * this.state.width,
                  });
                }}
              />
            </SegmentControlsWrapper>

            <ScrollViewCmp
              onContentSizeChange={() => {
                this.scrollTo({
                  y: 0,
                  x: selectedIndex * this.state.width,
                });
              }}
              onMomentumScrollEnd={this.onScrollEndDrag}
              ref={e => {
                if (e) {
                  this.scrollView = e;
                }
              }}>
              {[bundestagScreen, fraktionenScreen, wahlkreisScreen]}
            </ScrollViewCmp>
          </>
        )}
        {Platform.OS === 'android' && (
          <>
            <AndroidControlsWrapper>
              <MaterialTabs
                items={routes}
                barColor="#4494d3"
                inactiveTextColor="#214867"
                selectedIndex={selectedIndex}
                onChange={newSelectedIndex => {
                  this.setState({
                    newSelectedIndex,
                  });
                  this.scrollTo({
                    y: 0,
                    x: newSelectedIndex * this.state.width,
                  });
                }}
              />
            </AndroidControlsWrapper>
            <ScrollViewCmp
              onContentSizeChange={() => {
                this.scrollTo({
                  y: 0,
                  x: selectedIndex * this.state.width,
                });
              }}
              onMomentumScrollEnd={this.onScrollEndDrag}
              ref={e => {
                this.scrollView = e;
              }}>
              {[bundestagScreen, fraktionenScreen, wahlkreisScreen]}
            </ScrollViewCmp>
          </>
        )}
      </Wrapper>
    );
  }
}

export default WahlOMeter;
