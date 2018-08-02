import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

const NavigationIcon = styled.Image.attrs({
  resizeMode: "contain"
})`
  width: 24;
`;

const NavigationIoniconsIcon = styled(Ionicons).attrs({
  size: 24,
  color: "#fff"
})`
  text-align: center;
  width: 24;
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

const ListItem = ({ title, icon, currentScreen, screenId, navigateTo }) => (
  <NavigationItem
    active={currentScreen === screenId}
    onPress={() => navigateTo({ screenId, title })}
  >
    {icon}

    <NavigationTitle>{title}</NavigationTitle>
  </NavigationItem>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
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
          icon: (
            <NavigationIcon
              source={require("../../../assets/icons/worldClock.png")}
            />
          )
        }
      ]
    },
    {
      title: "Einstellungen",
      data: [
        {
          screenId: "democracy.Notifications",
          title: "Benachrichtigungen".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-notifications-outline" />
        },
        {
          screenId: "democracy.Security",
          title: "Sicherheit".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-lock-outline" />
        },
        {
          screenId: "democracy.Instructions",
          title: "Tutorial".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-school-outline" />
        },
        {
          screenId: "democracy.Support",
          title: "Support".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-chatbubbles-outline" />
        },
        {
          screenId: "democracy.Credits",
          title: "Credits".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-heart-outline" />
        },
        {
          screenId: "democracy.SmsVerification",
          title: "DEBUG".toUpperCase(),
          icon: <NavigationIoniconsIcon name="ios-heart-outline" />
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
