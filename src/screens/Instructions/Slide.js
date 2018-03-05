import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { View, Image } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
`;

const Text = styled.Text`
  color: #000;
  font-size: 30;
  font-weight: bold;
`;

const Slide = () => (
  <Container>
    <View style={{ height: 85, justifyContent: 'center' }}>
      <Image source={require("../../../assets/images/logo3.png")} />
    </View>
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: '#000', fontSize: 22, fontFamily: 'HelveticaNeue-Light', letterSpacing: -0.1, paddingTop: 15 }}>Wilkommen in der Beta</Text>
      <Text style={{ color: '#9b9b9b', fontSize: 15, fontFamily: 'HelveticaNeue-Light', letterSpacing: -0.4, paddingTop: 1 }}>Alles über die deutsche Politik in einer App</Text>
    </View>
    <View style={{ justifyContent: 'center', marginTop: 28 }}>
      <Image source={require("../../../assets/images/detail1.png")} style={{ position: 'absolute', left: -93, top: 29 }} />
      <Image source={require("../../../assets/images/list.png")} style={{ position: 'absolute', left: -130, top: 0 }} />
      <Image source={require("../../../assets/images/oval4.png")} style={{ position: 'absolute', left: 93, top: 167 }} />
    </View>
  </Container >
);

Slide.defaultProps = {
  background: ""
};

export default Slide;
