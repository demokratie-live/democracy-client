import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { lightTheme } from "@democracy-deutschland/ui";

import { Government } from "../../components/Icons";
import SvgWahlOMeter from "../../components/Icons/WahlOMeter";
import SvgSettings from "../../components/Icons/Settings";
import SvgFaqAndSupport from "../../components/Icons/FaqAndSupport";
import SvgAbout from "../../components/Icons/About";
import { AboutScreen } from "../../screens/About";
import { FaqScreen } from "../../screens/Faq";
import { SettingsScreen } from "../../screens/Settings";
import { DevScreen } from "../../screens/DevScreen";
import { AbgeordneteScreen } from "../../screens/Abgeordnete";
import { useDevModeStore } from "../../api/state/dev";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import BundestagTabViewNavigation from "./[legislaturePeriod]";
import { WahlOMeterNavigation } from "../WahlOMeter";

export type SidebarParamList = {
  Bundestag: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Faq: undefined;
  About: undefined;
  Abgeordnete: { editMode?: "true" };
  Development: undefined;
  DEV: undefined;
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

const SidebarNavigation = () => {
  const { devMode } = useDevModeStore();

  return (
    <SidebarDrawer.Navigator
      initialRouteName="Bundestag"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: lightTheme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: lightTheme.colors.text.secondary,
        drawerType: "slide",
        overlayColor: "rgba(0, 0, 0, 0.1)",
        drawerLabelStyle: {
          color: "#fff",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerActiveBackgroundColor: "rgba(68, 148, 211, 0.5)",
      }}
    >
      <SidebarDrawer.Screen
        name="Bundestag"
        component={BundestagTabViewNavigation}
        options={{
          drawerLabel: "hide/Bundestag",
          drawerIcon: ({ color, size }) => (
            <Government width={size} height={size} color={color} />
          ),
        }}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: "hide/Wahl-O-Meter",
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          title: "Wahl-O-Meter",
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: "hide/Abgeordnete",
        }}
        name="Abgeordnete"
        component={AbgeordneteScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: "Einstellungen",
          drawerLabel: "Mehr/Einstellungen",
          drawerIcon: ({ color, size }) => (
            <SvgSettings width={size} height={size} color={color} />
          ),
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: "FAQ & Support",
          drawerLabel: "Mehr/FAQ & Support",
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={"Faq"}
        component={FaqScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: "Über DEMOCRACY",
          drawerLabel: "Mehr/Über DEMOCRACY",
          drawerIcon: ({ color, size }) => (
            <SvgAbout width={size} height={size} color={color} />
          ),
        }}
        name={"About"}
        component={AboutScreen}
      />
      {devMode ? (
        <SidebarDrawer.Screen name="DEV" component={DevScreen} />
      ) : null}
    </SidebarDrawer.Navigator>
  );
};

export default SidebarNavigation;
