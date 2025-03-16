import React from "react";

import { Government } from "../../components/Icons";
import SvgWahlOMeter from "../../components/Icons/WahlOMeter";
import SvgSettings from "../../components/Icons/Settings";
import SvgFaqAndSupport from "../../components/Icons/FaqAndSupport";
import SvgAbout from "../../components/Icons/About";
import { Drawer } from "expo-router/drawer";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { lightTheme } from "@democracy-deutschland/ui";

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

const SidebarNavigation = () => {
  return (
    <Drawer
      // initialRouteName="Bundestag"
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
      <Drawer.Screen
        name="[legislaturePeriod]/Procedures"
        options={{
          drawerLabel: "hide/Bundestag",
          drawerIcon: ({ color, size }) => (
            <Government width={size} height={size} color={color} />
          ),
          title: "Bundestag",
        }}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "hide/Wahl-O-Meter",
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          title: "Wahl-O-Meter",
        }}
        name="[legislaturePeriod]/WahlOMeter/index"
      />
      <Drawer.Screen
        options={{
          drawerLabel: "hide/Abgeordnete",
          title: "Abgeordnete",
        }}
        name="[legislaturePeriod]/Deputies"
      />
      <Drawer.Screen
        options={{
          title: "Einstellungen",
          drawerLabel: "Mehr/Einstellungen",
          drawerIcon: ({ color, size }) => (
            <SvgSettings width={size} height={size} color={color} />
          ),
        }}
        name="Settings"
      />
      <Drawer.Screen
        options={{
          title: "FAQ & Support",
          drawerLabel: "Mehr/FAQ & Support",
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={"Faq"}
      />
      <Drawer.Screen
        options={{
          title: "Über DEMOCRACY",
          drawerLabel: "Mehr/Über DEMOCRACY",
          drawerIcon: ({ color, size }) => (
            <SvgAbout width={size} height={size} color={color} />
          ),
        }}
        name={"About"}
      />
    </Drawer>
  );
};

export default SidebarNavigation;
