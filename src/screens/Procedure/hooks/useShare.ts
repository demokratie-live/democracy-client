import { useCallback } from "react";
import { Share, Platform } from "react-native";
import speakingurl from "speakingurl";
import { getShareLink } from "../../../lib/shareLink";
import { Procedure } from "../../../__generated__/graphql";
import { Logger } from "../../../logging";

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
      
      // Log the share action (without sensitive data)
      Logger.info('Procedure shared', {
        action: 'share_procedure',
        type: type.toLowerCase(),
        platform: Platform.OS,
        method: 'native_share'
      });
      
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
      ).then(() => {
        Logger.debug('Share completed successfully', {
          action: 'share_completed',
          platform: Platform.OS
        });
      }).catch((error) => {
        Logger.warn('Share was cancelled or failed', {
          action: 'share_failed',
          platform: Platform.OS,
          error_type: error.name || 'unknown'
        });
      });
    },
    []
  );
}
