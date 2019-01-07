import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, SegmentedControlIOS, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Bundestag from './Bundestag';
import Fraktionen from './Fraktionen';

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const SegmentView = styled.View`
  background-color: blue;
  width: ${Dimensions.get('window').width};
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

const ScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  pagingEnabled: true,
}))``;

class WahlOMeter extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    const menuIcon = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';

    Ionicons.getImageSource(menuIcon, 24, '#FFFFFF').then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: 'menu',
          },
        ],
      });
    });
  }

  state = {
    selectedIndex: 0,
  };

  onScrollEndDrag = e => {
    if (this.width === Dimensions.get('window').width) {
      const { contentOffset } = e.nativeEvent;
      const viewSize = e.nativeEvent.layoutMeasurement;

      // Divide the horizontal offset by the width of the view to see which page is visible
      const pageNum = Math.floor(contentOffset.x / viewSize.width);
      if (this.state.selectedIndex !== pageNum) {
        this.setState({ selectedIndex: pageNum });
      }
    }
  };

  width = Dimensions.get('window').width;

  render() {
    console.log('navigator', this.props.navigator);
    return (
      <Wrapper>
        <SegmentControlsWrapper>
          <SegmentedControlIOS
            style={{
              alignSelf: 'flex-end',
              width: '100%',
            }}
            values={['Bundestag', 'Fraktionen']}
            tintColor="#ffffff"
            selectedIndex={this.state.selectedIndex}
            onChange={event => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
              this.scrollView.scrollTo({
                y: 0,
                x: event.nativeEvent.selectedSegmentIndex * this.width,
              });
            }}
          />
        </SegmentControlsWrapper>
        <ScrollView
          onContentSizeChange={contentWidth => {
            this.width = contentWidth / 2;
            this.scrollView.scrollTo({
              y: 0,
              x: this.state.selectedIndex * this.width,
            });
          }}
          onMomentumScrollEnd={this.onScrollEndDrag}
          ref={e => {
            this.scrollView = e;
          }}
        >
          {[
            <SegmentView key="bundestag">
              <Bundestag navigator={this.props.navigator} />
            </SegmentView>,
            <SegmentView key="fraktionen">
              <Fraktionen navigator={this.props.navigator} />
            </SegmentView>,
          ]}
        </ScrollView>
      </Wrapper>
    );
  }
}

WahlOMeter.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default WahlOMeter;
