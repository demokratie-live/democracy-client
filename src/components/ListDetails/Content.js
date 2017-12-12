import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <Wrapper>
    <Text>
      § 203 des Strafgesetzbuches (StGB) stellt den Schutz von Geheimnissen vor unbefugter
      Offenbarung sicher, die Angehörigen bestimmter Berufsgruppen (zum Beispiel Ärzte,
      Rechtsanwälte, Steuerberater oder Wirtschaftsprüfer) im Rahmen ihrer beruflichen Tätigkeit
      anvertraut werden. Insbesondere die Digitalisierung hat es in den letzten Jahrzehnten möglich
      und erforderlich gemacht, in weiterem Umfang als bisher anfallende Unterstützungstätigkeiten
      nicht durch eigenes Personal erledigen zu lassen, sondern durch darauf spezialisierte
      Unternehmen oder selbständig tätige Personen. Hierzu gehören beispielsweise auch die
      Einrichtung, der Betrieb, die Wartung und die Anpassung informationstechnischer Anlagen. Die
      Heranziehung dritter, außerhalb der eigenen Sphäre stehender Personen zu diesen
      unterstützenden Tätigkeiten ist für Berufsgeheimnisträger aber nicht ohne rechtliches Risiko,
      sofern diese Personen damit von geschützten Geheimnissen Kenntnis erlangen können. Der Entwurf
      sieht daher eine Einschränkung der Strafbarkeit nach § 203 StGB vor. Ausdrücklich nicht der
      Strafbarkeit unterfallen soll zukünftig das Offenbaren von geschützten Geheimnissen gegenüber
      Personen, die an der beruflichen oder dienstlichen Tätigkeit des Berufsgeheimnisträgers
      mitwirken, soweit dies für die ordnungsgemäße Durchführung der Tätigkeit der mitwirkenden
      Personen erforderlich ist. Im Gegenzug sollen diese mitwirkendenden Personen in die
      Strafbarkeit nach § 203 StGB einbezogen werden. Darüber hinaus werden für
      Berufsgeheimnisträger strafbewehrte Sorgfaltspflichten normiert, die bei der Einbeziehung
      dritter Personen in die Berufsausübung zu beachten sind.
    </Text>
  </Wrapper>
);
