// @flow

import * as React from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import Swiper from "react-native-swiper";

export default props => {
  onFinish = () => {
    props.navigator.push("example.FirstTabScreen");
  };
  onScroll = (e, state, context) => {
    console.log(state, context.state);
  };
  renderPagination = () => {};
  return (
    <Swiper style={styles.wrapper} loop={false} onMomentumScrollEnd={onScroll}>
      <View style={styles.slide1}>
        <Button
          onPress={onFinish}
          title="Skip"
          color="#841584"
          accessibilityLabel="Skip"
        />
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
