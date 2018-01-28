import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.SectionList``;

const SectionItem = styled.View`
  padding-left: 16;
  margin-top: 30;
`;

const SectionTitle = styled.Text`
  font-size: 13;
  color: #fff;
`;

const NavigationItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ active }) =>
    active ? "rgba(68, 148, 211, 0.5)" : "transparent"};
  height: 44;
  padding-left: 19;
`;

const NavigationIcon = styled.Image`
  width: 22;
  height: 20;
`;

const NavigationTitle = styled.Text`
  padding-left: 17;
  font-size: 17;
  color: #fff;
`;

const ListSection = ({ title }) => (
  <SectionItem>
    <SectionTitle>{title.toUpperCase()}</SectionTitle>
  </SectionItem>
);

ListSection.propTypes = {
  title: PropTypes.string.isRequired
};

const ListItem = ({ title, active, icon }) => (
  <NavigationItem active={active}>
    <NavigationIcon source={icon} />
    <NavigationTitle>{title}</NavigationTitle>
  </NavigationItem>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  icon: PropTypes.number.isRequired
};

ListItem.defaultProps = {
  active: false
};

const Navigation = () => {
  const navigation = [
    {
      title: "Listen",
      data: [
        {
          title: "Bundestag",
          icon: require("../../../assets/icons/worldClock.png")
        }
      ]
    },
    {
      title: "Einstellungen",
      data: [
        {
          title: "Benachrichtigungen",
          icon: require("../../../assets/icons/paperPlane.png")
        },
        {
          title: "Sicherheit",
          icon: require("../../../assets/icons/lock.png"),
          active: true
        },
        {
          title: "Support",
          icon: require("../../../assets/icons/speechBubble9.png")
        }
      ]
    }
  ];
  return (
    <Wrapper
      sections={navigation}
      renderSectionHeader={({ section }) => <ListSection {...section} />}
      renderItem={({ item }) => <ListItem {...item} />}
      keyExtractor={({ title }) => title}
    />
  );
};

export default Navigation;
