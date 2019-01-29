import React, { Component } from 'react';
import { AsyncStorage, Linking, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Navigator } from 'react-native-navigation';

import Description from './Components/Description';
import Button from '../../components/Button';
import Folding from '../../components/Content/Folding';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 11,
    paddingHorizontal: 11,
  },
}))`
  background-color: #fff;
`;

const Logo = styled.Image.attrs(() => ({
  source: require('../../../assets/images/democracy.png'),
}))`
  align-self: center;
  margin-vertical: 11;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
`;

const TextLink = styled.Text`
  font-size: 15;
  padding-bottom: 8;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

class SmsVerification extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    orientation: 'portrait',
  };

  constructor(props) {
    super(props);

    props.navigator.setTitle({
      title: 'Verifizieren'.toUpperCase(), // the new title of the screen as appears in the nav bar
    });

    props.navigator.setButtons({
      leftButtons: [
        {
          title: 'Abbrechen',
          id: 'closeModal',
        },
      ],
    });
    props.navigator.addOnNavigatorEvent(event => {
      if (event.type) {
        // NavBar Events
        switch (event.id) {
          case 'closeModal':
            props.navigator.dismissAllModals();
            break;

          default:
            break;
        }
      }
    });
  }

  state = {
    authCodeExpires: false,
  };

  componentDidMount() {
    AsyncStorage.getItem('auth_code_expires').then(authCodeExpires => {
      if (new Date(authCodeExpires) > new Date()) {
        this.setState({ authCodeExpires });
      }
    });
  }

  render() {
    const { navigator, procedureId, onComplete } = this.props;
    const { authCodeExpires } = this.state;
    const linking = url => () => {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url).catch(() => null);
        } else {
          Alert.alert(
            'Nicht unterstützt',
            'Diese Operation wird auf Deinem Gerät zurzeit nicht unterstützt!',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }
      });
    };
    return (
      <ScrollView>
        <Logo />
        <Description
          text={`Selbst Abstimmen und Ergebnisse vergleichen kannst Du in DEMOCRACY nur mit einer verifizierten Handynummer.\n\nAktiviere die Verifizierung, indem Du in zwei Schritten einen Zugangscode an Deine Handynummer anforderst.`}
        />
        <Folding
          title="Wofür braucht DEMOCRACY meine Handynummer?"
          text={
            <Text>
              <Text>
                {`Ergebnisintegrität ist eine der zentralen Anforderungen eines Wahlverfahrens und bedeutet, dass genau die Stimmen gezählt werden, die von wahlberechtigten BürgerInnen abgegeben werden.\n
Da uns von DEMOCRACY Deutschland e.V. allerdings keine Wählerkartei vorliegt, haben wir uns dafür entschieden, das sogenannte Urnenbuchproblem heuristisch zu lösen und Deine deutsche Handynummer als Schlüsselidentifikator zu verwenden. Das Urnenbuchproblem beschäftigt sich mit der Frage, wer bei einer konkreten Wahl/Abstimmung berechtigt ist, seine Stimme abzugeben und führt die Berechtigten in eben diesem.

Auf diese Weise können wir weit belastbare Ergebnisse erzeugen als über eine einfache E-Mail-Verifikation. Es gilt insofern, eine deutsche Handynummer – eine Stimme. 

Mehr Informationen zu diesem Verfahren kannst du `}
              </Text>
              <TextLink
                onPress={linking(
                  'https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymit%C3%A4t',
                )}
              >
                hier
              </TextLink>
              <Text> einsehen.</Text>
            </Text>
          }
        />
        <Folding
          title="Was passiert mit meiner Nummer nach der Verifikation?"
          text={
            <Text>
              <Text>
                {`DEMOCRACY Deutschland e.V. übermittelt Dir nach der Eingabe und Bestätigung Deiner Handynummer einen Verfizierungscode per SMS. Dafür übergibt der Verein Deine Handynummer einmalig im Klartext an den deutschen SMS-Service-Provider SMSFlatrate (smsflatrate.net, Kloppe Media, Ansbacher Str. 85, 91541 Rothenburg). Der Verein speichert Deine Handynummer daraufhin lediglich einwegverschlüsselt in seiner Datenbank; eine weitere Verwendung dieser ist insofern ausgeschlossen.\n

Mehr Informationen zum verwendeten Verfahren kannst Du in unseren `}
              </Text>
              <TextLink
                onPress={linking('https://www.democracy-deutschland.de/#!nutzungsbedingungen')}
              >
                Nutzungsbedingungen
              </TextLink>
              <Text>
                {` einsehen.

Zu unserer `}
              </Text>
              <TextLink onPress={linking('https://www.democracy-deutschland.de/#!datenschutz')}>
                Datenschutzbestimmung
              </TextLink>
              <Text> gelangst Du ferner hier.</Text>
            </Text>
          }
        />
        {authCodeExpires && (
          <Button
            onPress={() =>
              navigator.push({
                screen: 'democracy.SmsVerification.Code',
                backButtonTitle: 'Zurück',
                passProps: {
                  procedureId,
                  onComplete,
                },
              })
            }
            style={{ width: '100%', marginTop: 18 }}
            title="CODE EINGEBEN"
          />
        )}

        <Button
          onPress={() =>
            navigator.push({
              screen: 'democracy.SmsVerification.PhoneNumber',
              backButtonTitle: 'Zurück',
              passProps: {
                procedureId,
                onComplete,
              },
            })
          }
          style={{
            width: '100%',
            marginTop: 18,
            backgroundColor: !authCodeExpires ? '#4494D3' : '#9AC5E7',
          }}
          title={`${authCodeExpires ? 'NEU ' : ''} VERIFIZIEREN`}
        />
      </ScrollView>
    );
  }
}

SmsVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  procedureId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onComplete: PropTypes.func,
};

SmsVerification.defaultProps = {
  procedureId: false,
  onComplete: () => {},
};

export default SmsVerification;
