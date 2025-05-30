import React, { useEffect } from "react";
import styled from "styled-components/native";
import { SectionList } from "react-native";
import {
  SearchProceduresQuery,
  useFinishSearchMutation,
  useMostSearchedQuery,
  useSearchProceduresLazyQuery,
} from "../../__generated__/graphql";
import { useRecoilState, useRecoilValue } from "recoil";
import { ParlamentIdentifier, parlaments } from "../../api/state/parlament";
import { searchHistoryState, searchTermState } from "../../api/state/search";
import { Segment } from "../../components/Segment/index";
import { Row } from "../../components/Row";
import { ListItem } from "../../components/ListItem";
import { pieChartGovernmentData } from "../../lib/PieChartGovernmentData";
import { communityVoteData } from "../../lib/PieChartCommunityData";
import { AppLogo } from "../../components/AppLogo";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";
import { useRouter } from "expo-router";

const isProcedureGuard = (
  searchItem: string | Procedure
): searchItem is Procedure => {
  return typeof searchItem !== "string" && searchItem.procedureId !== undefined;
};

const ListText = styled.Text`
  font-size: 18px;
  color: grey;
  padding-left: 8px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: grey;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: "large",
}))``;

const LoadingWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 18px;
`;

const NoResultsWrapper = styled.View`
  flex: 1;
  padding-top: 18px;
  align-items: center;
`;

const NoResultsImage = styled(AppLogo).attrs({
  width: 160,
  height: 160,
  color: "#D8D8D8",
})`
  margin-top: ${({ theme }) => theme.spaces.default};
`;

type Procedure =
  SearchProceduresQuery["searchProceduresAutocomplete"]["procedures"][0];

interface SegmentData {
  title: string;
  data: (string | Procedure)[];
}

export const Results: React.FC = () => {
  const router = useRouter();
  const { legislaturePeriod } = useLegislaturePeriodStore();
  console.log("Results", { legislaturePeriod });
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const [executeFinishSearch] = useFinishSearchMutation();
  const [term, setTerm] = useRecoilState(searchTermState);
  const history = useRecoilValue(searchHistoryState);
  const { data: mostSearchedTerms, loading: loadingMostSearched } =
    useMostSearchedQuery();
  const [
    executeSearch,
    { data: searchData, loading: loadingSearchProcedures },
  ] = useSearchProceduresLazyQuery({
    variables: {
      term,
      period: parlament?.period,
    },
  });

  useEffect(() => {
    if (term.length > 0) {
      executeSearch();
      executeFinishSearch({
        variables: { term },
      });
    }
  }, [term, executeSearch, executeFinishSearch]);

  // TODO handle errors

  const loading =
    (loadingMostSearched && history.size === 0) || loadingSearchProcedures;

  const onItemClick =
    ({ item, section }: { item: string | Procedure; section: string }) =>
    () => {
      if (section === "Ergebnisse" && isProcedureGuard(item)) {
        router.push(`/procedure/${item.procedureId}`);
        // this.props.navigateTo({
        //   screen: 'democracy.Detail',
        //   title: 'Abstimmung'.toUpperCase(),
        //   passProps: { ...item },
        // });
      } else if (typeof item === "string") {
        setTerm(item);
        // this.props.addToSearchHistory({
        //   variables: {
        //     term: item,
        //   },
        // });
      }
    };

  const handleSearchResults = ({
    searchProceduresAutocomplete: { procedures, autocomplete },
  }: SearchProceduresQuery) => {
    return [
      { title: "Vorschläge", data: autocomplete },
      { title: "Ergebnisse", data: procedures },
    ];
  };

  let sectionData: SegmentData[] = [];
  if (!term) {
    sectionData = [
      {
        title: "Zuletzt gesucht",
        data: [...Array.from(history)],
      },
      {
        title: "Meistgesucht",
        data:
          mostSearchedTerms?.mostSearched.map(({ term: value }) => value) ?? [],
      },
    ];
  } else {
    sectionData = searchData ? handleSearchResults(searchData) : [];
  }

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator />
        </LoadingWrapper>
      )}
      {!loading && (
        <SectionList<string | Procedure, SegmentData>
          keyboardShouldPersistTaps={"always"}
          sections={sectionData}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length > 0 ? <Segment text={title} /> : null
          }
          renderItem={({ item, section: { title } }) => (
            <Row onPress={onItemClick({ item, section: title })}>
              <>
                {title === "Ergebnisse" && isProcedureGuard(item) && (
                  <ListItem
                    {...item}
                    voteDate={
                      item.voteDate ? new Date(item.voteDate) : undefined
                    }
                    subline={
                      item.sessionTOPHeading
                        ? item.sessionTOPHeading
                        : item.subjectGroups.join(", ")
                    }
                    votes={
                      item.communityVotes ? item.communityVotes.total || 0 : 0
                    }
                    govermentChart={{
                      votes: pieChartGovernmentData(item),
                      large: true,
                    }}
                    communityVotes={communityVoteData(item)}
                  />
                )}
                {title === "Zuletzt gesucht" && typeof item === "string" && (
                  <ListText>{item}</ListText>
                )}
                {title === "Vorschläge" && typeof item === "string" && (
                  <ListText>{item}</ListText>
                )}
                {title === "Meistgesucht" && typeof item === "string" && (
                  <ListText>{item}</ListText>
                )}
              </>
            </Row>
          )}
          keyExtractor={(item) => (!isProcedureGuard(item) ? item : item._id)}
          ListEmptyComponent={() => {
            if (term) {
              return (
                <NoResultsWrapper>
                  <Text>Leider nichts gefunden.</Text>
                  <NoResultsImage />
                </NoResultsWrapper>
              );
            }
            return null;
          }}
        />
      )}
    </>
  );
};
