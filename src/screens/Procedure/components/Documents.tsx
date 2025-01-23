import React from 'react';
import styled from 'styled-components/native';
import { Procedure } from '../../../__generated__/graphql';
import { DocumentItem } from './DocumentItem';

const Wrapper = styled.View``;

interface Props {
  documents: Procedure['importantDocuments'];
}

const Documents: React.FC<Props> = ({ documents }) => (
  <Wrapper>
    {documents.map(doc => (
      <DocumentItem key={doc.number} {...doc} />
    ))}
  </Wrapper>
);

export default Documents;
