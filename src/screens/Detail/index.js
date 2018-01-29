import React, { Component } from "react";
import styled from "styled-components/native";

import ActivityIndex from "../../components/ActivityIndex";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: purple;
`;

const Intro = styled.View`
  background-color: #fff;
`;

class Detail extends Component {
  render() {
    console.log(this.props);
    const { activityIndex, active } = this.props;
    return (
      <Wrapper>
        <Intro>
          <ActivityIndex count={activityIndex} active={active} />
        </Intro>
      </Wrapper>
    );
  }
}

export default Detail;
