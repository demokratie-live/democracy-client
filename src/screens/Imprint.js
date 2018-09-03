import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

import Config from '../config';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 30;
  padding-horizontal: 18;
`;

const Headline = styled.Text`
  font-weight: 600;
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 3;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 8;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
  text-align: center;
`;

const ContactIcons = styled(FontAwesome).attrs({
  size: 40,
  color: '#000000',
})``;

class Support extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    const menuIcon = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';

    Ionicons.getImageSource(menuIcon, 24, '#FFFFFF').then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: 'menu',
          },
        ],
      });
    });
  }

  linking = url => () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).catch(() => null);
      } else {
        Alert.alert(
          'Nicht unterstützt',
          'Diese Operation wird auf deinem Gerät zurzeit nicht unterstützt!',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }
    });
  };

  render() {
    const phoneNumber =
      Platform.OS === 'ios' ? `telprompt:${Config.PHONE_NUMBER}` : `tel:${Config.PHONE_NUMBER}`;
    const email = `mailto:${Config.CONTACT_EMAIL}`;
    const github = Config.GITHUB_URL;

    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;

    return (
      <ScrollWrapper>
        <Wrapper>
          <Headline>Angaben gemäß § 5 TMG</Headline>
          <Text>{`DEMOCRACY Deutschland e.V. (gemeinnützig)
Industriestraße 10
37079 Göttingen\n`}</Text>

          <Headline>Vertreten durch</Headline>
          <Text>{`Marius Krüger 
Andreas Krüger \n`}</Text>

          <Headline>Kontakt</Headline>
          <Text>{`Telefon: +49 176 470 40 213
E-Mail: contact@democracy-deutschland.de\n`}</Text>

          <Headline>Registereintrag</Headline>
          <Text>{`Eintragung im Vereinsregister. 
Registergericht: Amtsgericht Göttingen 
Registernummer: VR 201924\n`}</Text>

          <Headline>Umsatzsteuer</Headline>
          <Text>{`Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:

*Der gemeinnützige Verein DEMOCRACY Deutschland e.V. macht in seinem wirtschaftlichen Geschäftsbetrieb von der Kleinunternehmerregelung nach § 19 UStG Gebrauch und weist insofern die Umsatzsteuer nicht aus, weil er auch nicht zu deren Abführung verpllichtet ist.\n`}</Text>

          <Headline>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</Headline>
          <Text>{`Marius Krüger
Am Klausberge 12
37075 Göttingen\n`}</Text>

          <Headline>Streitschlichtung</Headline>
          <Text
          >{`Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.\n`}</Text>

          <Headline>Haftung für Inhalte</Headline>
          <Text
          >{`Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.\n`}</Text>

          <Headline>Haftung für Links</Headline>
          <Text
          >{`Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.

Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.\n`}</Text>

          <Headline>Urheberrecht</Headline>
          <Text
          >{`Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.

Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.\n`}</Text>

          {/**
    Datenschutz
 */}

          <Headline>1. Präambel – Vorwort</Headline>
          <Text
          >{`Der gemeinnützige Verein DEMOCRACY Deutschland e.V. treibt mit seiner gleichnamigen App DEMOCRACY die Entwicklung einer öffentlichen Beteiligungsinfrastruktur voran, die das Funktionieren einer lebendigen Demokratie begünstigen soll. Als Nutzer informiert Sie die App DEMOCRACY dafür über die aktuellen Bundestagsabstimmungen und ermöglicht Ihnen eine eigene direkte Abstimmung. Aus Sicht des DEMOCRACY Deutschland e.V. sind die dabei entstehenden Nutzerdaten keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Die Aufrechterhaltung des Abstimmungsgeheimnis ist insofern zentraler Bestandteil der DNA des DEMOCRACY Deutschland e.V. .Um mit DEMOCRACY die politische Einflussnahme der BürgerInnen dennoch nachhaltig zu verbessern, benötigen wir – der DEMOCRACY Deutschland e.V., Industriestr. 10, 37079 Göttingen, Betreiber der App "DEMOCRACY" – einige Ihrer Daten. Diese Richtlinie erklärt Ihnen insofern, welche Informationen wir wie sammeln und verwenden, auch um den gesetzlichen Anforderungen nachzukommen.

Wir vom DEMOCRACY Deutschland e.V. sind der Überzeugung, dass die Vermeidung (Konzept der Datenvermeidung) und der Schutz Ihrer Daten (Konzept des Datenschutzes) langfristig wichtig für Ihre Informationelle Selbstbestimmung sind – das heißt: Bei uns entscheidest Sie, welche Daten Sie preisgeben. Bitte nehmen Sie sich etwas Zeit für diese Datenschutzrichtlinie, bevor Sie unsere Webseite oder App benutzen.\n`}</Text>

          <Headline>2. Verantwortlich im Sinne der Datenschutzgesetze ist der:</Headline>
          <Text>{`DEMOCRACY Deutschland e.V.
Industriestr. 10
37079 Göttingen

Sollten Sie Fragen oder Anregungen zum Datenschutz haben, können Sie sich gerne auch per E-Mail an uns wenden. Die entsprechende E-Mail Adresse finden Sie im Impressum.\n`}</Text>

          <Headline>3. Gegenstand des Datenschutzes</Headline>
          <Text
          >{`Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Der Gegenstand des Datenschutzes sind personenbezogene Daten. Personenbezogene Daten sind Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Dazu können u.a. Name, Adresse, E-Mail-Adresse, Profil-Bilder, Telefonnummer, bestimmte Arten von Serverprotokollen von Browser, IP-Adresse gehören.

Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

Mit der Nutzung der DEMOCRACY-Website sowie der DEMOCRACY App stimmen Sie der Datenschutzrichtlinie zu. Andernfalls ist die Nutzung der DEMOCRACY-Dienste und der angebotenen Leistungen nicht gestattet.\n`}</Text>

          <Headline>4. Personenbezogene Daten</Headline>
          <Text
          >{`Wir empfangen und speichern jegliche Informationen, die Sie uns aktiv übermitteln. Um einige der von der Webseite und der App angebotenen Dienste anbieten zu können, müssen wir bestimmte personenbezogene Informationen erfassen. Personenbezogene Daten werden von uns grundsätzlich ausschließlich im Rahmen der gesetzlichen Erlaubnistatbestände der Art. 6 Abs. 1 lit. b) bzw. lit c) und lit. f) Datenschutzgrundverordnung („DSGVO“) verarbeitet. Soweit eine Verarbeitung nach den vorgenannten Erlaubnistatbeständen nicht zulässig wäre, DEMOCRACY die personenbezogenen Daten aber trotzdem verarbeiten möchte, so wird vor der Verarbeitung vom Betroffenen eine Einwilligung gemäß Art.6 Abs. 1 lit. a) iVm. Art. 7 DSGVO bzgl. der Verarbeitung eingeholt.\n`}</Text>

          <Headline>Speicherung</Headline>
          <Text
          >{`Personenbezogene Daten werden von uns nicht länger gespeichert, als für die Bereitstellung der Dienste auf der Website und/oder App notwendig. Soweit die Daten zur Erfüllung gesetzlicher Pflichten (z.B. gesetzliche Aufbewahrungspflichten nach § 147 AO) aufbewahrt werden müssen, bleiben die Daten bis zum Ende der Aufbewahrungspflicht gespeichert. Solche Daten werden gesperrt und werden für keine anderweitigen Zwecke genutzt.\n`}</Text>

          <Headline>Eingegebene Daten</Headline>
          <Text
          >{`Ohne Anmeldung können Sie die DEMOCRACY App nur eingeschränkt nutzen. Für den Anmeldeprozess müssen Sie Ihre E-Mail-Adresse und/oder Mobilfunknummer bereitstellen. Diese Daten werden von uns abgefragt, damit DEMOCRACY adäquat (d.h. mit identifizierter Nutzerbasis) funktionieren kann. Wir benötigen diese und gegebenenfalls auch andere Daten, um auf Deine Wünsche, Fragen und Verbesserungsvorschläge reagieren zu können. Mitteilungen zu anstehenden Veränderungen oder Verbesserungen der DEMOCRACY-Dienste übermitteln wir Ihnen gegebenenfalls unter Verwendung Ihrer E-Mail Adresse oder via Push-Notifications.\n`}</Text>

          <Headline>Kumulierte Speicherung der Abstimmungsdaten</Headline>
          <Text
          >{`Nach der Registrierung werden Ihre personenbezogenen Daten (Email, Mobilfunknummer, Hash der Device ID) in unserer Identitätsdatenbank i.S. eines Urnenbuchs gespeichert; Ihre konkreten Abstimmungsentscheidungen (Ja, Enthaltung, Nein) zu bestimmten Papieren werden von diesen personenbezogenen Identifikationsdaten strikt getrennt; eine Zusammenführung dieser Daten ist auch für uns nicht möglich. Praktisch bedeutet dies, dass eine Quittung ihrer Abstimmungsentscheidung lediglich lokal auf Ihrem Gerät verbleibt, während Ihre Stimme serverseitig nur akkumuliert gespeichert wird, indem in der prozedurspezifischen Voting-Tabelle (je nach Stimmverhalten) eine Stimme (in der Ja-Nein- bzw. Enthaltungsspalte) auf das vorherige Ergebnis addiert und in der prozedurspezifischen Voted-Tabelle ihre User-ID hinterlegt wird. Das vollständige Konzept zur Wahrung des Wahlgeheimnis können Sie hier einsehen: https://github.com/demokratie-live/democracy-development/wiki/Stimmanonymität. 
Sie können die DEMOCRACY App ferner off- wie online nutzen, wobei ein Großteil der Funktionalität nur im Online-Modus möglich ist.\n`}</Text>

          <Headline>Qualitätssicherung und Weiterentwicklung</Headline>
          <Text
          >{`Zur Qualitätssicherung und anforderungsgerechten Weiterentwicklung der DEMOCRACY App werden anonymisierte und kumulierte statistische Daten zum Nutzerverhalten (Anzahl der Upvotes, Abstimmungen, Zustimmungen, Enthaltungen, Ablehnungen) erfasst und statistisch ausgewertet. Ein Rückschluss von diesen anonymen Daten auf natürliche Personen ist für uns nicht möglich.\n`}</Text>

          <Headline>Server Log Files</Headline>
          <Text
          >{`Wenn Sie die DEMOCRACY-Website nutzen, speichert der Provider der Seite/n automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:

Browsertyp und Browserversion
verwendetes Betriebssystem
Referrer URL
Hostname des zugreifenden Rechners
Uhrzeit der Serveranfrage
Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.\n`}</Text>

          <Headline>5. Newsletter</Headline>
          <Text
          >{`Nach Registrierung und Anmeldung bei DEMOCRACY können wir Ihnen von Zeit zu Zeit auch Informationen über unsere Dienstleistungen, u.a. auch "klassisch" per E-Mail senden. Dies werden wir jedoch nur tun, wenn Sie hierzu ausdrücklich zustimmen oder Sie ein registrierter Nutzer von DEMOCRACY sind und wir Sie über ähnliche Produkte, Dienstleistungen oder Services informieren, wie diejenigen, die Sie zuvor bei uns bezogen oder verwendet haben. In jedem Fall gilt jedoch, dass Sie E-Mails einfach über die "Abbestellen-" bzw. "Unsubscribe-" Funktion bzw. Button am Ende jeder E-Mail abbestellen können, wenn Sie keine E-Mails mehr von uns bekommen möchten.\n`}</Text>

          <Headline>6. Kontakt-/ Mithelfen-Formular</Headline>
          <Text
          >{`Wenn Sie uns per Kontakt-/ Mithelfenformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n`}</Text>

          <Headline>7. Einsatz von „Cookies“</Headline>
          <Text
          >{`Die DEMOCRACY-Dienste verwenden „Cookies“, um die Benutzerfreundlichkeit (z.B. beim Anmelden) zu erhöhen. Cookies sind Textdateien, die vom Webserver an Ihren Browser oder die DEMOCRACY App gesandt und dort für einen späteren Abruf gespeichert werden, u.a. um ein erneutes Einloggen zu Vereinfachen. In unseren eigenen Cookies werden keinerlei personenbezogene Daten gespeichert. Sie können die Verwendung von „Cookies“ generell verhindern, wenn Sie in Ihrem Browser die Speicherung von Cookies untersagen. Bitte beachten Sie, dass die Funktionsfähigkeit und der Umfang unseres Angebots dadurch eingeschränkt sein kann.\n`}</Text>

          <Headline>Verwendung von Cookies</Headline>
          <Text
          >{`Sie können Cookies und Zähl-Pixel über Ihre Browser-Einstellungen und andere Werkzeuge beobachten. Wenn Sie die Benutzung unserer Services mit Ihrem Computer oder mobilen Gerät fortsetzt, stimmen Sie dadurch unserer Verwendung von Cookies und Zähl-Pixeln in Übereinstimmung mit dieser Datenschutzerklärung zu. Wir verwenden folgende Arten von Cookies:

Notwendige Cookies
Analytische Cookies
Funktionale Cookies
Notwendige Cookies werden von uns benötigt, damit unsere Website oder App funktionieren kann. Das sind z.B. Cookies die notwendig sind, um Sie in sichere Bereiche unserer Website oder App einzuloggen.

Analytische Cookies helfen uns dabei, zu analysieren wie viele Besucher unsere Website oder App hat und welche Seiten oder Bereiche von den Nutzern aufgerufen werden.

Funktionale Cookies werden verwendet, um Sie bei ihrem nächsten Besuch auf der Website bzw. Nutzung der App wiederzuerkennen. Damit wird es uns ermöglicht, bestimmte Einstellungen (z.B. Spracheinstellungen) zu speichern.\n`}</Text>

          <Headline>8. Nutzung von GoogleAnalytics</Headline>
          <Text
          >{`Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf deinem Computer oder Mobiltelefon gespeichert werden und die eine Analyse deiner Benutzung von DEMOCRACY ermöglichen. Die durch den Cookie erzeugten Informationen über deine Benutzung von DEMOCRACY (einschließlich deiner verkürzten IP-Adresse) werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um deine Nutzung von DEMOCRACY auszuwerten, um Reports über die Aktivitäten zusammenzustellen und um weitere mit deiner Nutzung und deiner Internetnutzung verbundene Dienstleistungen zu erbringen.

Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten.

Du kannst die Speicherung der Cookies durch eine entsprechende Einstellung deiner Browser-Software verhindern; wir weisen dich jedoch darauf hin, dass du in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich wirst nutzen können. 

Du kannst darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung von DEMOCRACY bezogenen Daten (inkl. deiner IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem du das unter dem folgenden Link verfügbare Browser-Plugin herunterlädst und installierst.

Durch die Nutzung von DEMOCRACY erklärst du dich mit der Verarbeitung der über dich erhobenen Daten durch Google in der zuvor beschriebenen Art und zu dem zuvor benannten Zweck einverstanden.\n`}</Text>

          <Headline>9. SSL-Verschlüsselung</Headline>
          <Text
          >{`Die DEMOCRACY-Dienste nutzen aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.

Wenn die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nur unter hohem Aufwand von Dritten mitgelesen werden.\n`}</Text>

          <Headline>10. Recht auf Auskunft, Berichtigung, Löschung und Beschwerde</Headline>
          <Text
          >{`Wenn Sie Ihren Account löschen, werden alle personenbezogenen Daten, mit Ausnahme ihrer nicht zurückverfolgbaren anonymisierten Abstimmungsdaten, von unserem Server gelöscht. Soweit Daten aus gesetzlichen Gründen aufbewahrt werden müssen, werden diese gesperrt. Die Daten stehen weiteren Verwendungs-Schritten sogleich nicht mehr zur Verfügung.

Sie sind berechtigt, der Verwendung Ihrer personenbezogenen Daten zu Werbezwecken jederzeit zu widersprechen. Wenn Sie sich entscheiden, Ihre Einwilligung in diese Datenschutzbestimmung zu widerrufen, so können Sie ein schriftliches Ansuchen an DEMOCRACY Deutschland e.V. richten. Die Anschrift finden sie im Impressum. Mit dem Widerruf sind wir allerdings nicht mehr in der Lage, Ihnen den Zugriff auf alle DEMOCRACY-Dienste zu ermöglichen. 

Sie können eine Kopie der personenbezogenen Daten, die bei uns über Sie gespeichert sind, verlangen und die Herkunft und etwaige Empfänger hiervon sowie den Zweck etwaiger erfolgter Datenbearbeitung von uns erfahren. Für weitere Informationen wenden Sie sich bitte an uns. Die Anschrift finden Sie im Impressum. Möglicherweise werden Sie aufgefordert, weitere Nachweise bezüglich Ihrer Identität vorzulegen (z. B. Kopie der letzten Mobilfunkrechnung), bevor Sie eine Antwort erhalten, damit Ihre Identität überprüft werden kann.

Wenn Sie uns personenbezogene Daten überlassen haben, können Sie diese jederzeit berichtigen, sperren oder löschen lassen. Daten für etwaige Abrechnungs- und buchhalterische Zwecke sind von einer Kündigung beziehungsweise von einer Löschung nicht berührt. Wende Sie sich dazu bitte per E-Mail oder per Post an uns. Die Anschrift finden Sie im Impressum.

Werden Ihre personenbezogenen Daten im Rahmen einer Interessenabwägung nach Art. 6 Abs. 1 lit. f) DSGVO verarbeitet, so steht Ihnen ebenfalls ein Widerspruchsrecht gegen die Verarbeitung zu. In diesem Fall können wir Ihre personenbezogenen Daten trotz Ihres Widerspruchs in solchen Fällen weiterhin verarbeiten, wenn wir nachweisen können, dass die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient, oder wir zwingend schutzwürdige Gründe für die Verarbeitung anführen können, die Ihren Interessen, Rechten und Freiheiten überwiegen.\n`}</Text>

          <Headline>Datenformat</Headline>
          <Text
          >{`Sie sind berechtigt, Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und Sie haben das Recht, diese Daten einem anderen Verantwortlichen zu übermitteln, sofern die Verarbeitung Ihrer personenbezogenen Daten auf einer Einwilligung gemäß der Art. 6 Abs. 1 lit. a) DSGVO oder auf einem Vertrag gem. Art. 6 Abs. 1 lit. b) DSGVO beruht.

Auch können Sie verlangen, dass wir Ihre Daten bei uns an einen anderen Verantwortlichen übermitteln. 

Bitte wenden Sie sich diesbezüglich an die im Impressum angegebene Adresse:\n`}</Text>

          <Headline>Beschwerde</Headline>
          <Text
          >{`Wenn Sie der Ansicht sein sollten, dass die Verarbeitung Ihrer personenbezogenen Daten durch uns gegen Datenschutzgesetze verstößt, können Sie sich mit Bedenken auch an die zuständige Datenschutzaufsichtsbehörde wenden.\n`}</Text>

          <Headline>11. Änderung dieser Datenschutzerklärung</Headline>
          <Text
          >{`Wir behalten es uns vor, diese Datenschutzerklärung notwendigen Änderungen zu unterziehen. Die aktuelle Fassung der Datenschutzerklärung kannst Du stets unter https://www.democracy-deutschland.de/#!datenschutz abrufen. Wir werden Sie hierüber informieren.\n`}</Text>

          <Version>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Support;
