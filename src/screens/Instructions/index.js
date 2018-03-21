// @flow

import React, { Component } from "react";
import Swiper from "react-native-swiper";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigator } from "react-native-navigation";

import Slide from "./Slide";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";

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
  next: "Weiter",
  finish: "Los gehts!"
};

class Introductions extends Component {
  state = {
    buttonText: BUTTON_TEXTS.next
  };

  onClick = () => {
    if (this.swiper.state.index < this.swiper.state.total - 1) {
      this.swiper.scrollBy(1);
    } else {
      this.props.setInstructionsShown({
        variables: {
          isInstructionsShown: true
        }
      });
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
            bottom: 0
          }}
          dotStyle={{
            width: 5,
            height: 5,
            backgroundColor: "#4494d3",
            opacity: 0.5,
            marginTop: 12
          }}
          activeDotStyle={{
            width: 5,
            height: 5,
            backgroundColor: "#4494d3",
            marginTop: 12
          }}
        >
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.logo.png")}
            ImgCenter={require("../../../assets/tutorial/screen.list.png")}
            ImgRight={require("../../../assets/tutorial/screen.detail.png")}
            TxtHead="Wilkommen in der Beta"
            TxtSub="Alles über die deutsche Politik in einer App"
          />
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.beobachte.png")}
            ImgLeft={require("../../../assets/tutorial/screen.list.png")}
            ImgCenter={require("../../../assets/tutorial/screen.list.png")}
            ImgRight={require("../../../assets/tutorial/screen.detail.png")}
            TxtHead="Beobachte"
            TxtSub="…alle vergangenen, aktuellen und zukünftigen Abstimmungen des Bundestages"
          />
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.informiere.png")}
            ImgLeft={require("../../../assets/tutorial/screen.list.png")}
            ImgCenter={require("../../../assets/tutorial/screen.detail.png")}
            ImgRight={require("../../../assets/tutorial/screen.forum.png")}
            TxtHead="Informiere Dich"
            TxtSub="…über die Gesetzesvorlagen entlang der offiziellen Informationen des Bundestages"
          />
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.diskutiere.png")}
            ImgLeft={require("../../../assets/tutorial/screen.vote.png")}
            ImgCenter={require("../../../assets/tutorial/screen.forum.png")}
            ImgRight={require("../../../assets/tutorial/screen.vote.png")}
            TxtHead="Diskutiere"
            TxtSub="…über die Für’s und Wider’s des Antrags und bring weiterführende Informationen ein"
          />
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.stimme.png")}
            ImgLeft={require("../../../assets/tutorial/screen.forum.png")}
            ImgCenter={require("../../../assets/tutorial/screen.vote.png")}
            ImgRight={require("../../../assets/tutorial/screen.analyse.png")}
            TxtHead="Stimme"
            TxtSub="…noch vor der offiziellen Bundestagsentscheidung selbst über den Antrag ab"
          />
          <Slide
            ImgHead={require("../../../assets/tutorial/icon.analysiere.png")}
            ImgLeft={require("../../../assets/tutorial/screen.vote.png")}
            ImgCenter={require("../../../assets/tutorial/screen.analyse.png")}
            ImgCircle={null}
            TxtHead="Anlaysiere"
            TxtSub="…das Community-Abstimmungsverhalten und vergleich es mit den Bundestagsresultaten"
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
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(Introductions);
