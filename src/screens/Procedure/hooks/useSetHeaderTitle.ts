import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../app/_layout";
import { RouteProp } from "@react-navigation/core";

type RouteProps = RouteProp<RootStackParamList, "NotificationInstruction">;

type UseSetHeaderTitleProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "NotificationInstruction"
  >;
  route: RouteProps;
  data:
    | {
        procedure: {
          type: string;
        };
      }
    | undefined;
};

export function useSetHeaderTitle({
  navigation,
  route,
  data,
}: UseSetHeaderTitleProps) {
  useEffect(() => {
    if (!route.params?.title && data && data.procedure.type) {
      navigation.setOptions({
        title: data.procedure.type,
      });
    }
  }, [data, route, navigation]);
}
