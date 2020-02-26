import React, { PureComponent } from 'react';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Navigator } from 'react-native-navigation';

import SlideThanks from './SlideThanks';
import SlideDownload from './SlideDownload';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Button = styled.TouchableOpacity`
  background-color: #fcfcfc;
  height: 60;
  justify-content: center;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #0076ff;
  font-size: 20;
  line-height: 24;
`;

const BUTTON_TEXTS = {
  next: 'Weiter',
  finish: 'Überspringen',
};

class BetaEnd extends PureComponent {
  state = {
    buttonText: BUTTON_TEXTS.next,
  };

  onClick = () => {
    if (this.swiper.state.index < this.swiper.state.total - 1) {
      this.swiper.scrollBy(1);
    } else {
      this.props.navigator.dismissAllModals();
    }
  };

  onMomentumScrollEnd = () => {
    const { buttonText } = this.state;
    if (
      this.swiper.state.index === this.swiper.state.total - 1 &&
      BUTTON_TEXTS.finish !== buttonText
    ) {
      this.setState({ buttonText: BUTTON_TEXTS.finish });
    } else if (BUTTON_TEXTS.next !== buttonText) {
      this.setState({ buttonText: BUTTON_TEXTS.next });
    }
  };

  render() {
    return (
      <Container>
        <Swiper
          ref={e => {
            this.swiper = e;
          }}
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          paginationStyle={{
            bottom: 0,
          }}
          dotStyle={{
            width: 5,
            height: 5,
            backgroundColor: '#4494d3',
            opacity: 0.5,
            marginTop: 12,
          }}
          activeDotStyle={{
            width: 5,
            height: 5,
            backgroundColor: '#4494d3',
            marginTop: 12,
          }}
        >
          <SlideThanks />
          <SlideDownload />
        </Swiper>
        <Button onPress={this.onClick}>
          <ButtonText>{this.state.buttonText}</ButtonText>
        </Button>
      </Container>
    );
  }
}

BetaEnd.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default BetaEnd;
