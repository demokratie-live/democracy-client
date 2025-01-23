import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useNotificationPermission = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setAuthorized(status === "granted");
    })();
  }, []);

  return { authorized };
};
