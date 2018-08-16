import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigator } from "react-native-navigation";

import Description from "./Components/Description";
import Button from "./Components/Button";
import Folding from "../../components/Content/Folding";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 11,
    paddingHorizontal: 11
  }
})`
  background-color: #fff;
`;

const Logo = styled.Image.attrs({
  source: require("../../../assets/images/democracy.png")
})`
  align-self: center;
  margin-vertical: 11;
`;

class SmsVerification extends Component {
  static navigatorStyle = {
    // navBarHidden: true,
    orientation: "portrait"
  };

  constructor(props) {
    super(props);

    props.navigator.setTitle({
      title: "Verifizieren".toUpperCase() // the new title of the screen as appears in the nav bar
    });

    props.navigator.setButtons({
      leftButtons: [
        {
          title: "Abbrechen",
          id: "closeModal"
        }
      ]
    });
    props.navigator.addOnNavigatorEvent(event => {
      if (event.type) {
        // NavBar Events
        switch (event.id) {
          case "closeModal":
            props.navigator.dismissModal();
            break;

          default:
            break;
        }
      }
    });
  }

  state = {
    authCodeExpires: false
  };

  componentDidMount() {
    AsyncStorage.getItem("auth_code_expires").then(authCodeExpires => {
      if (new Date(authCodeExpires) > new Date()) {
        this.setState({ authCodeExpires });
      }
    });
  }

  render() {
    const { navigator, procedureId, onComplete } = this.props;
    const { authCodeExpires } = this.state;
    return (
      <ScrollView>
        <Logo />
        <Description
          text={`Selbst Abstimmen und Ergebnisse vergleichen kannst Du in DEMOCRACY nur mit einer verifizierten Handynummer.\n\nAktiviere die Verifizierung, indem du in zwei Schritten einen Zugangscode an Deine Handynummer anforderst.`}
        />
        <Folding
          title="Wofür braucht DEMOCRACY meine Handynummer?"
          text={`Ergebnisintegrität ist eine der zentralen Anforderungen eines Wahlverfahrens und bedeutet, dass genau die Stimmen gezählt werden, die von wahlberechtigten BürgerInnen abgegeben werden.\n
Da uns von DEMOCRACY Deutschland e.V. allerdings keine Wählerkartei vorliegt, haben wir uns dafür entschieden, das sogenannte Urnenbuchproblem heuristisch zu lösen und Deine deutsche Handynummer als Schlüsselidentifikator zu verwenden. Das Urnenbuchproblem beschäftigt sich mit der Frage, wer bei einer konkreten Wahl/Abstimmung berechtigt ist, seine Stimme abzugeben und führt die Berechtigten in eben diesem.

Auf diese Weise können wir weit belastere Ergebnisse erzeugen als über eine einfache E-Mail-Verifikation. Es gilt insofern, eine deutsche Handynummer – eine Stimme. 

Mehr Informationen zu diesem Verfahren kannst du hier einsehen.
          `}
        />
        <Folding
          title="Was passiert mit meiner Nummer nach der Verifikation?"
          text={`DEMOCRACY Deutschland e.V. übermittelt Dir nach der Eingabe und Bestätigung Deiner Handynummer einen Verfizierungscode per SMS. Dafür übergibt der Verein Deine Handynummer einmalig im Klartext an den deutschen SMS-Service-Provider SMSFlatrate (smsflatrate.net, Kloppe Media, Ansbacher Str. 85, 91541 Rothenburg). Der Verein speichert Deine Handynummer daraufhin lediglich einwegverschlüsselt in seiner Datenbank; eine weitere Verwendung dieser ist insofern ausgeschlossen.\n

Mehr Informationen zum verwendeten Verfahren kannst Du in unseren Nutzungsbedingungen einsehen.

Zu unserer Datenschutzbestimmung gelangst Du ferner hier.`}
        />
        {authCodeExpires && (
          <Button
            onPress={() =>
              navigator.push({
                screen: "democracy.SmsVerification.Code",
                backButtonTitle: "Zurück",
                passProps: {
                  procedureId,
                  onComplete
                }
              })
            }
            style={{ width: "100%", marginTop: 18 }}
            title="CODE EINGEBEN"
          />
        )}

        <Button
          onPress={() =>
            navigator.push({
              screen: "democracy.SmsVerification.PhoneNumber",
              backButtonTitle: "Zurück",
              passProps: {
                procedureId,
                onComplete
              }
            })
          }
          style={{
            width: "100%",
            marginTop: 18,
            backgroundColor: !authCodeExpires ? "#4494D3" : "#9AC5E7"
          }}
          title={`${authCodeExpires ? "NEU " : ""} VERIFIZIEREN`}
        />
      </ScrollView>
    );
  }
}

SmsVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  procedureId: PropTypes.oneOfType(PropTypes.string, PropTypes.bool),
  onComplete: PropTypes.func.isRequired
};

SmsVerification.defaultProps = {
  procedureId: false
};

export default SmsVerification;
