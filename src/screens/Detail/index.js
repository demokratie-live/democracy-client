import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ActivityIndex from "../../components/ActivityIndex";
import Date from "../../components/Date";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: purple;
`;

const Intro = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding-vertical: 18;
  padding-horizontal: 18;
`;

const IntroMain = styled.View`
  flex: 1;
`;

const IntroTitle = styled.Text`
  font-size: 17;
`;

const IntroButtons = styled.View`
  flex: 1;
  justify-content: center;
  padding-top: 20;
`;

const IntroButton = styled.Image``;

const IntroSide = styled.View`
  justify-content: space-between;
`;

class Detail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17
  };

  render() {
    const { title, activityIndex, active, date } = this.props;
    return (
      <Wrapper>
        <Intro>
          <IntroMain>
            <IntroTitle>{title}</IntroTitle>
            <IntroButtons>
              <IntroButton
                source={require("../../../assets/icons/shape.png")}
              />
            </IntroButtons>
          </IntroMain>
          <IntroSide>
            <ActivityIndex count={activityIndex} active={active} />
            <Date date={date} />
          </IntroSide>
        </Intro>
      </Wrapper>
    );
  }
}

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
};

export default Detail;
