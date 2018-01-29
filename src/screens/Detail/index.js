import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import ActivityIndex from "../../components/ActivityIndex";
import Date from "../../components/Date";
import Segment from "./Segment";

import detailsData from "../../../dummy/details";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
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

const TagsWrapper = styled.View`
  background-color: rgb(239, 239, 244);
`;

const TagsText = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 13;
  padding-horizontal: 18;
  padding-vertical: 10;
`;

const Content = styled.FlatList`
  flex: 1;
`;

class Detail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17
  };

  state = {
    currentSegmentIndex: 0
  };

  setCurrentSegment = currentSegmentIndex => () => {
    console.log("index", currentSegmentIndex);
    this.setState({ currentSegmentIndex });
  };

  render() {
    const { title, activityIndex, active, date, tags } = this.props;
    const { currentSegmentIndex } = this.state;
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
        <TagsWrapper>
          <TagsText>{tags}</TagsText>
        </TagsWrapper>
        <Content
          data={detailsData}
          keyExtractor={({ type }) => type}
          renderItem={({ item, index }) => (
            <Segment
              open={currentSegmentIndex === index}
              onPress={this.setCurrentSegment(index)}
              {...item}
            />
          )}
        />
      </Wrapper>
    );
  }
}

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  tags: PropTypes.string.isRequired
};

export default Detail;
