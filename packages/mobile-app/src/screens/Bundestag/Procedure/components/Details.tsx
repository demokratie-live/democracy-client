import React from 'react';
import m from 'moment';
import { View } from 'react-native';
import { styled } from '../../../../styles';

const Wrapper = styled.View`
  padding-horizontal: 11;
`;

const Head = styled.View`
  flex-direction: row;
`;

const HeadLeft = styled.View`
  flex: 1;
`;

const HeadRight = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HeadRightTitle = styled.View`
  flex: 1;
`;

const HeadRightDescr = styled.View`
  padding-left: 8;
`;

const DefTitle = styled.Text`
  font-size: 14;
  color: rgba(68, 148, 211, 0.9);
`;

const DefTitleSeperated = styled(DefTitle)`
  padding-top: ${({ theme }) => theme.distances.secondary};
`;

const DefTitleRight = styled(DefTitle)`
  text-align: right;
`;

const DefDescr = styled.Text`
  font-size: 14;
  color: ${({ theme }) => theme.textColors.secondary};
`;

const Content = styled.View`
  padding-top: 11;
`;

const ContentText = styled(DefDescr)`
  font-size: 14;
  color: ${({ theme }) => theme.textColors.tertiary};
`;

const renderType = (type: string) => {
  switch (type) {
    case 'Gesetzgebung':
      return 'Gesetz';
    default:
      return type;
  }
};

interface Props {
  subjectGroups: string[] | null;
  submissionDate: string;
  dateVote: string;
  abstract: string | null;
  procedureId: string;
  currentStatus: string | null;
  type: string | null;
}

export const Details: React.FC<Props> = ({
  subjectGroups,
  submissionDate,
  dateVote,
  abstract,
  procedureId,
  currentStatus,
  type,
}) => {
  return (
    <Wrapper>
      <Head>
        {subjectGroups && subjectGroups.length > 0 && (
          <HeadLeft>
            <DefTitle>Sachgebiete</DefTitle>
            <DefDescr>{subjectGroups.join('\n')}</DefDescr>
          </HeadLeft>
        )}
        <HeadRight>
          <HeadRightTitle>
            <DefTitleRight>Typ</DefTitleRight>
            <DefTitleRight>Vorgang</DefTitleRight>
            <DefTitleRight>erstellt am</DefTitleRight>

            {dateVote && <DefTitleRight>Abstimmung</DefTitleRight>}
          </HeadRightTitle>
          <HeadRightDescr>
            {type && <DefDescr>{renderType(type)}</DefDescr>}
            <DefDescr selectable={true}>{procedureId}</DefDescr>
            <DefDescr>
              {submissionDate && m(submissionDate).format('DD.MM.YY')}
            </DefDescr>
            {dateVote && <DefDescr>{m(dateVote).format('DD.MM.YY')}</DefDescr>}
          </HeadRightDescr>
        </HeadRight>
      </Head>

      <DefTitleSeperated>Aktueller Stand</DefTitleSeperated>
      <DefDescr>{currentStatus}</DefDescr>
      <Content>
        {abstract && (
          <View>
            <DefTitle>Inhalt</DefTitle>
            <ContentText selectable={true}>{abstract}</ContentText>
          </View>
        )}
      </Content>
    </Wrapper>
  );
};

export default Details;
