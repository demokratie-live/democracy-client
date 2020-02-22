import React from 'react';
import { DocumentItem } from './DocumentItem';
import { Procedure_procedure_importantDocuments } from '../graphql/query/__generated__/Procedure';
import { styled } from '../../../../styles';

const Wrapper = styled.View``;

interface Props {
  documents: Procedure_procedure_importantDocuments[]; // TODO Fix type
}

const Documents: React.FC<Props> = ({ documents }) => (
  <Wrapper>
    {documents.map(doc => (
      <DocumentItem key={doc.number} {...doc} />
    ))}
  </Wrapper>
);

export default Documents;
