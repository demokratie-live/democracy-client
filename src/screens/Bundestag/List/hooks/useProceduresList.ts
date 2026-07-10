import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApolloError, ApolloQueryResult } from "@apollo/client";
import { useRecoilValue } from "recoil";

import { useListFilter } from "../../../../api/hooks/useListFilter";
import { constituencyState } from "../../../../api/state/constituency";
import { useLegislaturePeriodStore } from "../../../../api/state/legislaturePeriod";
import {
  ParlamentIdentifier,
  parlaments,
} from "../../../../api/state/parlament";
import {
  ListType,
  ProceduresListQuery,
  useProceduresListQuery,
} from "../../../../__generated__/graphql";

export interface SegmentedData {
  title: string;
  data: ProceduresListQuery["procedures"];
}

interface UseProceduresListResult {
  procedures: ProceduresListQuery["procedures"];
  segmentedData: SegmentedData[];
  loading: boolean;
  isRetrying: boolean;
  remainingAttempts: number;
  error: ApolloError | undefined;
  hasMore: boolean;
  networkStatus?: number;
  nextRetryInSeconds: number | null;
  handleManualRefetch: () => Promise<ApolloQueryResult<ProceduresListQuery>>;
  handleRefresh: () => Promise<ApolloQueryResult<ProceduresListQuery>>;
  handleEndReached: () => Promise<void>;
}

const MAX_RETRY_ATTEMPTS = 5;
const BASE_RETRY_DELAY_MS = 1500;

export const useProceduresList = (list: ListType): UseProceduresListResult => {
  const { proceduresFilter } = useListFilter();
  const constituency = useRecoilValue(constituencyState);
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];

  const constituencies = useMemo(
    () => (constituency ? [constituency] : []),
    [constituency]
  );

  const queryVariables = useMemo(
    () => ({
      listTypes: [list],
      pageSize: 10,
      filter: proceduresFilter,
      constituencies,
      period: parlament?.period,
    }),
    [constituencies, list, parlament?.period, proceduresFilter]
  );

  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextRetryTimestampRef = useRef<number | null>(null);
  const latestQueryVariablesRef = useRef(queryVariables);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [isRetryScheduled, setIsRetryScheduled] = useState(false);
  const [retryCountdownMs, setRetryCountdownMs] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const clearRetryInterval = useCallback(() => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
  }, []);

  const clearRetryScheduling = useCallback(() => {
    clearRetryTimeout();
    clearRetryInterval();
    nextRetryTimestampRef.current = null;
    setRetryCountdownMs(null);
  }, [clearRetryInterval, clearRetryTimeout, setRetryCountdownMs]);

  const startRetryCountdown = useCallback(
    (delay: number) => {
      clearRetryInterval();
      nextRetryTimestampRef.current = Date.now() + delay;
      setRetryCountdownMs(delay);
      retryIntervalRef.current = setInterval(() => {
        if (!nextRetryTimestampRef.current) {
          setRetryCountdownMs(null);
          clearRetryInterval();
          return;
        }

        const remaining = nextRetryTimestampRef.current - Date.now();

        if (remaining <= 0) {
          setRetryCountdownMs(0);
          clearRetryInterval();
          return;
        }

        setRetryCountdownMs(remaining);
      }, 250);
    },
    [clearRetryInterval, setRetryCountdownMs]
  );

  const { loading, data, error, fetchMore, networkStatus, refetch } =
    useProceduresListQuery({
      fetchPolicy: "network-only",
      errorPolicy: "all",
      variables: queryVariables,
    });

  useEffect(() => {
    latestQueryVariablesRef.current = queryVariables;
  }, [queryVariables]);

  useEffect(() => {
    if (!loading && (error || !data)) {
      setIsRetryScheduled((prev) => {
        if (prev || retryAttempt >= MAX_RETRY_ATTEMPTS) {
          return prev;
        }
        clearRetryScheduling();
        const delay = BASE_RETRY_DELAY_MS * (retryAttempt + 1);
        startRetryCountdown(delay);
        retryTimeoutRef.current = setTimeout(() => {
          setIsRetryScheduled(false);
          clearRetryScheduling();
          setRetryAttempt((attempt) => attempt + 1);
          void refetch(latestQueryVariablesRef.current);
        }, delay);
        return true;
      });
    }
  }, [
    clearRetryScheduling,
    data,
    error,
    loading,
    refetch,
    retryAttempt,
    startRetryCountdown,
  ]);

  useEffect(() => {
    if (data) {
      if (retryAttempt !== 0) {
        setRetryAttempt(0);
      }
      if (isRetryScheduled) {
        setIsRetryScheduled(false);
      }
      clearRetryScheduling();
    }
  }, [clearRetryScheduling, data, isRetryScheduled, retryAttempt]);

  useEffect(() => () => clearRetryScheduling(), [clearRetryScheduling]);

  useEffect(() => {
    setHasMore(true);
    setRetryAttempt(0);
    setIsRetryScheduled(false);
    clearRetryScheduling();
  }, [
    clearRetryScheduling,
    constituencies,
    list,
    parlament?.period,
    proceduresFilter,
  ]);

  const handleManualRefetch = useCallback(() => {
    setRetryAttempt(0);
    setIsRetryScheduled(false);
    clearRetryScheduling();
    return refetch(latestQueryVariablesRef.current);
  }, [clearRetryScheduling, refetch]);

  const handleRefresh = useCallback(() => {
    setHasMore(true);
    return handleManualRefetch();
  }, [handleManualRefetch]);

  const handleEndReached = useCallback(() => {
    if (loading || !hasMore || !data) {
      return Promise.resolve();
    }

    return fetchMore({
      variables: {
        offset: data.procedures.length,
      },
    }).then(({ data: fetchMoreData }) => {
      if (!fetchMoreData || fetchMoreData.procedures.length === 0) {
        setHasMore(false);
      }
    });
  }, [data, fetchMore, hasMore, loading]);

  const segmentedData: SegmentedData[] = useMemo(() => {
    if (data && ListType.Top100 === list) {
      return [
        {
          title: "",
          data: data.procedures,
        },
      ];
    }

    if (!data) {
      return [];
    }

    return data.procedures.reduce<SegmentedData[]>((prev, procedure) => {
      const { voteWeek, voteYear } = procedure;
      const segment = voteWeek && voteYear ? `KW ${voteWeek}/${voteYear}` : "";
      const index = prev.findIndex(({ title }) => title === segment);

      if (index !== -1) {
        const next = [...prev];
        const existingSegment = prev[index];
        next[index] = {
          ...existingSegment,
          data: [...existingSegment.data, procedure],
        };
        return next;
      }

      return [
        ...prev,
        {
          title: segment,
          data: [procedure],
        },
      ];
    }, []);
  }, [data, list]);

  const isNotLoading = !loading;
  const hasErrorOrNoData = !!error || !data;
  const isRetryActive = isRetryScheduled || retryAttempt > 0;
  const hasRemainingAttempts = retryAttempt < MAX_RETRY_ATTEMPTS;
  const isRetrying =
    isNotLoading && hasErrorOrNoData && isRetryActive && hasRemainingAttempts;

  const remainingAttempts = Math.max(0, MAX_RETRY_ATTEMPTS - retryAttempt);
  const procedures = data?.procedures ?? [];
  const nextRetryInSeconds =
    retryCountdownMs !== null
      ? Math.max(0, Math.ceil(retryCountdownMs / 1000))
      : null;

  return {
    procedures,
    segmentedData,
    loading,
    isRetrying,
    remainingAttempts,
    error,
    hasMore,
    networkStatus,
    nextRetryInSeconds,
    handleManualRefetch,
    handleRefresh,
    handleEndReached,
  };
};
