import React, { Component } from "react";
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

  componentDidMount() {
    this.props.navigator.setTitle({
      title: "Verifizieren".toUpperCase() // the new title of the screen as appears in the nav bar
    });
  }

  render() {
    const { navigator } = this.props;
    return (
      <ScrollView>
        <Logo />
        <Description
          text={`Selbst Abstimmen und Ergebnisse vergleichen kannst Du in DEMOCRACY nur mit einer verifizierten Handynummer.\n\nAktiviere die Verifizierung, indem du in zwei Schritten einen Zugangscode an Deine Handynummer anforderst.`}
        />
        <Folding
          title="Wofür braucht DEMOCRACY meine Handynummer?"
          text={`Ergebnisintegrität bedeutet, dass genau die Stimmen gezählt werden, die von wahlberechtigten BürgerInnen abgegeben werden.\n
Da uns von DEMOCRACY Deutschland e.V. allerdings keine Wählerkartei vorliegt, haben wir uns dafür entschieden, dass Urnenbuchproblem heuristisch zu lösen und Deine deutsche Handynummer als Schlüsselidentifikator zu verwenden. 

Auf diese Weise können wir weit belastere Ergebnisse erzeugen als über eine einfache E-Mail-Verifikation. Alle Vor- und Nachteile dieses Verfahrens kannst du hier einsehen.`}
        />
        <Folding
          title="Was passiert mit meiner Nummer nach der Verifikation?"
          text={`DEMOCRACY Deutschland e.V. übermittelt Deine Handynummer…\n

Mehr Informationen zum verwendeten Verfahren kannst Du hier einsehen. Zu unserer Datenschutzbestimmung gelangst Du ferner hier. `}
        />

        <Button
          onPress={() =>
            navigator.push({
              screen: "democracy.SmsVerification.PhoneNumber",
              backButtonTitle: "Zurück"
            })
          }
          style={{ width: "100%", marginTop: 18 }}
          title="VERIFIZIEREN"
        />

        {/* <PhonenumberInput /> */}
        {/* <Button text="CODE ANFORDERN" onPress={() => {}} /> */}
        {/* <Button
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#F0F0F0"
          }}
          textStyle={{ color: "#000" }}
          text="Warum mit der Handynummer registrieren?"
          onPress={() => {}}
        /> */}
      </ScrollView>
    );
  }
}

SmsVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default SmsVerification;
