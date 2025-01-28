import { useCallback, useContext, useMemo } from "react";
import {
  useToggleNotificationMutation,
  ProcedureDocument,
  ProcedureQuery,
  ProcedureQueryVariables,
} from "../../../__generated__/graphql";
import { NotificationsContext } from "../../../api/state/notificationPermission";
import { useNotificationPermission } from "../../../screens/Introduction/useNotificationPermission";
import { useRecoilValue } from "recoil";
import { constituencyState } from "../../../api/state/constituency";

type UseToggleNotificationParams = {
  procedureId: string;
  data?: ProcedureQuery;
  navigation: any; // Adjust the type as needed
};

export function useToggleNotification({
  procedureId,
  data,
  navigation,
}: UseToggleNotificationParams) {
  const { notificationSettings } = useContext(NotificationsContext);
  const pushAuthorized = useNotificationPermission();
  const constituency = useRecoilValue(constituencyState);
  const constituencies = useMemo(
    () => (constituency ? [constituency] : []),
    [constituency]
  );

  const [toggleNotificationMutation] = useToggleNotificationMutation({
    variables: { procedureId },
    refetchQueries: [
      {
        query: ProcedureDocument,
        variables: { id: procedureId, constituencies },
      },
    ],
  });

  const clickBell = useCallback(() => {
    if (
      !notificationSettings.enabled ||
      !notificationSettings.outcomePushs ||
      !pushAuthorized.authorized
    ) {
      navigation.navigate("NotificationInstruction", {
        title: data?.procedure.title,
      });
    } else {
      if (data) {
        toggleNotificationMutation({
          optimisticResponse: {
            toggleNotification: {
              __typename: "Procedure",
              notify: !data.procedure.notify,
              procedureId: data.procedure.procedureId,
            },
          },
          update: (proxy, { data: mutationData }) => {
            const procedureData = proxy.readQuery<
              ProcedureQuery,
              ProcedureQueryVariables
            >({
              query: ProcedureDocument,
              variables: { id: procedureId, constituencies },
            });
            if (
              procedureData &&
              mutationData &&
              mutationData.toggleNotification
            ) {
              proxy.writeQuery({
                query: ProcedureDocument,
                variables: { id: procedureId, constituencies },
                data: {
                  ...procedureData,
                  procedure: {
                    ...procedureData.procedure,
                    notify: mutationData.toggleNotification.notify,
                  },
                },
              });
            }
          },
        });
      }
    }
  }, [
    notificationSettings.enabled,
    notificationSettings.outcomePushs,
    pushAuthorized,
    navigation,
    data,
    toggleNotificationMutation,
    procedureId,
    constituencies,
  ]);

  return clickBell;
}
