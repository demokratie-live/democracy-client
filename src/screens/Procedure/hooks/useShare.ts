import { useCallback } from "react";
import { Share, Platform } from "react-native";
import speakingurl from "speakingurl";
import { getShareLink } from "../../../lib/shareLink";
import { Procedure } from "../../../__generated__/graphql";

export function useShare() {
  return useCallback(
    ({
      type,
      procedureId,
      title,
    }: Pick<Procedure, "type" | "procedureId" | "title">) => {
      const url = `${getShareLink()}/${type.toLowerCase()}/${procedureId}/${speakingurl(
        title
      )}`;
      const message = Platform.OS === "ios" ? title : `${title} – ${url}`;
      Share.share(
        {
          message,
          url,
          title: "Weil Deine Stimme Zählt!",
        },
        {
          // Android only:
          dialogTitle: title,
        }
      );
    },
    []
  );
}
