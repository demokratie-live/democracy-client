import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import {
  Platform,
  SegmentedControlIOS,
  Dimensions,
  View,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import MaterialTabs from 'react-native-material-tabs';

// Components
import Bundestag from './Bundestag';
import Fraktionen from './Fraktionen';
// import Wahlkreis from './Wahlkreis';

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

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
}))`
  flex: 1;
`;

interface Props {
  navigation: any;
  route: any;
}

class WahlOMeter extends PureComponent<Props> {
  state = {
    width: Dimensions.get('window').width,
    selectedIndex: 0,
    routes: ['Bundestag', 'Fraktionen', 'Wahlkreis'],
  };
  scrollView: any;

  onProcedureListItemClick = ({ item }: any) => () => {
    Alert.alert('navigate to procedure', item.procedureId);
    // this.props.navigateTo({
    //   screen: 'democracy.Detail',
    //   title: 'Abstimmung'.toUpperCase(),
    //   passProps: { ...item },
    //   backButtonTitle: '',
    // });
  };

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

  render() {
    const { selectedIndex, width, routes } = this.state;
    const bundestagScreen = (
      <View key="bundestag" style={{ flex: 1, width: width }}>
        <Bundestag />
      </View>
    );
    const fraktionenScreen = (
      <View key="fraktionen" style={{ flex: 1, width: width }}>
        <Fraktionen />
      </View>
    );
    // const wahlkreisScreen = (
    //   <View key="wahlkreis" style={{ flex: 1, width: width }}>
    //     <Wahlkreis />
    //   </View>
    // );
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
                  this.scrollView.scrollTo({
                    y: 0,
                    x:
                      event.nativeEvent.selectedSegmentIndex * this.state.width,
                  });
                }}
              />
            </SegmentControlsWrapper>

            <ScrollView
              onContentSizeChange={() => {
                this.scrollView.scrollTo({
                  y: 0,
                  x: selectedIndex * this.state.width,
                });
              }}
              onMomentumScrollEnd={this.onScrollEndDrag}
              ref={e => {
                this.scrollView = e;
              }}>
              {[
                bundestagScreen,
                fraktionenScreen,
                // wahlkreisScreen
              ]}
            </ScrollView>
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
                onChange={selectedIndex => {
                  this.setState({
                    selectedIndex,
                  });
                  this.scrollView.scrollTo({
                    y: 0,
                    x: selectedIndex * this.state.width,
                  });
                }}
              />
            </AndroidControlsWrapper>
            <ScrollView
              onContentSizeChange={() => {
                this.scrollView.scrollTo({
                  y: 0,
                  x: selectedIndex * this.state.width,
                });
              }}
              onMomentumScrollEnd={this.onScrollEndDrag}
              ref={e => {
                this.scrollView = e;
              }}>
              {[
                bundestagScreen,
                fraktionenScreen,
                // wahlkreisScreen
              ]}
            </ScrollView>
          </>
        )}
      </Wrapper>
    );
  }
}

export default WahlOMeter;
