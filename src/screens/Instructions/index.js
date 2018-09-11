import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Navigator } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import Slide from './Slide';

import SET_INSTRUCTIONS_SHOWN from '../../graphql/mutations/setInstructinosShown';

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

class Introductions extends Component {
  state = {
    buttonText: BUTTON_TEXTS.next,
    registered: null,
  };

  async componentWillMount() {
    const registered = !!await AsyncStorage.getItem('auth_phoneHash');
    this.setState({ registered });
  }

  onClick = () => {
    if (this.swiper.state.index < this.swiper.state.total - 1) {
      this.swiper.scrollBy(1);
    } else {
      this.close();
    }
  };

  onMomentumScrollEnd = () => {
    const { buttonText, registered } = this.state;
    const finishText = registered ? BUTTON_TEXTS.verified : BUTTON_TEXTS.finish;
    if (this.swiper.state.index === this.swiper.state.total - 1 && buttonText !== finishText) {
      this.setState({ buttonText: finishText });
    } else if (BUTTON_TEXTS.next !== buttonText) {
      this.setState({ buttonText: BUTTON_TEXTS.next });
    }
  };

  close = () => {
    this.props.setInstructionsShown({
      variables: {
        isInstructionsShown: true,
      },
    });
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
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.logo.png')}
            ImgCenter={require('../../../assets/tutorial/screen.list.png')}
            ImgRight={require('../../../assets/tutorial/screen.detail.png')}
            TxtHead="Willkommen bei DEMOCRACY"
            TxtSub={`Alles über die deutsche Politik in einer App\n`}
            nextPage={this.onClick}
          />
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.beobachte.png')}
            ImgLeft={require('../../../assets/tutorial/screen.list.png')}
            ImgCenter={require('../../../assets/tutorial/screen.list.png')}
            ImgRight={require('../../../assets/tutorial/screen.detail.png')}
            TxtHead="Beobachte"
            TxtSub="…alle vergangenen, aktuellen und zukünftigen Abstimmungen des Bundestages"
            nextPage={this.onClick}
          />
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.informiere.png')}
            ImgLeft={require('../../../assets/tutorial/screen.list.png')}
            ImgCenter={require('../../../assets/tutorial/screen.detail.png')}
            ImgRight={require('../../../assets/tutorial/screen.vote.png')}
            TxtHead="Informiere Dich"
            TxtSub="…über die Gesetzesvorlagen entlang der offiziellen Informationen des Bundestages"
            nextPage={this.onClick}
          />
          {/* <Slide
            ImgHead={require("../../../assets/tutorial/icon.diskutiere.png")}
            ImgLeft={require("../../../assets/tutorial/screen.vote.png")}
            ImgCenter={require("../../../assets/tutorial/screen.forum.png")}
            ImgRight={require("../../../assets/tutorial/screen.vote.png")}
            TxtHead="Diskutiere"
            TxtSub="…über das Für und Wider des Antrags und bringe weiterführende Informationen ein"
            nextPage={this.onClick}
          /> */}
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.stimme.png')}
            ImgLeft={require('../../../assets/tutorial/screen.detail.png')}
            ImgCenter={require('../../../assets/tutorial/screen.vote.png')}
            ImgRight={require('../../../assets/tutorial/screen.analyse.png')}
            TxtHead="Stimme"
            TxtSub="…noch vor der offiziellen Bundestagsentscheidung selbst über den Antrag ab"
            nextPage={this.onClick}
          />
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.analysiere.png')}
            ImgLeft={require('../../../assets/tutorial/screen.vote.png')}
            ImgCenter={require('../../../assets/tutorial/screen.analyse.png')}
            ImgRight={require('../../../assets/tutorial/screen.registrieren.png')}
            TxtHead="Analysiere"
            TxtSub="…das Community-Abstimmungsverhalten und vergleich es mit den Bundestagsresultaten"
            nextPage={this.onClick}
          />
          <Slide
            ImgHead={require('../../../assets/tutorial/icon.logo.png')}
            ImgCenter={require('../../../assets/tutorial/screen.registrieren.png')}
            ImgCircle={null}
            TxtHead="Registrieren"
            TxtSub={`Zum Abstimmen musst Du Deine\nHandynummer verifizieren`}
            nextPage={this.onClick}
            verify={!this.state.registered ? this.verify : null}
            verified={this.state.registered}
          />
        </Swiper>
        <Button onPress={this.onClick}>
          <ButtonText>{this.state.buttonText}</ButtonText>
        </Button>
      </Container>
    );
  }
}

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: 'setInstructionsShown',
})(Introductions);
