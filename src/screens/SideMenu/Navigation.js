import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.SectionList.attrs({
  stickySectionHeadersEnabled: false
})``;

const SectionItem = styled.View`
  padding-left: 16;
  margin-top: 30;
  margin-bottom: 16;
`;

const SectionTitle = styled.Text`
  font-size: 13;
  color: #fff;
`;

const NavigationItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ active }) =>
    active ? "rgba(68, 148, 211, 0.5)" : "transparent"};
  height: 44;
  padding-left: 19;
`;

const NavigationIcon = styled.Image``;

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

const ListItem = ({ title, icon, currentScreen, screenId, navigateTo }) => (
  <NavigationItem
    active={currentScreen === screenId}
    onPress={() => navigateTo({ screenId, title })}
  >
    <NavigationIcon source={icon} />
    <NavigationTitle>{title}</NavigationTitle>
  </NavigationItem>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  screenId: PropTypes.string,
  currentScreen: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  active: false,
  screenId: ""
};

const NavigationView = ({ currentScreen, navigateTo }) => {
  const navigation = [
    {
      title: "Listen",
      data: [
        {
          screenId: "democracy.VoteList",
          title: "Bundestag".toUpperCase(),
          icon: require("../../../assets/icons/worldClock.png")
        }
      ]
    },
    {
      title: "Einstellungen",
      data: [
        // {
        //   title: "Benachrichtigungen",
        //   icon: require("../../../assets/icons/paperPlane.png")
        // },
        {
          screenId: "democracy.Security",
          title: "Sicherheit".toUpperCase(),
          icon: require("../../../assets/icons/lock.png")
        },
        {
          screenId: "democracy.Instructions",
          title: "Tutorial".toUpperCase(),
          icon: require("../../../assets/icons/baby.png")
        },
        {
          screenId: "democracy.Support",
          title: "Support".toUpperCase(),
          icon: require("../../../assets/icons/speechBubble9.png")
        }
      ]
    }
  ];
  return (
    <Wrapper
      sections={navigation}
      renderSectionHeader={({ section }) => <ListSection {...section} />}
      renderItem={({ item }) => (
        <ListItem
          {...item}
          currentScreen={currentScreen}
          navigateTo={navigateTo}
        />
      )}
      keyExtractor={({ title }) => title}
    />
  );
};

NavigationView.propTypes = {
  currentScreen: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired
};

export default NavigationView;
