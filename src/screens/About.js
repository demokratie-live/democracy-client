/* eslint-disable no-irregular-whitespace */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  padding-horizontal: 18;
  padding-vertical: 18;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image.attrs({
  source: require('../../assets/images/logo-text10X.png'),
})`
  margin-bottom: 18;
`;

const Text = styled.Text`
  color: #8f8e94;
  padding-top: 11;
  width: 100%;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
`;

const names = `A. Bening
Achim Scheimer
Albert Hött
Alexander Klar
Aljoscha Waterstradt
Andre Mai
Andre Moser
André Pitz
Andre Schünke 
Andrea Buchelt
Andrea Guse
Andreas Appenheimer
Andreas Haslauer
Andreas Krüger
Andreas Lauter
Andreas Lederwascher
Andreas Müller
Andreas Nohl
Andreas Scharrer
Anette Büchold
Anja Günther
Anja Mayer
Anna Felicia Gysin
Anna Himmelhuber
Anna Wolf
Anne Dietrich
Anne Scheel
Annette Kraus
Anni Hoyer
Anton Doll
Artur Achramov
Axel Riebesehl
B. Doberstein
Bastian Rosenthal
Beatrix Wuntke
Benjamin Dieckmann
Bernhard Sibum
Bernhard Stock
Bettina Becker
Bettina Hildenbrand
Bettina von Reden
Bilbo Calvez
Björn Kunter
Björn Pollex
Björn Tappe
Bodo Bock
Bodo Schulze
Boris Luttersmit
Branko Kuchar
Burkhard Ringlein
Carolin Mey
Carsten Brier
Carsten waldschmidt
Chahir Etayaa
Christian Frster
Christian Heigele
Christian Heller
Christian Jung
Christian Luz
Christian Maaß
Christian Neubarth
Christian Oddoy
Christian Vatter
Christine Slotty
Christoph Stoppe
Christopher Bhm
Christopher Bluhm
Christopher Engelmann
Claudia Dopp
Claudia Dr. Kaiser
Claudia Frey
Claudia Ruthner
Claus Dierksmeier
Clemens Römer
Constanze Wolter
Daniel Barski
Daniel Kohtes
Daniel Schwering
Danny Hügelheim
David Kleuker
David Kopp
David Völker
Deborah Sillmann
Dejan Mihajlovic
Delia Tönjes
Dennis Hack
Dennis Sauerland
Dennis Witzig
Diana Aman
Dieter Schenk
Dietmar Hamann
Dietmar Pohland
Dirk Henkel
Dominik Schäfer
Doris Junker
Doris Kupke
Dorothee Vogt
Dr. Beate Nasemann
Dr. Martin Katz
Dr. Michael Koellisch
Dr. Ruben Schattevoy
Eckart Kühne
Edgar Holzmannstetter
Edgar Krenz
Edgar Renje
Eduard Paul
Elisabeth Kaiser
Elke Lies
Enno Geerken
Erik Lichtenstein
Erik Na
Erik Troschtz
Erika Drotleff
Erika Körner
Ernst Oppermann
Eva Jahnen
Eva Kettel
Eva-Maria Gent
Eva-Rose Alter
Evelyn Kuttig
Evgeni Trautwein
Ewald Arnold
Fabian Hanneforth
Falk Atmanspacher
Felix Gaiser
Felix Koukal
Felix Rembold
Felix Schnarr
Florian Engelhardt
Florian Kauer
Florian Schne
Florian Sulies
Frank Braungardt
Frank Grnler
Frank Kriester
Frank Schuster
Frank Zeitschel
Franz Josef Haid
Gbor Dukai
Gemeinnützige Hertie-Stiftung
Georg Wortberg
Georg-Friedrich Randel
Gerhart Thallmayer
Gregor Hemsing
Günter Bethge
Gunter Letsch
Günter Thies
Hans Lauterwald
Hans Scharpf
Harald Dost
Hardy Groeneveld
Heiko Held
Heiko Stachel
Heiko Weidenmller
Heimo Rauter
Heiner Brassart
Helwig Fenner
Henning Kurth
Henrik Heßlau
Holger Braß
Horst Schottky
Ingo Schmidt
Ingo Weidelt
Ingrid Kuhlmann
Ingrid Linden
Irina Macat
Iris Knings
Jacinta Fehn
Jan Altnickel
Jan Billert
Jan Philipp Fründ
Jan Schmidt
Jan-Jonathan Topf
Jana Hirsch
Jana Wolff
Jasmin Schreiber
Jasmin Wieland
Jenna Klupsch
Jennifer Gries
Jens Mazollek
Jense Bluemchen
Jirka Munzert
Joachim Rees
Joachim Wolff
Johann Koenitz
Johanna Hartmann
Johannes Geiler
Jon Bec
Jonas Arndt
Jonas Darley
Jonas Schindler
Jonathan Schwabe
Jörg Fischer
Jörg Hampel
Jörg Holle
Judith Schmidt
Julia Droppelmann
Julia Suciu
Julian Nöthlings
Julius Lipp
Jürgen Ertelt
Jürgen Intveen
Jürgen Reuter
Jürgen Wehlburg
Jutta Paul
Kai Nierhaus
Karen Strutz
Karin Frey
Karin Schmidt
Karsten Dietrich
Katharina Heyme
Kathrin Eulitz
Katja Knoch
Katja Nitschke
Katrin Hering
Kay Knopp
Kerstin Mller
Klaus Lück
Klaus Zinser
Klaus-Dieter Beckmann
Konrad Meier
Kornelia Friedenhagen
Lars Dehlwes
Laura Eisfeld
Lea Langrock
Leo Buchholz
Lilo Weiler
Lisa Dunzik
Lisa Hieronymus
Liselotte H.
Lorenz Rosenthal
Luisa Kaiser
Lukas Kaus
Lukas Zahorka
Lutz Baumann
Madeleine Dewald
Maggi Katterloher
Magnus Rembold
Maik Scheidler
Malte Klingauf
Manja Urner
Manuel Ruck
Marc Hofrichter
Marc Scholz
Marcel Merle
Marcel Pudell
Marcel Riese
Marco Heinrich
Marco Patriarca
Marcus Sigismund
Mari Koffend
Maria Kühne
Mario Polenz
Marion Dodier
Marion Schneider
Marius Krüger
Marius Schäfer
Marius Schfer
Marius Schreiber
Marko Seeg
Markus Andres
Markus Richter
Markus Schaller
Markus Stach
Markus Terhorst
Marten Schulze
Martin Bender
Martin Kieren
Martin Möller
Mathias Hartinger
Mathias Noack
Mathias Tholey
Mathias Wendeler
Matthias Fritsch
Matthias Glckner
Matthias Liesenhoff
Matthias Makait
Matthias Wilhelmi
Mattis Kögler
Maxime Schubert
Maximilian Schlögell
Maxx Heilscher
Melanie Hentsch
Melanie Opfer
Merlin Ahnen-Klan
Michael Bär
Michael Dieringer
Michael Große
Michael Kampe
Michael Seger
Michael Stief
Michael Switka
Michaela Zimmermann
Mike Gerstner
Miriam Rateike
Mirjam Kauderer
Monika Müller-Rieger
Moritz Grümer
Moritz Schäfer
Nadja Wilker
Ngoc Nguyen
Nico Christiansen
Nicolas Juglaret
Nicolas Neuss
Nicole Dbner
Nils Richter
Nils Tiemann
Nuno M. Buljubasic
Ole Albers
Oliver Beck
Oliver Hess
Oliver Schellhammer
Patrice Brenner
Patricia Ackermann
Patrick Alexander
Paul Zahn
Paula Visuti
Petar Bukovala
Peter Ackermann
Peter Christ
Peter Danzeisen
Peter Goebel
Peter Moers
Peter Rackl
Peter Weber
Petra Al Damrawy
Petra Kustermann
Phil Steiner
Philipp Greve
Philipp Steigenberger
Philipp Tost
Pia Huber
Pirmin Braun
Prisca Schmid
Rainer Reichling
Ralf Milling
Ralf Philipp
Ralph Feltens
Randolf Geist
Regina Walter
Reinhard Allenberg
Reinhard Stollreiter
Ren Mandelkow
Rena Bachmann
Rene Fischer
Richard Von Knoblauch
Robert Hipfinger
Robert Kleene
Robert Schäfer
Robert Schfer
Robert Schreiner
Roland Otto
Rosa Lynn Grave
Rüdiger Kmmer
Rudolf Haus
Sabine Brunckhorst
Sarah Hündgen
Sascha Brendel
Sascha Eschmann
Sebastian Brandt
Sebastian Brunn
Sebastian Bucher
Sebastian Kahl
Sebastian Kramer
Sebastian Prüfer
Sebastian Schöffel
Sebastian Stein
Siamak Golparvar
Siegfried Huber
Silke Hohnbaum
Simon Kirschner
Simone Ganz
Slava Wolf
Spatzenzunge aus Berlin
Stefan Beck
Stefan Heinze
Stefan Irkens
Stefan Kreft
Stefan Lux
Stefan Schulz-Gnther
Stefan Seibert
Stefan Winkelmann
Stefanie Burfeind
Stephan Korn
Stephan Scholz
Stephan Weissgerber
Stephanie Burck
Susann Klameth
Sven Bendig
Sven Fischer
T Rullesand
Tanja Mally
Tessa Krumpf
Thoams Gnther
Thomas Dikau
Thomas Hardt
Thomas Hoch
Thomas Kraue
Thomas Lindemann
Thomas Nayda
Thomas Ormond
Thomas Pertl
Thomas Werner
Thomas Wolff
Thorsten Biegner
Thorsten Nespethal
Till Koch
Tilo Bttner
Tim Bansemer
Timo Burmeister
Tobias Freund
Tobias Schrmann
Tobias Wohlert
Tomislav Kozlicek
Tommy Richter
Ulf Gebhardt
Ulrich Wortberg
Ulrike Sumfleth
Uta Glienke
Ute Stratenwerth
Uwe Bessle
Uwe Greim
Uwe Hafner
Valentin Lewandowski
Valeria Krger
Veronika Klein
Vincent Voigt
Walter Linner
Wencke Schubert
Wendelin Bitzan
Werner Kratochwil
Wilfried Werner
Winfried Merkel
Winnes Geiger
Wolf Coaching
Wolf Müller
Wolfgang Leffler
Wolfgang Schlegel
Wolfgang Steller
Wolfgang Timpe`;

const content1 = `DEMOCRACY Deutschland e.V. ist ein gemeinnütziger Verein, der mit seiner gleichnamigen App DEMOCRACY unsere Politik inklusiver, demokratischer und bürgernäher machen will. 

Als crowdmoderierte und politisch unabhängige Plattform informiert die App dafür über die aktuellen Bundestagsabstimmungen und ermöglicht den Nutzern eine eigene direkte Abstimmung. 

Mit DEMOCRACY wollen wir eine öffentliche Infrastruktur zur Verfügung stellen, die das Funktionieren einer lebendigen Demokratie begünstigt. Der Weisheit letzter Schluss liegt für uns in der solidarischen Kooperation (Gemeinschaftlichkeit) zum Vorteil aller (Gemeinnützigkeit). Deshalb ist es für uns selbstverständlich, nicht nur alle Abstimmungsergebnisse anonymisiert, sondern auch unseren Source-Code offen zu legen (Transparenz). Und weil Profitinteressen die Idee nur korrumpieren würden, haben wir uns auch äußerlich eine Rechtsform gegeben, die eine Verfremdung oder Bereicherungsabsicht per Satzung für immer ausschließt. DEMOCRACY ist und bleibt spendenfinanziert. Alle entstehenden Nutzerdaten sind gerade keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Datenverkauf und Werbefinanzierung finden bei unserem Vorhaben keinen Platz.

Da es zu Umsetzung einer so großen Idee  aber auch ein großes Portemonnaie braucht, war und ist unser Joker die gemeinschaftliche Finanzierung. 

Unser tiefste Dank gilt deshalb nach wie vor unseren 542 Unterstützerinnen und Unterstützern der initialen Crowdfunding-Kampagne, ohne die es nicht möglich gewesen wäre, DEMOCRACY überhaupt umzusetzen. Für immer und ewig danken möchten wir insofern:

`;

const content2 = `Neben den initialen Projektunterstützungen ziehen wir unseren Hut vor allem auch vor den zahlreichen Paten und Patinen, die mit ihrer regelmäßigen Spende (Monatlicher Dauerauftrag) bereits jetzt mithelfen, die kühne Vision einer unabhängigen und nachhaltigen Bürgerfinanzierung von DEMOCRACY zu realisieren: 

Zu guter Letzt möchten wir noch der Hertie Stiftung für Demokratie sowie im Speziellen dem Hertie Innovationskolleg danken, die uns in jeder nur erdenklichen Art und Weise dabei unterstützt hat, diese App zu veröffentlichen. 


Vielen Dank, dass ihr alle Teil von DEMOCRACY wart, seid und es hoffentlich auch in der Zukunft sein werdet. 
Unsere Arbeit ist unabhängig, überparteilich, allgemeinnützig und nicht-kommerziell – 
von Menschen für Menschen.

Euer 

Manuel Ruck
Ulf Gebhardt &
Marius Krüger
`;

class Security extends Component {
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

  render() {
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;
    return (
      <ScrollWrapper>
        <Wrapper>
          <Logo />
          <Text>{content1}</Text>
          <Text>{names}</Text>
          <Text>{content2}</Text>

          <Version style={{ paddingTop: 36 }}>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Security.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Security;
