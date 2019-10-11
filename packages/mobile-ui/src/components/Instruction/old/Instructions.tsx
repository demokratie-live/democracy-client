import React, { PureComponent } from 'react';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { AsyncStorage } from 'react-native';

import Slide from '../Slide';
import { slidesData } from '../data';

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
  verified: 'Los gehts!',
};

class Introductions extends PureComponent {
  state = {
    buttonText: BUTTON_TEXTS.next,
    registered: null,
  };

  async componentWillMount() {
    const registered = !!(await AsyncStorage.getItem('auth_phoneHash'));
    this.setState({ registered });
  }

  onClick = () => {
    if (
      this.swiper.current &&
      this.swiper.current.state.index < this.swiper.current.state.total - 1
    ) {
      this.swiper.current.scrollBy(1);
    } else {
      this.close();
    }
  };

  onMomentumScrollEnd = () => {
    const { buttonText, registered } = this.state;
    const finishText = registered ? BUTTON_TEXTS.verified : BUTTON_TEXTS.finish;
    if (
      this.swiper.current &&
      this.swiper.current.state.index === this.swiper.current.state.total - 1 &&
      buttonText !== finishText
    ) {
      this.setState({ buttonText: finishText });
    } else if (BUTTON_TEXTS.next !== buttonText) {
      this.setState({ buttonText: BUTTON_TEXTS.next });
    }
  };

  close = () => {
    this.props.navigator.dismissAllModals();
  };

  verify = () => {
    this.props.navigator.showModal({
      screen: 'democracy.SmsVerification',
      passProps: {
        onComplete: this.close,
      },
    });
  };

  render() {
    const screens = [
      // Willkommen bei DEMOCRACY
      <Slide
        head={slidesData.Willkommen.head}
        images={slidesData.Willkommen.images}
        nextPage={this.onClick}
        isNew={slidesData.Willkommen.isNew}
      />,
      // Beobachte
      <Slide
        head={slidesData.Beobachte.head}
        images={slidesData.Beobachte.images}
        nextPage={this.onClick}
        isNew={slidesData.Beobachte.isNew}
      />,
      // Informiere Dich
      <Slide
        head={slidesData.Informiere.head}
        images={slidesData.Informiere.images}
        nextPage={this.onClick}
        isNew={slidesData.Informiere.isNew}
      />,
      // Stimme
      <Slide
        head={slidesData.Stimme.head}
        images={slidesData.Stimme.images}
        nextPage={this.onClick}
        isNew={slidesData.Stimme.isNew}
      />,
      // Vergleiche
      <Slide
        head={slidesData.Vergleiche.head}
        images={slidesData.Vergleiche.images}
        nextPage={this.onClick}
        isNew={slidesData.Vergleiche.isNew}
      />,
      // Analysiere
      // Todo Show register Preview if unverified
      <Slide
        head={slidesData.Analysiere.head}
        images={slidesData.Analysiere.images}
        nextPage={this.onClick}
        isNew={slidesData.Analysiere.isNew}
      />,
    ];

    if (!this.state.registered) {
      screens.push(
        // Registriere Dich
        <Slide
          head={slidesData.Registrieren.head}
          images={slidesData.Registrieren.images}
          nextPage={this.onClick}
          isNew={slidesData.Registrieren.isNew}
          verify={!this.state.registered ? this.verify : undefined}
        />,
      );
    }

    return (
      <Container>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={screens}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
        {/* <Swiper
          ref={this.swiper}
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
          }}> */}
        {/* {screens} */}
        {/* </Swiper> */}
        <Button onPress={this.onClick}>
          <ButtonText>{this.state.buttonText}</ButtonText>
        </Button>
      </Container>
    );
  }
}

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired,
};

export default Introductions;
