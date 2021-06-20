import React, { useContext } from 'react';

// GraphQL
// import { ConstituencyContext } from '../../context/Constituency';
// import { InitialStateContext } from '../../context/InitialStates';
import { useNavigation } from '@react-navigation/core';
import { styled } from '../../styles';
import { DeputyList, SearchBar } from '@democracy-deutschland/ui';
import { AbgeordneteListContext } from '../../lib/states/Abgeordnete/context';
import { Button, View } from 'react-native';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.main};
  flex: 1;
`;

export const Abgeordnete: React.FC = () => {
  const { state, dispatch } = useContext(AbgeordneteListContext);
  const navigation = useNavigation();
  // const { constituency } = useContext(ConstituencyContext);
  // const { isVerified } = useContext(InitialStateContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 11 }}>
          <Button
            onPress={() =>
              dispatch({
                type: 'ToggleEditMode',
              })
            }
            title={state.editMode ? 'Fertig' : 'Bearbeiten'}
            color="#FFF"
          />
        </View>
      ),
    });
  }, [dispatch, navigation, state.editMode]);

  return (
    <Wrapper>
      <SearchBar
        textInput={{
          autoFocus: false,
          placeholder: 'Name, Partei, Wahlkreis, PLZ, Ort eingeben',
        }}
      />
      <DeputyList
        editMode={state.editMode}
        deputies={[
          {
            id: '522694',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Achim Post',
            subtitle: 'SPD, Minden-Lübbecke I (WK 134)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522692/3x4/284/379/550f4c8dcc518ba2bd1724f25e36112f/tH/post_achim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518722',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Agnieszka Brugger',
            subtitle: 'Bündnis 90/Die Grünen, Ravensburg (WK 294)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518718/3x4/284/379/952b19bd98a708533bb56bce8a190e19/FC/brugger_agnieszka_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524480',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Albert H. Weiler',
            subtitle:
              'CDU/CSU, Saalfeld-Rudolstadt – Saale-Holzland-Kreis – Saale-Orla-Kreis (WK 195)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524478/3x4/284/379/93e05ae9fd3c4ab0af28967d6662cc6b/QN/weiler_albert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523834',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Albert Stegemann',
            subtitle: 'CDU/CSU, Mittelems (WK 31)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523832/3x4/284/379/ab05caa6bb2e6ae8abaa1a0ad08f2264/Ft/stegemann_albert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519746',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Albrecht Glaser',
            subtitle: 'AfD, Schwalm-Eder (WK 170)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519744/3x4/284/379/5bd3ddc224eab3c2117a397cb1f6bda4/LU/glaser_albrecht_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519076',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Dobrindt',
            subtitle: 'CDU/CSU, Weilheim (WK 226)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519074/3x4/284/379/1b48868d158e23fc94a67dc417400c49/rY/dobrindt_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521462',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Graf Lambsdorff',
            subtitle: 'FDP, Bonn (WK 96)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527356/3x4/284/379/8423505fda7259e6437440483e13bb5c/ja/lambsdorff_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520440',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Hoffmann',
            subtitle: 'CDU/CSU, Main-Spessart (WK 249)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520438/3x4/284/379/30e2cc4f715e5128f12fca5e21683eed/zq/hoffmann_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521288',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Krauß',
            subtitle: 'CDU/CSU, Erzgebirgskreis I (WK 164)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530800/3x4/284/379/52956c7d3084fbe9ba26be259c76fc2f/xO/krauss_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521412',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Kulitz',
            subtitle: 'FDP, Ulm (WK 291)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526858/3x4/284/379/301fb020a125b56bef9d02b7b39612d3/yM/kulitz_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522152',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Müller',
            subtitle: 'FDP, Rheingau-Taunus – Limburg (WK 178)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522150/3x4/284/379/6d766d980d934ec1cacb23a0637968ea/cY/mueller_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522774',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Radwan',
            subtitle: 'CDU/CSU, Bad Tölz-Wolfratshausen – Miesbach (WK 223)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522772/3x4/284/379/ff962049980f948acd5233b7f51623b/wr/radwan_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524108',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Throm',
            subtitle: 'CDU/CSU, Heilbronn (WK 267)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526850/3x4/284/379/93f9dcc24c1067432d283c544feb5665/wl/throm_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524216',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alexander Ulrich',
            subtitle: 'Die Linke, Kaiserslautern (WK 209)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524214/3x4/284/379/69f349a34c2ee66d76193894e57c5000/xx/ulrich_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519712',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alois Gerig',
            subtitle: 'CDU/CSU, Odenwald – Tauber (WK 276)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519710/3x4/284/379/1bfc3fa51e8b135508cb7a3a9ada6fb/Bc/gerig_alois_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522782',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Alois Rainer',
            subtitle: 'CDU/CSU, Straubing (WK 231)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522780/3x4/284/379/174451e55817aede5ec5f7edf0798b3e/uR/rainer_alois_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522090',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Amira Mohamed Ali',
            subtitle: 'Die Linke, Oldenburg – Ammerland (WK 27)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531160/3x4/284/379/88daf6f1c21c222eb08453a699316018/Tw/mohamed_ali_amira_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521636',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andrea Lindholz',
            subtitle: 'CDU/CSU, Aschaffenburg (WK 247)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521634/3x4/284/379/69086b00b6913a3cc1f07a97964779e4/qA/lindholz_andrea_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518460',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Bleck',
            subtitle: 'AfD, Neuwied (WK 197)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530312/3x4/284/379/d46dae066271823050228cccd2683d9/ve/bleck_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520742',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Jung',
            subtitle: 'CDU/CSU, Konstanz (WK 287)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520738/3x4/284/379/2632f92b914f576353b7659f2d28d116/Qf/jung_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521576',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Lenz',
            subtitle: 'CDU/CSU, Erding – Ebersberg (WK 213)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521574/3x4/284/379/368eba7dd46c013401d6f0c2bf2b74ba/uo/lenz_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521446',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Lämmel',
            subtitle: 'CDU/CSU, Dresden I (WK 159)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521444/3x4/284/379/cd7d3c07b792cbf6895da5e66ed62f3a/VP/laemmel_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521896',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Mattfeldt',
            subtitle: 'CDU/CSU, Osterholz – Verden (WK 34)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521894/3x4/284/379/1e7758904799bed2cc42f2513aa0eb4e/RD/mattfeldt_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522140',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Mrosek',
            subtitle: 'AfD, Dessau – Wittenberg (WK 70)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526482/3x4/284/379/f7ec00a11ea3463a2a22e08628ab05d3/Jc/mrosek_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522336',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Nick',
            subtitle: 'CDU/CSU, Montabaur (WK 204)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522334/3x4/284/379/3591764a6d995d60b65060b2ce580bcd/fS/nick_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522944',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Rimkus',
            subtitle: 'SPD, Düsseldorf II (WK 107)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522942/3x4/284/379/39a527a852b9c3eb26237e651e39122e/bM/rimkus_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523234',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Scheuer',
            subtitle: 'CDU/CSU, Passau (WK 229)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523232/3x4/284/379/f9b6c738b82330227cfc1d2cc2d3cee1/Qb/scheuer_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523582',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Schwarz',
            subtitle: 'SPD, Bamberg (WK 236)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523580/3x4/284/379/3ebbbd96192f2020b40461cabbc34843/Po/schwarz_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523844',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Steier',
            subtitle: 'CDU/CSU, Trier (WK 203)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530798/3x4/284/379/53d5d82a3f4070778a7abf0f3e71e4ad/XB/steier_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524350',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andreas Wagner',
            subtitle: 'Die Linke, Bad Tölz-Wolfratshausen – Miesbach (WK 223)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525444/3x4/284/379/ef8e594b67ed0f6515fc0a2567cf02b5/hj/wagner_andreas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520578',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Andrej Hunko',
            subtitle: 'Die Linke, Aachen I (WK 87)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520576/3x4/284/379/7da57ab6350dc8bc3e4177d493cf24b6/BV/hunko_andrej_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518334',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'André Berghegger',
            subtitle: 'CDU/CSU, Osnabrück-Land (WK 38)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518330/3x4/284/379/a54c45e5916c788743d7ab9799494989/En/berghegger_andre_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520042',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'André Hahn',
            subtitle: 'Die Linke, Sächsische Schweiz-Osterzgebirge (WK 158)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520040/3x4/284/379/120e4bf0b63bb0232a216a91e056878f/JA/hahn_andre_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521278',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anette Kramme',
            subtitle: 'SPD, Bayreuth (WK 237)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521276/3x4/284/379/9d45252eec356a1100f7184cb9889ac/yj/kramme_anette_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519756',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Angelika Glöckner',
            subtitle: 'SPD, Pirmasens (WK 210)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519754/3x4/284/379/dab7c98a00b16498d59dace5bd8d01d/rZ/gloeckner_angelika_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523162',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anita Schäfer',
            subtitle: 'CDU/CSU, Pirmasens (WK 210)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523160/3x4/284/379/5e66f970e8090d6bf5c3045298f1aca7/fl/schaefer_anita_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520052',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anja Hajduk',
            subtitle: 'Bündnis 90/Die Grünen, Hamburg-Nord (WK 21)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520050/3x4/284/379/3897b4f069677d473164fdc9b856ec52/fm/hajduk_anja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520850',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anja Karliczek',
            subtitle: 'CDU/CSU, Steinfurt III (WK 128)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520848/3x4/284/379/d3bf6a10ab083c93c603495fb4f44731/QQ/karliczek_anja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524506',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anja Weisgerber',
            subtitle: 'CDU/CSU, Schweinfurt (WK 250)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524504/3x4/284/379/699545d3bead2ef530b909ee4e912874/CN/weisgerber_anja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519106',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anke Domscheit-Berg',
            subtitle:
              'Die Linke, Brandenburg an der Havel – Potsdam-Mittelmark I – Havelland III – Teltow-Fläming I (WK 60)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526392/3x4/284/379/9b61aca3839889c350b587831efdf92b/Vv/domscheit_berg_anke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518880',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anna Christmann',
            subtitle: 'Bündnis 90/Die Grünen, Stuttgart II (WK 259)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518876/3x4/284/379/866141d9ba4187ec390a806fc4a3f99e/Mb/christmann_anna_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518092',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Annalena Baerbock',
            subtitle:
              'Bündnis 90/Die Grünen, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518088/3x4/284/379/e94a261f5908e95191d875ec06c48e4a/AO/baerbock_annalena_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524580',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Annette Widmann-Mauz',
            subtitle: 'CDU/CSU, Tübingen (WK 290)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524578/3x4/284/379/9260df422fe4fc0809c7c1c037b20eaa/QO/widmann_mauz_annette_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520360',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ansgar Heveling',
            subtitle: 'CDU/CSU, Krefeld I – Neuss II (WK 110)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520358/3x4/284/379/12bec54edaf456ec01e87d0621dec982/xj/heveling_ansgar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521608',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Antje Lezius',
            subtitle: 'CDU/CSU, Kreuznach (WK 201)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521606/3x4/284/379/75dbfd66dcd6416c97aad614d2214d71/pj/lezius_antje_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524124',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Antje Tillmann',
            subtitle: 'CDU/CSU, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524122/3x4/284/379/a52d60dbbd4a484750c62d561376d6c4/vU/tillmann_antje_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520476',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Anton Hofreiter',
            subtitle: 'Bündnis 90/Die Grünen, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520474/3x4/284/379/1b909c07c63b2156fe17c2ed105781f1/ff/hofreiter_anton_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523552',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Armin Schuster',
            subtitle: 'CDU/CSU, Lörrach – Müllheim (WK 282)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523550/3x4/284/379/70f28d753d7e5c384c125aadbde3ebc4/uG/schuster_armin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520072',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Armin-Paulus Hampel',
            subtitle: 'AfD, Hameln-Pyrmont – Holzminden (WK 46)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530352/3x4/284/379/e8b173fce7289b413c840f20c42e28a4/rR/hampel_armin_paulus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521034',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Arno Klare',
            subtitle: 'SPD, Mülheim – Essen I (WK 118)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521032/3x4/284/379/e2be4c5dbee267e600e5b87b3c6a145/Eo/klare_arno_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524242',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Arnold Vaatz',
            subtitle: 'CDU/CSU, Dresden II – Bautzen II (WK 160)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524240/3x4/284/379/5336ad934803c3194c8d7c89181f9660/vj/vaatz_arnold_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518012',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Artur Auernhammer',
            subtitle: 'CDU/CSU, Ansbach (WK 241)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518008/3x4/284/379/fe9b09d5fceb879e17feb8ebd68f0ffa/vf/auernhammer_artur_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518968',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Astrid Damerow',
            subtitle: 'CDU/CSU, Nordfriesland – Dithmarschen Nord (WK 2)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526784/3x4/284/379/87356d1c42ae54634df8df929a1ad70a/Zs/damerow_astrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519912',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Astrid Grotelüschen',
            subtitle:
              'CDU/CSU, Delmenhorst – Wesermarsch – Oldenburg-Land (WK 28)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519910/3x4/284/379/a32a97ee0d4705de00f3dbd02cf4e04b/kn/grotelueschen_astrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519454',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Axel E. Fischer',
            subtitle: 'CDU/CSU, Karlsruhe-Land (WK 272)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519452/3x4/284/379/54c7a08b5ebfa58ca07b2397317a16b6/Lb/fischer_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521114',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Axel Knoerig',
            subtitle: 'CDU/CSU, Diepholz – Nienburg I (WK 33)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521112/3x4/284/379/afd9e22b09dbf5c5830fe59ad56150c6/yF/knoerig_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522156',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Axel Müller',
            subtitle: 'CDU/CSU, Ravensburg (WK 294)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/532000/3x4/284/379/a0b42c499102c14e7546a9ea0a5d97c9/fQ/mueller_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523166',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Axel Schäfer',
            subtitle: 'SPD, Bochum I (WK 140)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523164/3x4/284/379/25cabc57035d9d31cee98b8c40f77977/pz/schaefer_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522462',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Aydan Özoğuz',
            subtitle: 'SPD, Hamburg-Wandsbek (WK 22)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522460/3x4/284/379/d3c16e944d9ca5339bb6af918fcbb0f/LN/oezoguz_aydan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520278',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Barbara Hendricks',
            subtitle: 'SPD, Kleve (WK 112)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520274/3x4/284/379/d2d846d433c29e3914cb286546b82139/uR/hendricks_barbara_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522148',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Beate Müller-Gemmeke',
            subtitle: 'Bündnis 90/Die Grünen, Reutlingen (WK 289)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522146/3x4/284/379/11983373a107c1d127815b1e625dfe06/Sn/mueller_gemmeke_beate_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524392',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Beate Walter-Rosenheimer',
            subtitle: 'Bündnis 90/Die Grünen, Fürstenfeldbruck (WK 215)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524390/3x4/284/379/9b41e60bd25790700d45f9d2b228122d/wR/walter-rosenheimer_beate_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523916',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Beatrix von Storch',
            subtitle: 'AfD, Berlin-Mitte (WK 75)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523914/3x4/284/379/780da440e3da5d4966b84377b3900272/wR/storch_beatrix_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518064',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bela Bach',
            subtitle: 'SPD, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/681376/3x4/284/379/c76d098ff84dc0c12d70593d9b4b1eb1/eB/bach_bela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523936',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Benjamin Strasser',
            subtitle: 'FDP, Ravensburg (WK 294)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529146/3x4/284/379/c60cbef823a4432af3b8f8fa9e059ca/yP/strasser_benjamin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519260',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Berengar Elsner von Gronow',
            subtitle: 'AfD, Soest (WK 146)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530344/3x4/284/379/a7629ed00e35b0040523b2fe076865ae/dT/elsner_von_gronow_berengar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518202',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Baumann',
            subtitle: 'AfD, Hamburg-Altona (WK 19)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518200/3x4/284/379/23c6d89b9f2c292068b2ae10c47d2bec/CW/baumann_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522906',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Reuther',
            subtitle: 'FDP, Wesel I (WK 113)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526486/3x4/284/379/d34e0d8163e396faae8c829901a8ded5/PO/reuther_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522940',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Riexinger',
            subtitle: 'Die Linke, Stuttgart II (WK 259)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525282/3x4/284/379/8879c392d62ec797059f957851f68a48/YI/riexinger_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523076',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Rützel',
            subtitle: 'SPD, Main-Spessart (WK 249)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523074/3x4/284/379/383c4e9c340cb954fc749891e3885bdf/tH/ruetzel_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523678',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Siebert',
            subtitle: 'CDU/CSU, Schwalm-Eder (WK 170)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523676/3x4/284/379/3b38a9d7f972748bb963c748221f4229/MC/siebert_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524560',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernd Westphal',
            subtitle: 'SPD, Hildesheim (WK 48)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524558/3x4/284/379/4b04bf565b5b5b0d64f4bfe0e52af885/Qj/westphal_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518964',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernhard Daldrup',
            subtitle: 'SPD, Warendorf (WK 130)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518960/3x4/284/379/fcde0357d0982d2ff6204597c739afcb/cQ/daldrup_bernhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521692',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bernhard Loos',
            subtitle: 'CDU/CSU, München-Nord (WK 217)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530006/3x4/284/379/495f89a976c56159db7ab2c0d0df701f/GL/loos_bernhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520028',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bettina Hagedorn',
            subtitle: 'SPD, Ostholstein – Stormarn-Nord (WK 9)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520026/3x4/284/379/b1caea293237257a33f7eac9ebd7b61c/Ub/hagedorn_bettina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524594',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bettina Margarethe Wiesmann',
            subtitle: 'CDU/CSU, Frankfurt am Main II (WK 183)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527224/3x4/284/379/d70f20d40a7bf396a7a6d8dc19b8de58/EM/wiesmann_bettina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522160',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bettina Müller',
            subtitle: 'SPD, Main-Kinzig – Wetterau II – Schotten (WK 175)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522158/3x4/284/379/b65c65188146f2b07d4a8242ec29b38/bt/mueller_bettina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523812',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bettina Stark-Watzinger',
            subtitle: 'FDP, Main-Taunus (WK 181)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527476/3x4/284/379/982cd36b78503e009d8096ad944f9bdf/EP/stark_watzinger_bettina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519072',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bijan Djir-Sarai',
            subtitle: 'FDP, Neuss I (WK 108)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527266/3x4/284/379/2878e5fccebe31320a4f6522d83adbaa/Ta/djir_sarai_bijan_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518796',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Birke Bull-Bischoff',
            subtitle: 'Die Linke, Burgenland – Saalekreis (WK 73)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526284/3x4/284/379/56c5d00425a92f2f72d564abcc392fdb/kJ/bull_bischoff_birke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523698',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Björn Simon',
            subtitle: 'CDU/CSU, Offenbach (WK 185)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529208/3x4/284/379/8ef92dd1b4ac121d129c57f2900f7067/ID/simon_bjoern_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519522',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Brigitte Freihold',
            subtitle: 'Die Linke, Pirmasens (WK 210)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527030/3x4/284/379/9ebdafd787f781adef873ae707c376a6/Cf/freihold_brigitte_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520132',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Britta Haßelmann',
            subtitle:
              'Bündnis 90/Die Grünen, Bielefeld – Gütersloh II (WK 132)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520130/3x4/284/379/37053cb5513f7938bd825c7b6a6857b7/xc/hasselmann_britta_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518978',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Britta Katharina Dassler',
            subtitle: 'FDP, Erlangen (WK 242)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531156/3x4/284/379/8aa6d265c90fb37c0591e0b40a72797/YK/dassler_britta_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521668',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Burkhard Lischka',
            subtitle: 'SPD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521666/3x4/284/379/22af704fdc9cc4ff22acc3a11b2e1d1d/au/lischka_burkhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518186',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bärbel Bas',
            subtitle: 'SPD, Duisburg I (WK 115)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518184/3x4/284/379/287c4a58aed33c46211d0edba9e5c910/qR/bas_baerbel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521198',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Bärbel Kofler',
            subtitle: 'SPD, Traunstein (WK 225)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521196/3x4/284/379/e9861ae3a9452951102828e706a375c3/jX/kofler_baerbel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518240',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Canan Bayram',
            subtitle:
              'Bündnis 90/Die Grünen, Berlin-Friedrichshain-Kreuzberg – Prenzlauer Berg Ost (WK 83)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525600/3x4/284/379/d3ada55f2e0a1e7b73b9bdc3158e4204/at/bayram_canan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521022',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Cansel Kiziltepe',
            subtitle:
              'SPD, Berlin-Friedrichshain-Kreuzberg – Prenzlauer Berg Ost (WK 83)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521020/3x4/284/379/bb0b8e4f1e7b208a59abc636ea1ebb02/Nt/kiziltepe_cansel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521512',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Caren Lay',
            subtitle: 'Die Linke, Bautzen I (WK 156)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521510/3x4/284/379/2a98dd41cbb84339ac088340cd07572c/Om/lay_caren_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521862',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Caren Marks',
            subtitle: 'SPD, Hannover-Land I (WK 43)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521860/3x4/284/379/1571a38eac13a829c8752086b597f35b/WS/marks_caren_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521218',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carina Konrad',
            subtitle: 'FDP, Mosel/Rhein-Hunsrück (WK 200)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529140/3x4/284/379/9342233c10124416147ebafe408c44a0/od/konrad_carina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518932',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carl-Julius Cronenberg',
            subtitle: 'FDP, Hochsauerlandkreis (WK 147)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527122/3x4/284/379/6ede9b0aeb20582a07b2f13204a0459/Ks/cronenberg_carlo_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521176',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carsten Körber',
            subtitle: 'CDU/CSU, Zwickau (WK 165)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521172/3x4/284/379/d0a68b598459df48e1db5d5b6c345972/dy/koerber_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522166',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carsten Müller',
            subtitle: 'CDU/CSU, Braunschweig (WK 50)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522164/3x4/284/379/7746e1b85b4a2cc30581dccffe1f2f73/zD/mueller_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523400',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carsten Schneider',
            subtitle: 'SPD, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523398/3x4/284/379/e3f020a903aee30cbb1c985d82eff393/Vt/schneider_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524144',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Carsten Träger',
            subtitle: 'SPD, Fürth (WK 243)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524142/3x4/284/379/5e7732d3501134ac50911c00c62598a/Ib/traeger_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522452',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Cem Özdemir',
            subtitle: 'Bündnis 90/Die Grünen, Stuttgart I (WK 258)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522450/3x4/284/379/3c6d8b352b5f96f793ef03e61ccec77c/Qc/oezdemir_cem_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523408',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Charlotte Schneidewind-Hartnagel',
            subtitle: 'Bündnis 90/Die Grünen, Odenwald – Tauber (WK 276)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/665676/3x4/284/379/ea860314a91dbc4f91f9afe3c6f1b876/Zb/schneidewind-hartnagel_charlotte_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519160',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Dürr',
            subtitle: 'FDP, Delmenhorst – Wesermarsch – Oldenburg-Land (WK 28)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526836/3x4/284/379/ab1636595e71a6d852ae634fd3c370de/ik/duerr_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519998',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Haase',
            subtitle: 'CDU/CSU, Höxter – Lippe II (WK 136)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519994/3x4/284/379/b0ce7b1d32219eb3cb06e789b21e1c2b/NJ/haase_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520396',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Hirte',
            subtitle:
              'CDU/CSU, Eisenach – Wartburgkreis – Unstrut-Hainich-Kreis (WK 190)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520392/3x4/284/379/9acad4b009c794b1be98e76d9e24b72e/xz/hirte_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521382',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Kühn',
            subtitle: 'Bündnis 90/Die Grünen, Tübingen (WK 290)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521380/3x4/284/379/1dbaa31873f9634d46e8fca633b26cca/sU/kuehn_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521480',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Lange',
            subtitle: 'SPD, Backnang – Schwäbisch Gmünd (WK 269)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521478/3x4/284/379/eba0c1c19bb6b1d7f0651f05ba7e2aae/Jd/lange_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521640',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Lindner',
            subtitle: 'FDP, Rheinisch-Bergischer Kreis (WK 100)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525066/3x4/284/379/58b49fb7af6c863309dc5626870b02a3/Wy/lindner_christian_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522272',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Natterer',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/806264/3x4/284/379/e5bd1f237568fd02b4122f8850d48a9d/pq/natterer_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522602',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Petry',
            subtitle: 'SPD, St. Wendel (WK 298)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522600/3x4/284/379/d4e2b4b403e04e8d2992b725f3484a58/mp/petry_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523142',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Sauter',
            subtitle: 'FDP, Lippe I (WK 135)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527258/3x4/284/379/b881fd2787b115753d401ef45793ac05/Mw/sauter_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523326',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian Schmidt',
            subtitle: 'CDU/CSU, Fürth (WK 243)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523324/3x4/284/379/b99d5f277d46aacfa96a52557ee36ddf/mG/schmidt_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523882',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christian von Stetten',
            subtitle: 'CDU/CSU, Schwäbisch Hall – Hohenlohe (WK 268)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523880/3x4/284/379/26a7f6bb5dc39a5ac48ac55df572fb69/nZ/stetten_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517986',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christine Aschenberg-Dugnus',
            subtitle: 'FDP, Rendsburg-Eckernförde (WK 4)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526698/3x4/284/379/b415e7276b9699efb9fd8f9cffe13c41/op/aschenberg_dugnus_christine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518756',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christine Buchholz',
            subtitle: 'Die Linke, Offenbach (WK 185)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518752/3x4/284/379/a7aafdcb09cda47ba2821c224de4ef39/Xw/buchholz_christine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521460',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christine Lambrecht',
            subtitle: 'SPD, Bergstraße (WK 188)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521458/3x4/284/379/eb137a528acce58436765126c7f8e2a5/ts/lambrecht_christine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518364',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christoph Bernstiel',
            subtitle: 'CDU/CSU, Halle (WK 72)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526766/3x4/284/379/394b347f4aa0a5de46fdc25c0dd2513/CH/bernstiel_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521892',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christoph Matschie',
            subtitle: 'SPD, Jena – Sömmerda – Weimarer Land I (WK 191)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526440/3x4/284/379/ab4e42f580fdb4ec6dbf74d3b2ebb5a4/QT/matschie_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521996',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christoph Meyer',
            subtitle: 'FDP, Berlin-Charlottenburg-Wilmersdorf (WK 80)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521994/3x4/284/379/80479c0c8ab95cefb84773c7d63513a6/Zz/meyer_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522308',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christoph Neumann',
            subtitle: 'AfD, Leipzig I (WK 152)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.dehttps://www.bundestag.de/resource/image/530074/3x4/284/379/19950ede985e9bc1f5c64e5f612385af/xh/neumann_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '524318',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Christopher de Vries',
            subtitle: 'CDU/CSU, Hamburg-Mitte (WK 18)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524316/3x4/284/379/e4e8bc6d266bb86cc022cc5da221a94b/AB/vries_christopher_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522100',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Claudia Moll',
            subtitle: 'SPD, Aachen II (WK 88)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530058/3x4/284/379/1e27281a27172f9db878a970faa7fd21/hz/moll_claudia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522168',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Claudia Müller',
            subtitle:
              'Bündnis 90/Die Grünen, Vorpommern-Rügen – Vorpommern-Greifswald I (WK 15)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527220/3x4/284/379/8fafac9eff460e891cbc967c2dacc135/dm/mueller_claudia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523038',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Claudia Roth',
            subtitle: 'Bündnis 90/Die Grünen, Augsburg-Stadt (WK 252)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523036/3x4/284/379/abcbbda78aa2e43e5c5a5eff85f0211c/AI/roth_claudia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524036',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Claudia Tausend',
            subtitle: 'SPD, München-Ost (WK 218)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524034/3x4/284/379/d265bde378711c0bd27f598d838f49b2/zU/tausend_claudia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522010',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Corinna Miazga',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530114/3x4/284/379/c711dfff6d9ab3daebed279d5faf9a17/NL/miazga_corinna_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523068',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Corinna Rüffer',
            subtitle: 'Bündnis 90/Die Grünen, Trier (WK 203)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523066/3x4/284/379/1219c35048ed9538c610cd4a6c20421f/MH/rueffer_corinna_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522070',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Cornelia Möhring',
            subtitle: 'Die Linke, Pinneberg (WK 7)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522068/3x4/284/379/80cdc53657fea73bcaa2f05fceac8bee/Vp/moehring_cornelia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519528',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dagmar Freitag',
            subtitle: 'SPD, Märkischer Kreis II (WK 150)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519524/3x4/284/379/fd619019471f6769c02bb2b79073d4a0/Ti/freitag_dagmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523330',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dagmar Schmidt',
            subtitle: 'SPD, Lahn-Dill (WK 172)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523328/3x4/284/379/8b8df014ddee0750f117da67aa67e28/tt/schmidt_dagmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524770',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dagmar Ziegler',
            subtitle:
              'SPD, Prignitz – Ostprignitz-Ruppin – Havelland I (WK 56)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524768/3x4/284/379/405919d8dfcdf0ae25546eff4f70e387/AG/ziegler_dagmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519490',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Daniel Föst',
            subtitle: 'FDP, München-Nord (WK 217)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527434/3x4/284/379/39e67e58d30f7a765332f0f31b8b1635/gV/foest_daniel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521098',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Daniela Kluckert',
            subtitle: 'FDP, Berlin-Pankow (WK 76)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521096/3x4/284/379/85505940c5a3f91beb7d4384f55004f4/Xf/kluckert_daniela_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521206',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Daniela Kolbe',
            subtitle: 'SPD, Leipzig I (WK 152)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521204/3x4/284/379/98326ffd410f8c12655390a7485a1b1e/Rt/kolbe_daniela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521736',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Daniela Ludwig',
            subtitle: 'CDU/CSU, Rosenheim (WK 222)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521734/3x4/284/379/343fe30d8b574b41a11c91c548c5dcf1/hH/ludwig_daniela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524354',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Daniela Wagner',
            subtitle: 'Bündnis 90/Die Grünen, Darmstadt (WK 186)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526516/3x4/284/379/bf429bc3195e03356a0b65b14f80fee7/Th/wagner_daniela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523006',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dennis Rohde',
            subtitle: 'SPD, Oldenburg – Ammerland (WK 27)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523004/3x4/284/379/dea6ea01c95d644510e29c65c89a5167/VH/rohde_dennis_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522172',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Detlef Müller',
            subtitle: 'SPD, Chemnitz (WK 162)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522170/3x4/284/379/6ad085b711f5bf158109c7fe3cb4d4a4/nP/mueller_detlef_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523638',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Detlef Seif',
            subtitle: 'CDU/CSU, Euskirchen – Rhein-Erft-Kreis II (WK 92)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523636/3x4/284/379/f9faa7ebda363c7b0f7f76b6b820748d/Xp/seif_detlef_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522650',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Detlev Pilger',
            subtitle: 'SPD, Koblenz (WK 199)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522648/3x4/284/379/4fde6de1586eb7a87ddaea545f32ae57/VQ/pilger_detlev_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523752',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Detlev Spangenberg',
            subtitle: 'AfD, Nordsachsen (WK 151)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529618/3x4/284/379/2fac2aae3eb8f18d9dd0393dcdf51e37/UT/spangenberg_detlev_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520658',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dieter Janecek',
            subtitle: 'Bündnis 90/Die Grünen, München-West/Mitte (WK 220)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520656/3x4/284/379/6561bedf0440e271362b96a30198fb64/yw/janecek_dieter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523890',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dieter Stier',
            subtitle: 'CDU/CSU, Burgenland – Saalekreis (WK 73)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523888/3x4/284/379/4ec56f3277976e3c612e110c7f85ecc7/RG/stier_dieter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518988',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Diether Dehm',
            subtitle: 'Die Linke, Hannover-Land I (WK 43)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518986/3x4/284/379/79da11e9c14f616dcc3f84c10d90b504/Xb/dehm_diether_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519550',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dietmar Friedhoff',
            subtitle: 'AfD, Hannover-Land I (WK 43)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519548/3x4/284/379/5c97717bef56b5def1c28c45372f311d/lN/friedhoff_dietmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522362',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dietmar Nietan',
            subtitle: 'SPD, Düren (WK 90)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522360/3x4/284/379/255f887864f8e526b3f7bd6719943dd7/wU/nietan_dietmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522106',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dietrich Monstadt',
            subtitle:
              'CDU/CSU, Schwerin – Ludwigslust-Parchim I – Nordwestmecklenburg I (WK 12)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522104/3x4/284/379/42b4fdbe333a6ded508d0a18376a4f45/oB/Monstadt_Dietrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520186',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dirk Heidenblut',
            subtitle: 'SPD, Essen II (WK 119)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520184/3x4/284/379/d978f7e39ad5eaa616788dbdacbdac8d/Pd/heidenblut_dirk_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524278',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dirk Vöpel',
            subtitle: 'SPD, Oberhausen – Wesel III (WK 117)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524276/3x4/284/379/5c23145a957ce9c8a0ca2c3514194d59/TH/voepel_dirk_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524592',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dirk Wiese',
            subtitle: 'SPD, Hochsauerlandkreis (WK 147)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524590/3x4/284/379/8612c415f74237aca6ad8b3720f1b1f4/EZ/wiese_dirk_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '517820',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Doris Achelwilm',
            subtitle: 'Die Linke',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526142/3x4/284/379/ee875f542984d08ba149023f7abc4d81/ZJ/achelwilm_doris_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518140',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Doris Barnett',
            subtitle: 'SPD, Ludwigshafen/Frankenthal (WK 207)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518136/3x4/284/379/938f3d106c5f3940972ec6d0ab45a8d2/Ca/barnett_doris_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518098',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dorothee Bär',
            subtitle: 'CDU/CSU, Bad Kissingen (WK 248)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518094/3x4/284/379/53f62356d66500d2b61ba3ee4e21e9ca/kZ/baer_dorothee_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521872',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dorothee Martin',
            subtitle: 'SPD, Hamburg-Nord (WK 21)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527120/3x4/284/379/e569f9b844a74788ebde4b257f683cf3/Fa/martin_dorothee_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522420',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr . Georg Nüßlein',
            subtitle: 'fraktionslos, Neu-Ulm (WK 255)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522418/3x4/284/379/ad15824b58a43e1580aca4db95005550/KL/nuesslein_georg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '520972',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Achim Kessler',
            subtitle: 'Die Linke, Frankfurt am Main I (WK 182)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520970/3x4/284/379/ec1272fc31b77ffc77062986dacdd3b9/Mh/kessler_achim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519654',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Alexander Gauland',
            subtitle: 'AfD, Frankfurt (Oder) – Oder-Spree (WK 63)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519652/3x4/284/379/a8e470e03a85e25b09610ae9ba24fcd4/lC/gauland_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522326',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Alexander S. Neu',
            subtitle: 'Die Linke, Rhein-Sieg-Kreis I (WK 97)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522324/3x4/284/379/ac1eb5153b265e488b9628f0ce8dfd49/jE/neu_alexander_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524466',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Alice Weidel',
            subtitle: 'AfD, Bodensee (WK 293)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530382/3x4/284/379/1939c50873d78d71a73fbc0028f9f1f0/mk/weidel_alice_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521968',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Angela Merkel',
            subtitle:
              'CDU/CSU, Vorpommern-Rügen – Vorpommern-Greifswald I (WK 15)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521966/3x4/284/379/5b540b9f5294257c2163925e6cb288fb/TJ/merkel_angela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519566',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Anton Friesen',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530346/3x4/284/379/feaa3ae04208acbe717c24bae3bad0da/iL/friesen_anton_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '650158',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Astrid Freudenstein',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519538/3x4/284/379/aa05df61f1592f2991e7816ea556e84c/Wt/freudenstein_astrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519540',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Astrid Freudenstein',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519538/3x4/284/379/aa05df61f1592f2991e7816ea556e84c/Wt/freudenstein_astrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521848',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Astrid Mannes',
            subtitle: 'CDU/CSU, Darmstadt (WK 186)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521846/3x4/284/379/772bcf7dd9c2b55520e3406b290ce4f7/ei/mannes_astrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524168',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Axel Troost',
            subtitle: 'Die Linke, Leipzig-Land (WK 154)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524166/3x4/284/379/7d2e116c9f9e461dcd67beb15eefe7b1/Ms/troost_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518750',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Bernd Buchholz',
            subtitle: 'FDP, Herzogtum Lauenburg – Stormarn-Süd (WK 10)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526512/3x4/284/379/9dd61c304a59726fa4e6a7320984bb57/sb/buchholz_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520448',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Bettina Hoffmann',
            subtitle: 'Bündnis 90/Die Grünen, Schwalm-Eder (WK 170)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520446/3x4/284/379/d11a9a6a5566c6834e03569328bc7274/FR/hoffmann_bettina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521834',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Birgit Malsack-Winkemann',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530376/3x4/284/379/4605e8892f54607afe96b8b312c9266b/FU/malsack_winkemann_birgit_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520490',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Bruno Hollnagel',
            subtitle: 'AfD, Herzogtum Lauenburg – Stormarn-Süd (WK 10)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527118/3x4/284/379/4fa55b3cfa1600da5d077c171ee245ad/ZB/hollnagel_bruno_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522854',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Carola Reimann',
            subtitle: 'SPD, Braunschweig (WK 50)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522852/3x4/284/379/84cd45844a99e1d33260bfde2e0508ac/Eo/reimann_carola_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518712',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Carsten Brodesser',
            subtitle: 'CDU/CSU, Oberbergischer Kreis (WK 99)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526236/3x4/284/379/6c9cc23002a0a00e3504f2cf3264b303/lb/brodesser_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521654',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Carsten Linnemann',
            subtitle: 'CDU/CSU, Paderborn – Gütersloh III (WK 137)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521652/3x4/284/379/4e93b91a337c48ce702f8c667a9f453c/sr/linnemann_carsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520744',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Christian Jung',
            subtitle: 'FDP, Karlsruhe-Land (WK 272)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527218/3x4/284/379/edf621a5663bffbe1b68499ba25dda16/eR/jung_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524632',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Christian Wirth',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530406/3x4/284/379/a2c363f15e2ce5b4d620d27859659369/Xq/wirth_christian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520450',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Christoph Hoffmann',
            subtitle: 'FDP, Lörrach – Müllheim (WK 282)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525370/3x4/284/379/7e2ba62931efcc66b46fdfc0b5391934/ox/hoffmann_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522662',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Christoph Ploß',
            subtitle: 'CDU/CSU, Hamburg-Nord (WK 21)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525446/3x4/284/379/efbe79f3d7dbdc2f5f965f1f6d110f16/hP/ploss_christoph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519806',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Christopher Gohl',
            subtitle: 'FDP, Tübingen (WK 290)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/840774/3x4/284/379/b0ead4a8af08835e0efa66e653d48b29/Vo/gohl_christopher_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522918',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Daniela de Ridder',
            subtitle: 'SPD, Mittelems (WK 31)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522916/3x4/284/379/cbccf0f3d0d813f79fa3887497326b2c/Qo/de_ridder_daniela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518234',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Danyal Bayaz',
            subtitle: 'Bündnis 90/Die Grünen, Bruchsal – Schwetzingen (WK 278)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531546/3x4/284/379/52a1b0b4714bd239f00dc599baedc047/sr/bayaz_danyal_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524114',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Dietlind Tiemann',
            subtitle:
              'CDU/CSU, Brandenburg an der Havel – Potsdam-Mittelmark I – Havelland III – Teltow-Fläming I (WK 60)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527296/3x4/284/379/bcfcd777407b61607b6eee42afefc79d/pa/tiemann_dietlind_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518176',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Dietmar Bartsch',
            subtitle: 'Die Linke, Rostock – Landkreis Rostock II (WK 14)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518172/3x4/284/379/379310a277ec5642d23bd5e597b3f3f6/HW/bartsch_dietmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523754',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Dirk Spaniel',
            subtitle: 'AfD, Stuttgart I (WK 258)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530404/3x4/284/379/88e0d66d44fd8d67b20312644d008b42/hG/spaniel_dirk_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '829864',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Dr. h. c. Bernd Fabritius',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519346/3x4/284/379/baba080907e266fd2f2d909bff5c0f7f/hU/fabritius_bernd_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518648',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Eberhard Brecht',
            subtitle: 'SPD, Harz (WK 68)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518646/3x4/284/379/ab86a978bf768d98b10164f5105196cb/Pr/brecht_eberhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519500',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Edgar Franke',
            subtitle: 'SPD, Schwalm-Eder (WK 170)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519496/3x4/284/379/47c80d2002cf1dc0e3ac3a6ae17a6eb5/ra/franke_edgar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520418',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Eva Högl',
            subtitle: 'SPD, Berlin-Mitte (WK 75)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520416/3x4/284/379/905d68713deb4b7e181860634cc7cabe/Lq/hoegl_eva_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524140',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Florian Toncar',
            subtitle: 'FDP, Böblingen (WK 260)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527240/3x4/284/379/788642beaede3c698e01a2166ba3319b/cL/toncar_florian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522604',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Frauke Petry',
            subtitle: 'fraktionslos, Sächsische Schweiz-Osterzgebirge (WK 158)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526780/3x4/284/379/8af489b12cc3b683caf03eea54d7c69a/vK/petry_frauke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '523340',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Frithjof Schmidt',
            subtitle: 'Bündnis 90/Die Grünen, Bochum I (WK 140)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523338/3x4/284/379/7984d4028a33b58f906e594770965bd/EM/schmidt_frithjof_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520408',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Gero Hocker',
            subtitle: 'FDP, Osterholz – Verden (WK 34)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526770/3x4/284/379/fce23b208cdfe4f672a8fbcd861a25fb/bd/hocker_gero_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519578',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Götz Frömming',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519576/3x4/284/379/e63fbd9d604f4cbaf8b5ac34c0ed1886/oG/froemming_goetz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521318',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Günter Krings',
            subtitle: 'CDU/CSU, Mönchengladbach (WK 109)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521316/3x4/284/379/b3f448923cd6199b2ed41e81b62e9cc7/WE/krings_guenter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524596',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Heiko Wildberg',
            subtitle: 'AfD, Südpfalz (WK 211)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525530/3x4/284/379/e0938fa406880723ba699f405795e4b1/mR/wildberg_heiko_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520516',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Hendrik Hoppenstedt',
            subtitle: 'CDU/CSU, Hannover-Land I (WK 43)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520514/3x4/284/379/fdc85ca45f4cc3b59dd7bef715505c89/lV/hoppenstedt_hendrik_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523724',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Hermann Otto Solms',
            subtitle: 'FDP, Gießen (WK 173)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525136/3x4/284/379/6fab1885dabd737a7e7d2b1d7db7ddac/bc/solms_hermann_otto_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524040',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Hermann-Josef Tebroke',
            subtitle: 'CDU/CSU, Rheinisch-Bergischer Kreis (WK 100)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531978/3x4/284/379/c692e2a65b23b39ca3ad7ed8e5d9245/Mc/tebroke_hermann_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518586',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Jens Brandenburg',
            subtitle: 'FDP, Rhein-Neckar (WK 277)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518582/3x4/284/379/9d1bd5c2a7f89b21225c46a7b660d640/Vz/brandenburg_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524794',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Jens Zimmermann',
            subtitle: 'SPD, Odenwald (WK 187)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524792/3x4/284/379/7a14094953ada7cb0fd10d78852d6ba1/UX/zimmermann_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524492',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Joe Weingarten',
            subtitle: 'SPD, Kreuznach (WK 201)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/665946/3x4/284/379/da1037ef13c7ca3ea50c3cba4360c5ed/cv/weingarten_joe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521868',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Jürgen Martens',
            subtitle: 'FDP, Zwickau (WK 165)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527116/3x4/284/379/7089c25eadf1ca8d758f27d7164ccb0a/Bl/martens_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520828',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Kirsten Kappert-Gonther',
            subtitle: 'Bündnis 90/Die Grünen, Bremen I (WK 54)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520826/3x4/284/379/3dc9eac891cac2107600250af244c7ea/np/kappert_gonther_kirsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523520',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Klaus-Peter Schulze',
            subtitle: 'CDU/CSU, Cottbus – Spree-Neiße (WK 64)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523518/3x4/284/379/179d5f27eddf35a8bb02a5b6e58fd10a/Ri/schulze_klaus-peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523480',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Manja Schüle',
            subtitle:
              'SPD, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527152/3x4/284/379/927a0acb1717f0bdec3cbf01243926aa/kS/schuele_manja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523046',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Manuela Rottmann',
            subtitle: 'Bündnis 90/Die Grünen, Bad Kissingen (WK 248)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527406/3x4/284/379/212d18a347bbde35405196f9178f8f35/rA/rottmann_manuela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520722',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Marc Jongen',
            subtitle: 'AfD, Neckar-Zaber (WK 266)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527234/3x4/284/379/d7b7b9471fa9f58af829d4c387dd4176/eW/jongen_marc_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521084',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Marcel Klinge',
            subtitle: 'FDP, Schwarzwald-Baar (WK 286)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529924/3x4/284/379/9572bea6b7a51d47c592082b1d67ee9a/my/klinge_marcel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518832',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Marco Buschmann',
            subtitle: 'FDP, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525312/3x4/284/379/79134ae0a18d2ae3bb4cd755049bd48a/xK/buschmann_marco_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519344',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Marcus Faber',
            subtitle: 'FDP, Altmark (WK 66)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527352/3x4/284/379/2c59fb29730d253663646ecb9d91e24e/cV/faber_marcus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523928',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Marie-Agnes Strack-Zimmermann',
            subtitle: 'FDP, Düsseldorf I (WK 106)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527426/3x4/284/379/61f8a9bbb895b999664257c031a6379/xE/strack_zimmermann_marie_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520192',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Matthias Heider',
            subtitle: 'CDU/CSU, Olpe – Märkischer Kreis I (WK 149)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520190/3x4/284/379/c8b41318f2378d4cf00e04a4796d6175/jJ/heider_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519326',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Michael Espendiller',
            subtitle: 'AfD, Steinfurt III (WK 128)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530348/3x4/284/379/d5575848fa5b78a05251b2ddc866c564/bn/espendiller_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523382',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Nils Schmid',
            subtitle: 'SPD, Nürtingen (WK 262)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527066/3x4/284/379/5499615c6f46017d09a87ca22a55480c/YD/schmid_nils_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523000',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Norbert Röttgen',
            subtitle: 'CDU/CSU, Rhein-Sieg-Kreis II (WK 98)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522998/3x4/284/379/87d7e0005b8fc642e951b54ac51360e0/UV/roettgen_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522790',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Peter Ramsauer',
            subtitle: 'CDU/CSU, Traunstein (WK 225)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522788/3x4/284/379/d06b538964cb7bae54d55129977258e3/pk/ramsauer_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524032',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Peter Tauber',
            subtitle: 'CDU/CSU, Main-Kinzig – Wetterau II – Schotten (WK 175)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524030/3x4/284/379/a93fbd641b062fcdfe6fce64f57be2a2/VD/tauber_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523708',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Petra Sitte',
            subtitle: 'Die Linke, Halle (WK 72)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523706/3x4/284/379/fd614bf037038fe6b2209df00e159f09/iX/sitte_petra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521270',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Rainer Kraft',
            subtitle: 'AfD, Augsburg-Land (WK 253)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530390/3x4/284/379/e048c2c86379bcacd183a8d109c78f0c/La/kraft_rainer_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523302',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Robby Schlund',
            subtitle: 'AfD, Gera – Greiz – Altenburger Land (WK 194)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527514/3x4/284/379/de3fa33e7df228d688f1cee944298a09/dO/schlund_robby_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520122',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Roland Hartwig',
            subtitle: 'AfD, Rheinisch-Bergischer Kreis (WK 100)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530366/3x4/284/379/86c5667d428142579897ccba081b4fa3/uq/hartwig_roland_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '524346',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Sahra Wagenknecht',
            subtitle: 'Die Linke, Düsseldorf II (WK 107)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524344/3x4/284/379/c9dc1c532d7f830e8276d7e3a88b90e3/ig/wagenknecht_sahra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521740',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Saskia Ludwig',
            subtitle:
              'CDU/CSU, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527238/3x4/284/379/527e4d07bc55e5af22f09de590f30420/sG/ludwig_saskia_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523086',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Stefan Ruppert',
            subtitle: 'FDP, Hochtaunus (WK 176)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527064/3x4/284/379/1a39acb087ee87db88d46031145bf55d/Jf/ruppert_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520100',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Stephan Harbarth',
            subtitle: 'CDU/CSU, Rhein-Neckar (WK 277)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520098/3x4/284/379/8a69c9b062afaa7d78e152eb51ffa2eb/tY/harbarth_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519672',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Thomas Gebhart',
            subtitle: 'CDU/CSU, Südpfalz (WK 211)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519670/3x4/284/379/74bab85a6d46d929164c552ed0593cfe/vZ/gebhart_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522490',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Tim Ostermann',
            subtitle: 'CDU/CSU, Herford – Minden-Lübbecke II (WK 133)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522488/3x4/284/379/a81322bc600473902ecf1e2ea652b5ec/tb/ostermann_tim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521602',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Ursula von der Leyen',
            subtitle: 'CDU/CSU, Stadt Hannover II (WK 42)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521600/3x4/284/379/e4a505c9d4df382b949016261ba0372b/Hz/von_der_leyen_ursula_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524212',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Volker Ullrich',
            subtitle: 'CDU/CSU, Augsburg-Stadt (WK 252)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524210/3x4/284/379/50b690341cbf9bac4d588dc2c40a22f5/bx/ullrich_volker_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519320',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Wiebke Esdar',
            subtitle: 'SPD, Bielefeld – Gütersloh II (WK 132)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530048/3x4/284/379/22d43c9fbb4fd77d8ef4b52b436103c8/SJ/esdar_wiebke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523274',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Wieland Schinnenburg',
            subtitle: 'FDP, Hamburg-Wandsbek (WK 22)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526694/3x4/284/379/8ce24136a618c0aea6d42121bbec591a/jw/schinnenburg_wieland_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523184',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Wolfgang Schäuble',
            subtitle: 'CDU/CSU, Offenburg (WK 284)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523182/3x4/284/379/f77019de782ec7a1ace13538341f4879/He/schaeuble_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523830',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Wolfgang Stefinger',
            subtitle: 'CDU/CSU, München-Ost (WK 218)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523828/3x4/284/379/a40f9316e8448b9e5d40130d8c113ba1/cA/stefinger_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523944',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Dr. Wolfgang Stengmann-Kuhn',
            subtitle: 'Bündnis 90/Die Grünen, Offenbach (WK 185)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523942/3x4/284/379/d182a9cb9b94401749d242a41fe8049f/lX/strengmann_kuhn_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519728',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Eberhard Gienger',
            subtitle: 'CDU/CSU, Neckar-Zaber (WK 266)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519726/3x4/284/379/1d7f74817620c54ca55cfc431a598e80/fL/gienger_eberhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519760',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Eckhard Gnodtke',
            subtitle: 'CDU/CSU, Altmark (WK 66)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529946/3x4/284/379/5ecd9a2df1e241573a9882293e8ef6ae/vK/gnodtke_eckhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522682',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Eckhard Pols',
            subtitle: 'CDU/CSU, Lüchow-Dannenberg – Lüneburg (WK 37)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522680/3x4/284/379/d149a658610502354f0c70c85e265fd8/tr/Pols_Eckhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522826',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Eckhardt Rehberg',
            subtitle:
              'CDU/CSU, Mecklenburgische Seenplatte II – Landkreis Rostock III (WK 17)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522824/3x4/284/379/61a30183e35ddaeecb6a2488f86ad345/SW/rehberg_eckhardt_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518994',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ekin Deligöz',
            subtitle: 'Bündnis 90/Die Grünen, Neu-Ulm (WK 255)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518992/3x4/284/379/dd92647b6570e05c078bee0e7e8d61bd/be/deligoez_ekin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520786',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Elisabeth Kaiser',
            subtitle: 'SPD, Gera – Greiz – Altenburger Land (WK 194)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529176/3x4/284/379/d1e1155ff5a831aa8721d76942c4d95c/Ji/kaiser_elisabeth_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522132',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Elisabeth Motschmann',
            subtitle: 'CDU/CSU, Bremen I (WK 54)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522130/3x4/284/379/5c5f7c8982e7d331a0b4194e9896b0dd/XB/motschmann_elisabeth_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524618',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Elisabeth Winkelmeier-Becker',
            subtitle: 'CDU/CSU, Rhein-Sieg-Kreis I (WK 97)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524616/3x4/284/379/d78fbff7395810fd94e87030a364e79b/RL/winkelmeier_becker_elisabeth_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521238',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Elvan Korkmaz-Emre',
            subtitle: 'SPD, Gütersloh I (WK 131)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530052/3x4/284/379/7b84f6978914f3cfe01c0d8d8b3da304/kj/korkmaz_elvan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524762',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Emmi Zeulner',
            subtitle: 'CDU/CSU, Kulmbach (WK 240)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524760/3x4/284/379/37a57a9d6a5615fae924ae1df442691c/kP/zeulner_emmi_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519418',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Enak Ferlemann',
            subtitle: 'CDU/CSU, Cuxhaven – Stade II (WK 29)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519416/3x4/284/379/867f2580de006a390a2196c0868a9759/rq/ferlemann_enak_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521216',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Enrico Komning',
            subtitle:
              'AfD, Mecklenburgische Seenplatte I – Vorpommern-Greifswald II (WK 16)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521214/3x4/284/379/b369a08b53dbbbfee4448850711f1ea7/ud/komning_enrico_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519936',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Erhard Grundl',
            subtitle: 'Bündnis 90/Die Grünen, Straubing (WK 231)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527398/3x4/284/379/af57f8b126c0b5c6cea74d2015cb655a/JJ/grundl_erhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520618',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Erich Irlstorfer',
            subtitle: 'CDU/CSU, Freising (WK 214)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520616/3x4/284/379/63228ef20a858edb33573fcb2a8601ed/Ut/irlstorfer_erich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523026',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ernst Dieter Rossmann',
            subtitle: 'SPD, Pinneberg (WK 7)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523024/3x4/284/379/9bde22a18f987f87bdf4bd59c2c24900/Ol/rossmann_ernst_dieter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '517818',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ernst-Michael von Abercron',
            subtitle: 'CDU/CSU, Pinneberg (WK 7)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517814/3x4/284/379/44705ba6437fdb469214524dfc06a477/UK/abercron_ernst_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523064',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Erwin Rüddel',
            subtitle: 'CDU/CSU, Neuwied (WK 197)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523062/3x4/284/379/6ce0c875e08dc110ec32d6a846a22f15/FS/rueddel_erwin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519056',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Esther Dilcher',
            subtitle: 'SPD, Waldeck (WK 167)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530044/3x4/284/379/52a656e3ac23f8067fd5d25c9b9eb722/XW/dilcher_esther_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523460',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Eva-Maria Schreiber',
            subtitle: 'Die Linke, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529202/3x4/284/379/5fb09114722176c759fe386cf0012368/bV/schreiber_eva_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523548',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ewald Schurer',
            subtitle: 'SPD, Erding – Ebersberg (WK 213)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523546/3x4/284/379/42b28d776d3d4e76c86aeb7d09023cdf/Vs/schurer_ewald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520638',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Fabian Jacobi',
            subtitle: 'AfD, Köln I (WK 93)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530384/3x4/284/379/9162c876bf411f49be07ae4c7f3de028/xZ/jacobi_fabian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521884',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Fabio De Masi',
            subtitle: 'Die Linke',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521882/3x4/284/379/c30c396d3e595bddd63dc7c437c11c7b/fm/de_masi_fabio_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522094',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Falko Mohrs',
            subtitle: 'SPD, Helmstedt – Wolfsburg (WK 51)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530056/3x4/284/379/eb53a60539adc1399b93c4acf66da4e9/xw/mohrs_falko_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523462',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Felix Schreiner',
            subtitle: 'CDU/CSU, Waldshut (WK 288)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526252/3x4/284/379/15a8a03ea61732f845542c84a4ef9654/Fm/schreiner_felix_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522678',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Filiz Polat',
            subtitle: 'Bündnis 90/Die Grünen, Osnabrück-Land (WK 38)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526706/3x4/284/379/2ffd270243dabf83de8f194c7982c250/Nw/polat_filiz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520046',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Florian Hahn',
            subtitle: 'CDU/CSU, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520044/3x4/284/379/5c44c823156e6b3d5063768b84d5dfb9/Gk/hahn_florian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522698',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Florian Post',
            subtitle: 'SPD, München-Nord (WK 217)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522696/3x4/284/379/bd2bdc263af1397b99c91da470f5cc2d/jW/post_florian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522720',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Florian Pronold',
            subtitle: 'SPD, Rottal-Inn (WK 230)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522718/3x4/284/379/214be5df27d7eca3d4a4f71b2b2a5ddd/QY/pronold_florian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520234',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Heinrich',
            subtitle: 'CDU/CSU, Chemnitz (WK 162)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520230/3x4/284/379/c6433a910e406c67b9dad0f5bc73d0a0/FY/heinrich_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520734',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Junge',
            subtitle:
              'SPD, Ludwigslust-Parchim II – Nordwestmecklenburg II – Landkreis Rostock I (WK 13)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520732/3x4/284/379/1053a6bd70133350f7829ba413e53464/wE/junge_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521796',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Magnitz',
            subtitle: 'AfD, Bremen II – Bremerhaven (WK 55)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530266/3x4/284/379/566dff295cced6db172d66c7907046ed/yh/magnitz_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522208',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Müller-Rosentritt',
            subtitle: 'FDP, Chemnitz (WK 162)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527344/3x4/284/379/c55dac7434b12599ec3bd26c3b8a36c9/cU/mueller_rosentritt_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522548',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Pasemann',
            subtitle: 'fraktionslos, Magdeburg (WK 69)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530396/3x4/284/379/16158cb185b63a2ae3f31ab34026b898/EZ/pasemann_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '523178',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Schäffler',
            subtitle: 'FDP, Minden-Lübbecke I (WK 134)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527272/3x4/284/379/af570d235bb6fa532cb2738a15cdfc76/Xv/schaeffler_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523704',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Sitta',
            subtitle: 'FDP, Halle (WK 72)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527230/3x4/284/379/1a9f0440c6fa040a7aaef7d2c6909cf0/LV/sitta_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523820',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Frank Steffel',
            subtitle: 'CDU/CSU, Berlin-Reinickendorf (WK 77)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523818/3x4/284/379/fb18bd8160d7e10e27eb0efcf8b79f1c/qm/steffel_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518622',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Franziska Brantner',
            subtitle: 'Bündnis 90/Die Grünen, Heidelberg (WK 274)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518620/3x4/284/379/b8a3cd7caea4001d6a5051dad0d183a6/Vc/brantner_Franziska_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519758',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Franziska Gminder',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529620/3x4/284/379/24f0e4d40ad4d22fc11d82b34958e35a/gv/gminder_franziska_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522482',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Friedrich Ostendorff',
            subtitle: 'Bündnis 90/Die Grünen, Coesfeld – Steinfurt II (WK 127)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522480/3x4/284/379/2051bc6d93c7126520a959892b0a055f/FK/ostendorff_friedrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523930',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Friedrich Straetmanns',
            subtitle: 'Die Linke, Bielefeld – Gütersloh II (WK 132)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525508/3x4/284/379/6bb307b65660f6267700e1efbf0adf77/pa/straetmanns_friedrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519406',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Fritz Felgentreu',
            subtitle: 'SPD, Berlin-Neukölln (WK 82)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519404/3x4/284/379/beb3581d1a74abdd73f1833491d6cfd7/XQ/felgentreu_fritz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519962',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Fritz Güntzler',
            subtitle: 'CDU/CSU, Göttingen (WK 53)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519958/3x4/284/379/ffe75ce3508b19055d15aba55d3a24f/gv/guentzler_fritz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524448',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gabi Weber',
            subtitle: 'SPD, Montabaur (WK 204)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524446/3x4/284/379/6cf8adc760f6f3aec378b0c56d59baae/rI/weber_gabriele_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520238',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gabriela Heinrich',
            subtitle: 'SPD, Nürnberg-Nord (WK 244)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520236/3x4/284/379/e7fa8125324b90ccb146109ccf1f2975/xx/heinrich_gabriela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520376',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gabriele Hiller-Ohm',
            subtitle: 'SPD, Lübeck (WK 11)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520374/3x4/284/379/37db59e28b2f8f7eb157210000f687ed/Ye/hiller_ohm_gabriele_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520884',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gabriele Katzmarek',
            subtitle: 'SPD, Rastatt (WK 273)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520882/3x4/284/379/776247002b6892eaa6576ec1600e3c75/Il/katzmarek_gabriele_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521008',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Georg Kippels',
            subtitle: 'CDU/CSU, Rhein-Erft-Kreis I (WK 91)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521006/3x4/284/379/70c5aaf8ca86605680598e0da9ca596/fN/kippels_georg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524206',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gerald Ullrich',
            subtitle:
              'FDP, Suhl – Schmalkalden-Meiningen – Hildburghausen – Sonneberg (WK 196)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529174/3x4/284/379/ffccc2449783dceeb98c6af533798f00/hV/ullrich_gerald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522180',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gerd Müller',
            subtitle: 'CDU/CSU, Oberallgäu (WK 256)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522178/3x4/284/379/c8f81960fe8ee28926d898152b8891b2/jz/mueller_gerd_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523240',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gerhard Schick',
            subtitle: 'Bündnis 90/Die Grünen, Mannheim (WK 275)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523238/3x4/284/379/3a5389691e36bb1731840c4aa10b53f2/kw/schick_gerhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524764',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gerhard Zickenheiner',
            subtitle: 'Bündnis 90/Die Grünen, Lörrach – Müllheim (WK 282)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526400/3x4/284/379/d0fa361ec0e85ab174c437be7ac23617/HZ/zickenheiner_gerhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523920',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gero Storjohann',
            subtitle: 'CDU/CSU, Segeberg – Stormarn-Mitte (WK 8)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523918/3x4/284/379/1ca0bf39c414af2ac1eff7ca9ea8eade/DM/storjohann_gero_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522500',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gerold Otten',
            subtitle: 'AfD, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529626/3x4/284/379/7a3206a21a5e0332791e059d208b16d2/xA/otten_gerold_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521686',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gesine Lötzsch',
            subtitle: 'Die Linke, Berlin-Lichtenberg (WK 86)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521684/3x4/284/379/f0abe0a5b92f3676a9a387e0796f8e56/Pc/loetzsch_gesine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521840',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gisela Manderla',
            subtitle: 'CDU/CSU, Köln III (WK 95)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521838/3x4/284/379/3a66c27ef6439747f36b48de87c04470/GW/manderla_gisela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518902',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gitta Connemann',
            subtitle: 'CDU/CSU, Unterems (WK 25)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518898/3x4/284/379/57aeea1c59dff23676df14f39a3c9c6e/Dm/connemann_gitta_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518934',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gottfried Curio',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525748/3x4/284/379/d301a73e32fe67399d453669dd421c43/Bx/curio_gottfried_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519984',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gregor Gysi',
            subtitle: 'Die Linke, Berlin-Treptow-Köpenick (WK 84)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519980/3x4/284/379/500eb465292720b942ecb17c6c46619c/eL/gysi_gregor_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '517836',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Grigorios Aggelidis',
            subtitle: 'FDP, Hannover-Land I (WK 43)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527060/3x4/284/379/8b7483738680fc1b7b616540a5a61fc2/yy/aggelidis_grigorios_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521310',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gunther Krichbaum',
            subtitle: 'CDU/CSU, Pforzheim (WK 279)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521308/3x4/284/379/21a6b69654a85663feefbd3dd3646120/kO/krichbaum_gunther_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520344',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gustav Herzog',
            subtitle: 'SPD, Kaiserslautern (WK 209)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520342/3x4/284/379/288985b67b6da58949be617a6b16d5c5/Ki/herzog_gustav_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520698',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gyde Jensen',
            subtitle: 'FDP',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526442/3x4/284/379/f3e3c12d5e62e70921bd5072b6b141e7/Xk/jensen_gyde_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '517852',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gökay Akbulut',
            subtitle: 'Die Linke, Mannheim (WK 275)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517848/3x4/284/379/d33861d349d2ff4ffee9cdc22e3112a4/fC/akbulut_goekay_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524724',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Gülistan Yüksel',
            subtitle: 'SPD, Mönchengladbach (WK 109)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524722/3x4/284/379/a741854e5a3f0d597e6ed689250cad65/Jk/yueksel_guelistan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522862',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hagen Reinhold',
            subtitle: 'FDP, Rostock – Landkreis Rostock II (WK 14)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529882/3x4/284/379/54349bcb207f8ee35f9f234aafc73004/fi/reinhold_hagen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522016',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hans Michelbach',
            subtitle: 'CDU/CSU, Coburg (WK 238)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522014/3x4/284/379/1a8d5eb7e10b3d1d7d2d0b4f3f5535dd/qZ/michelbach_hans_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519590',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hans-Joachim Fuchtel',
            subtitle: 'CDU/CSU, Calw (WK 280)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519588/3x4/284/379/797a167f2806d77157bb1ed1da0c1ea8/dU/fuchtel_hans_joachim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520624',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hans-Jürgen Irmer',
            subtitle: 'CDU/CSU, Lahn-Dill (WK 172)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520620/3x4/284/379/a3a58e6ee55512377794abc95ef45b27/xo/irmer_hans_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524094',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hans-Jürgen Thies',
            subtitle: 'CDU/CSU, Soest (WK 146)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526222/3x4/284/379/4ddc20acba6df28ca0ef06737103034/Ot/thies_hans_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519560',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hans-Peter Friedrich',
            subtitle: 'CDU/CSU, Hof (WK 239)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519558/3x4/284/379/84986d675a6727fe078fa567841f9145/RT/friedrich_hans_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519170',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hansjörg Durz',
            subtitle: 'CDU/CSU, Augsburg-Land (WK 253)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519168/3x4/284/379/b5c6486c843d8ae65c3b4823c72ca31a/ck/durz_hans-joerg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522184',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hansjörg Müller',
            subtitle: 'AfD, Traunstein (WK 225)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522182/3x4/284/379/bea897b5c7c494430889f89cd8c671ce/Or/mueller_hansjoerg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519194',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Harald Ebner',
            subtitle:
              'Bündnis 90/Die Grünen, Schwäbisch Hall – Hohenlohe (WK 268)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519192/3x4/284/379/66825d04a784b3ece7aa8a2708c36f0b/qP/ebner_harald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524486',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Harald Weinberg',
            subtitle: 'Die Linke, Ansbach (WK 241)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524484/3x4/284/379/49868a22173af4ee6dd5ab68416808de/aG/weinberg_harald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519180',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hartmut Ebbing',
            subtitle: 'FDP, Berlin-Steglitz-Zehlendorf (WK 79)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527166/3x4/284/379/af6b515735943cb5f92cb48f20dd5682/Bh/ebbing_hartmut_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518490',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Heidrun Bluhm-Förster',
            subtitle:
              'Die Linke, Mecklenburgische Seenplatte II – Landkreis Rostock III (WK 17)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518486/3x4/284/379/892eec2ae03d3204c22c8208a0450498/jS/bluhm_heidrun_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518086',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Heike Baehrens',
            subtitle: 'SPD, Göppingen (WK 263)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518082/3x4/284/379/3cededdb7f146c9512bc43a1de13ba59/kQ/baehrens_heike_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518658',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Heike Brehmer',
            subtitle: 'CDU/CSU, Harz (WK 68)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518656/3x4/284/379/724b894bc836d0b0a9ed056fedcb106a/Zk/brehmer_heike_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521782',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Heiko Maas',
            subtitle: 'SPD, Saarlouis (WK 297)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527336/3x4/284/379/3939ee734092f1afdd7e5ff7cd7f6ce3/yC/maas_heiko_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518636',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Helge Braun',
            subtitle: 'CDU/CSU, Gießen (WK 173)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518634/3x4/284/379/a94760a26852c33d37ee5686bba9fc63/BV/braun_helge_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521638',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Helge Lindh',
            subtitle: 'SPD, Wuppertal I (WK 102)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530054/3x4/284/379/d2e2e23cc8f94c63b9ab3db8a1df0493/Ww/lindh_helge_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523732',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Helin Evrim Sommer',
            subtitle: 'Die Linke',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523730/3x4/284/379/f92a19055dd5fc7736f4137ad335dbe1/yp/sommer_helin_evrim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522506',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Henning Otte',
            subtitle: 'CDU/CSU, Celle – Uelzen (WK 44)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522504/3x4/284/379/6440cc4c379611fef3849dd10e184e74/Fj/otte_henning_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520400',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Heribert Hirte',
            subtitle: 'CDU/CSU, Köln II (WK 94)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520398/3x4/284/379/2def6ddace2f14556309eb978481d541/yT/hirte_heribert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519352',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hermann Färber',
            subtitle: 'CDU/CSU, Göppingen (WK 263)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519350/3x4/284/379/994ca2fac12a0d38e23a23deb9c8a364/Ql/faerber_hermann_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519870',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hermann Gröhe',
            subtitle: 'CDU/CSU, Neuss I (WK 108)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519868/3x4/284/379/8c7ca66e1ea7bec2e0d229faa9e7fa78/iO/groehe_hermann_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521900',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hilde Mattheis',
            subtitle: 'SPD, Ulm (WK 291)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521898/3x4/284/379/f5009967e37fbc82fa0c46b9fe32d5e3/RU/mattheis_hilde_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '809300',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hiltrud Lotze',
            subtitle: 'SPD, Lüchow-Dannenberg – Lüneburg (WK 37)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521716/3x4/284/379/60d6b6725c31f4e2f43ec22ad2a0cdec/uK/lotze_hiltrud_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520210',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hubertus Heil',
            subtitle: 'SPD, Gifhorn – Peine (WK 45)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520208/3x4/284/379/3675ad7aa802dd0610e6e58b921832a/Ti/heil_hubertus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524740',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hubertus Zdebel',
            subtitle: 'Die Linke, Münster (WK 129)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524738/3x4/284/379/b164585fddf6ff336810c90f4a3f11fc/no/zdebel_hubertus_josef_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520020',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Hänsel Heike',
            subtitle: 'Die Linke, Tübingen (WK 290)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520018/3x4/284/379/7406458d6d10f279c60fea756a4ff7d/Gu/haensel_heike_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520748',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingmar Jung',
            subtitle: 'CDU/CSU, Wiesbaden (WK 179)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520746/3x4/284/379/f75d92c41958975f14481912c7c763d4/mD/jung_ingmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519630',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingo Gädechens',
            subtitle: 'CDU/CSU, Ostholstein – Stormarn-Nord (WK 9)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519628/3x4/284/379/612e5b3ef55321b2ef2ad20f842b242e/EF/gaedechens_ingo_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524522',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingo Wellenreuther',
            subtitle: 'CDU/CSU, Karlsruhe-Stadt (WK 271)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524520/3x4/284/379/b574140a8270200518c4829e1ed607dc/mX/wellenreuther_ingo_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517974',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingrid Arndt-Brauer',
            subtitle: 'SPD, Steinfurt I – Borken I (WK 124)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517970/3x4/284/379/9fbc1e9b2e61249b0c4c5d501018be93/Go/arndt_brauer_ingrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522290',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingrid Nestle',
            subtitle:
              'Bündnis 90/Die Grünen, Steinburg – Dithmarschen Süd (WK 3)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527294/3x4/284/379/9b88dd7d373d5707aecef75d82714155/io/nestle_ingrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522528',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingrid Pahlmann',
            subtitle: 'CDU/CSU, Gifhorn – Peine (WK 45)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522526/3x4/284/379/9cc2b1ed08e18b1c7040dfb9df03d751/eF/pahlmann_ingrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522878',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ingrid Remmers',
            subtitle: 'Die Linke, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526844/3x4/284/379/970dfb7c5e8afa4166cb6e607b9b6ba4/qJ/remmers_ingrid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522036',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Irene Mihalic',
            subtitle: 'Bündnis 90/Die Grünen, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522034/3x4/284/379/8802aef4b3cf432a958a6bbc33d69ee7/XK/mihalic_irene_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521786',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Isabel Mackensen-Geis',
            subtitle: 'SPD, Neustadt – Speyer (WK 208)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/653546/3x4/284/379/d37f73e2edf1923c444631aafc124485/yy/mackensen-geis_isabel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521242',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jan Korte',
            subtitle: 'Die Linke, Anhalt (WK 71)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521240/3x4/284/379/ad12ad0b3d2e2533a92c86ab926952f3/lQ/korte_jan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521988',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jan Metzler',
            subtitle: 'CDU/CSU, Worms (WK 206)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521986/3x4/284/379/1033bcf4aab712070b655816647f3951/mA/metzler_jan_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522390',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jan Nolte',
            subtitle: 'AfD, Waldeck (WK 167)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522388/3x4/284/379/daa1a611437a13ae4bba111acdf32dbf/gf/nolte_jan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521730',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jan-Marco Luczak',
            subtitle: 'CDU/CSU, Berlin-Tempelhof-Schöneberg (WK 81)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521728/3x4/284/379/7d25c3d1df5330d6664b19001598c93a/cQ/luczak_jan_marco_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523268',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jana Schimke',
            subtitle:
              'CDU/CSU, Dahme-Spreewald – Teltow-Fläming III – Oberspreewald-Lausitz I (WK 62)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523266/3x4/284/379/a193fe99dd151f8d9beb2eb2d522a401/VS/schimke_jana_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518958',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Janosch Dahmen',
            subtitle: 'Bündnis 90/Die Grünen, Ennepe-Ruhr-Kreis II (WK 139)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/815306/3x4/284/379/3b484c9d3be004504bf534a06211ec28/xX/dahmen_janosch_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518256',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Beeck',
            subtitle: 'FDP, Mittelems (WK 31)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525924/3x4/284/379/73c4fb8c60f2e4c64b7d5467b446c1f1/Tj/beeck_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520974',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Kestner',
            subtitle: 'AfD, Goslar – Northeim – Osterode (WK 52)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530388/3x4/284/379/5b49bfa46615ee9c883367c7c46d812/XR/kestner_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521170',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Koeppen',
            subtitle: 'CDU/CSU, Uckermark – Barnim I (WK 57)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521168/3x4/284/379/f42976ad2f015b3192996b4e63d114b3/lK/koeppen_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521530',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Lehmann',
            subtitle: 'CDU/CSU, Leipzig I (WK 152)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531392/3x4/284/379/28f42022041eb8ab408f911b744687ad/Wv/lehmann_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521808',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Maier',
            subtitle: 'AfD, Dresden I (WK 159)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526754/3x4/284/379/dbdf8f231028b0e61e0fe191b834d171/tE/maier_jens_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523750',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jens Spahn',
            subtitle: 'CDU/CSU, Steinfurt I – Borken I (WK 124)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523748/3x4/284/379/ffebe1b57aed4c2c60a4fae6ee231e8b/YU/spahn_jens_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524028',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jessica Tatti',
            subtitle: 'Die Linke, Reutlingen (WK 289)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524026/3x4/284/379/97a20fceac79c56bc9368ac81934248a/Ol/tatti_jessica_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523530',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jimmy Schulz',
            subtitle: 'FDP, München-Land (WK 221)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527024/3x4/284/379/174d82bec246dcf3fed8f693cfdc5e7f/NZ/schulz_jimmy_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522616',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Joachim Pfeiffer',
            subtitle: 'CDU/CSU, Waiblingen (WK 264)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522614/3x4/284/379/ca2d9df770ddc5b942ad4054dbfeaafe/qu/pfeiffer_joachim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518922',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Joana Cotar',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518920/3x4/284/379/ef048ea4669a1e86502479844622f22a/Bm/cotar_joana_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520146',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jochen Haug',
            subtitle: 'AfD, Köln II (WK 94)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530358/3x4/284/379/38579823e4f62d8e71bb8aff2ea5f3b4/mS/haug_jochen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523108',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johann Saathoff',
            subtitle: 'SPD, Aurich – Emden (WK 24)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523106/3x4/284/379/3d86e0ce15d73674dd6c734fbeaaae02/mk/saathoff_johann_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524332',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johann Wadephul',
            subtitle: 'CDU/CSU, Rendsburg-Eckernförde (WK 4)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524330/3x4/284/379/cbeae6b0e8cb7107a695a1555b6b07d9/yi/wadephul_johann_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519374',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Fechner',
            subtitle: 'SPD, Emmendingen – Lahr (WK 283)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519370/3x4/284/379/363bb4254ecc86a482aa9791447b045b/eV/fechner_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520544',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Huber',
            subtitle: 'AfD, Freising (WK 214)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530364/3x4/284/379/230e8f715e54815b0c134523ec18d30a/oG/huber_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520784',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Kahrs',
            subtitle: 'SPD, Hamburg-Mitte (WK 18)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520782/3x4/284/379/60a3e62dc1c5cbcf96917b84dde19b14/fw/kahrs_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523456',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Schraps',
            subtitle: 'SPD, Hameln-Pyrmont – Holzminden (WK 46)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527446/3x4/284/379/f456061d941e8d67004e4dd3742487b6/ZC/schraps_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523646',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Selle',
            subtitle: 'CDU/CSU, Jena – Sömmerda – Weimarer Land I (WK 191)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523644/3x4/284/379/94f1d626e4780848d0fe092647b1118c/ys/Selle_Johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523860',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Steiniger',
            subtitle: 'CDU/CSU, Neustadt – Speyer (WK 208)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523858/3x4/284/379/bba6f9ab2b0b9140af16e1f902975a0d/wD/steiniger_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524280',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Johannes Vogel',
            subtitle: 'FDP, Olpe – Märkischer Kreis I (WK 149)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526950/3x4/284/379/e36f8e4b2e061a7c6595f1cfcfec2811/JE/vogel_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522496',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Josef Oster',
            subtitle: 'CDU/CSU, Koblenz (WK 199)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522494/3x4/284/379/23c5d0777a56f656e272d8ee83970efd/EL/oster_josef_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522930',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Josef Rief',
            subtitle: 'CDU/CSU, Biberach (WK 292)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522928/3x4/284/379/65067cdf5ee6293d69d63cf1f3082d73/Pk/rief_josef_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522474',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Josephine Ortleb',
            subtitle: 'SPD, Saarbrücken (WK 296)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526494/3x4/284/379/f2f09b056f217b7840631e454e0de5ba/OS/ortleb_josephine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520758',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Josip Juratovic',
            subtitle: 'SPD, Heilbronn (WK 267)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520756/3x4/284/379/b3922a9a62ba535a367ffd6bca9abaea/XS/juratovic_josip_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523710',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Judith Skudelny',
            subtitle: 'FDP, Stuttgart I (WK 258)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531224/3x4/284/379/fa73971ab6e4254a0489281dab6f4389/av/skudelny_judith_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524256',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Julia Verlinden',
            subtitle:
              'Bündnis 90/Die Grünen, Lüchow-Dannenberg – Lüneburg (WK 37)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524254/3x4/284/379/44c88b07b931609fe044c361220b261a/LM/verlinden_julia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521296',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jutta Krellmann',
            subtitle: 'Die Linke, Hameln-Pyrmont – Holzminden (WK 46)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521294/3x4/284/379/1adcc7c2c8c1732c822a33c887eb961a/pu/krellmann_jutta_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518870',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jörg Cezanne',
            subtitle: 'Die Linke, Groß-Gerau (WK 184)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525614/3x4/284/379/76036b4a82c8e1ad5711e19ef8b1a0ac/jf/cezanne_joerg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523406',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jörg Schneider',
            subtitle: 'AfD, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526746/3x4/284/379/283ac483d7c97d536b56ef275ae2f449/Uj/schneider_joerg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521164',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jörn König',
            subtitle: 'AfD, Stadt Hannover I (WK 41)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521160/3x4/284/379/35ee56dde1e55d67c650735951ab2ef8/Np/koenig_joern_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518640',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jürgen Braun',
            subtitle: 'AfD, Waiblingen (WK 264)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530320/3x4/284/379/471e115166264cfda10a101384642d88/Ar/braun_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522674',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jürgen H. Pohl',
            subtitle: 'AfD, Eichsfeld – Nordhausen – Kyffhäuserkreis (WK 189)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522672/3x4/284/379/90858205f2293c6fb0c88f8819f2be85/ne/pohl_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520110',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jürgen Hardt',
            subtitle: 'CDU/CSU, Solingen – Remscheid – Wuppertal II (WK 103)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520108/3x4/284/379/2f9b71ae4c47085a876adaf6dcbccf4d/mU/hardt_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524164',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Jürgen Trittin',
            subtitle: 'Bündnis 90/Die Grünen, Göttingen (WK 53)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524162/3x4/284/379/36e0074986224945a3eceb3aa288f5c2/ii/trittin_juergen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519682',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kai Gehring',
            subtitle: 'Bündnis 90/Die Grünen, Essen III (WK 120)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519678/3x4/284/379/b0df8361d48be98b37d1fd2f2f60aacd/OZ/gehring_kai_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524464',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kai Wegner',
            subtitle: 'CDU/CSU, Berlin-Spandau – Charlottenburg Nord (WK 78)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524462/3x4/284/379/7f80d6060a1175a1c2254eb3d3c61647/WS/wegner_kai_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524576',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kai Whittaker',
            subtitle: 'CDU/CSU, Rastatt (WK 273)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524574/3x4/284/379/6aff2aee3d78e7a5d3f1d082761488b3/jW/whittaker_kai_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519016',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karamba Diaby',
            subtitle: 'SPD, Halle (WK 72)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519014/3x4/284/379/bfeb1f4efb345be6f3eb6c5fef8ba68b/bO/diaby_karamba_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521780',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karin Maag',
            subtitle: 'CDU/CSU, Stuttgart II (WK 259)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521778/3x4/284/379/7f1e33dcfb5f955e1758ed4713cfeb35/aF/maag_karin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521466',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karl A. Lamers',
            subtitle: 'CDU/CSU, Heidelberg (WK 274)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521464/3x4/284/379/a0d315ea383ec19e1da6e3808d9d75f0/zL/lamers_karl_a__gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520854',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karl Alois',
            subtitle: 'CDU/CSU, Amberg (WK 232)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520852/3x4/284/379/3dc856a8bd7b4df367d045ca678af129/II/karl_alois_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520494',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karl Holmeier',
            subtitle: 'CDU/CSU, Schwandorf (WK 234)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520492/3x4/284/379/c76bb1c2c022ca6497a46b49bd4ca2e1/HM/holmeier_karl_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521508',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karl Lauterbach',
            subtitle: 'SPD, Leverkusen – Köln IV (WK 101)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521506/3x4/284/379/aa22ff8650cb5286d4a2446638688c17/kW/lauterbach_karl_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518734',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karl-Heinz Brunner',
            subtitle: 'SPD, Neu-Ulm (WK 255)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518732/3x4/284/379/e7293292805c93024ac9b7e12ff57e90/Dj/brunner_karlheinz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518838',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karlheinz Busen',
            subtitle: 'FDP, Borken II (WK 126)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525954/3x4/284/379/d7117ca8382388ffa50557095ed02f27/XG/busen_karlheinz_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520382',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karsten Hilse',
            subtitle: 'AfD, Bautzen I (WK 156)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530362/3x4/284/379/429df60c014737d62bd9d44e2c3698a0/Yo/hilse_karsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521060',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karsten Klein',
            subtitle: 'FDP, Aschaffenburg (WK 247)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529944/3x4/284/379/d61f1ae5a3d09b0545c448a157b5ca24/sw/klein_karsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522086',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Karsten Möring',
            subtitle: 'CDU/CSU, Köln I (WK 93)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522084/3x4/284/379/81b56a609a70a1923c84f9fff90c132/uK/moering_karsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518134',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katarina Barley',
            subtitle: 'SPD, Trier (WK 203)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518132/3x4/284/379/9ae39b14eb014cc4a2a88ae1999f5f60/Nj/barley_katarina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519146',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katharina Dröge',
            subtitle: 'Bündnis 90/Die Grünen, Köln III (WK 95)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519144/3x4/284/379/79423c3dde18b44080c006bcac022d7a/Za/droege_katharina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521472',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katharina Landgraf',
            subtitle: 'CDU/CSU, Leipzig-Land (WK 154)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521470/3x4/284/379/5ec892deadd4c18a5f5209daf60f8cec/bV/landgraf_katharina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521088',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katharina Willkomm',
            subtitle: 'FDP, Düren (WK 90)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526390/3x4/284/379/bc4e18f36029d979d295e4a3264d0d0/JL/willkomm_katharina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524288',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kathrin Vogler',
            subtitle: 'Die Linke, Steinfurt III (WK 128)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524286/3x4/284/379/f1bf283837a492236dbf48040b3d7ebb/cd/vogler_kathrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519088',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Dörner',
            subtitle: 'Bündnis 90/Die Grünen, Bonn (WK 96)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519084/3x4/284/379/9d5a92468e16eb69cdc2a6f754a2680e/pW/doerner_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520346',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Hessel',
            subtitle: 'FDP, Nürnberg-Nord (WK 244)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527242/3x4/284/379/b61b29560201cfa75fde51f1854554e1/gE/hessel_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520978',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Keul',
            subtitle: 'Bündnis 90/Die Grünen, Nienburg II – Schaumburg (WK 40)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520976/3x4/284/379/558a92b61b4c13d78d16ec5a3d55a609/HS/keul_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521012',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Kipping',
            subtitle: 'Die Linke, Dresden I (WK 159)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521010/3x4/284/379/dc9212f4a58dd4bbbf0482d6cb6c49d3/GB/kipping_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521554',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Leikert',
            subtitle: 'CDU/CSU, Hanau (WK 180)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521552/3x4/284/379/816f4809be2c73b2b87fbc0616c0dcf3/hP/leikert_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521890',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Mast',
            subtitle: 'SPD, Pforzheim (WK 279)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521888/3x4/284/379/ee4cd9564c11c73681d210b40e709035/OI/mast_katja_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523980',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katja Suding',
            subtitle: 'FDP, Hamburg-Altona (WK 19)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527036/3x4/284/379/c6be1fdc3528edc23b66b6a08fc307e6/Fq/suding_katja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518760',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katrin Budde',
            subtitle: 'SPD, Mansfeld (WK 74)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529828/3x4/284/379/6dd5e226990799dcbf4ab188cd2cdc10/Tv/budde_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519782',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katrin Göring-Eckardt',
            subtitle:
              'Bündnis 90/Die Grünen, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519780/3x4/284/379/8caec0b17d0ec4852f2fee9c064ea3b3/CU/goering_eckardt_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520262',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katrin Helling-Plahr',
            subtitle: 'FDP, Hagen – Ennepe-Ruhr-Kreis I (WK 138)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525610/3x4/284/379/9bf797d897a14758facece67c3bdd8a0/hA/helling_plahr_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523796',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katrin Staffler',
            subtitle: 'CDU/CSU, Fürstenfeldbruck (WK 215)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526286/3x4/284/379/2e31ee1778ffc0357a22ac7cfe7c8d98/Ew/staffler_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524548',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Katrin Werner',
            subtitle: 'Die Linke, Trier (WK 203)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524546/3x4/284/379/22c3e33ed4f8e06e6b4d05e05977c3/Jy/werner_katrin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519824',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kay Gottschalk',
            subtitle: 'AfD, Viersen (WK 111)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527512/3x4/284/379/a3c23ffb83de17a04d9dae2926c76de2/bH/gottschalk_kay_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '524322',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kees de Vries',
            subtitle: 'CDU/CSU, Anhalt (WK 71)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524320/3x4/284/379/bec3c373c50020039b1a7f95b44bbe2d/RU/de_vries_kees_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523864',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kersten Steinke',
            subtitle:
              'Die Linke, Eichsfeld – Nordhausen – Kyffhäuserkreis (WK 189)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523862/3x4/284/379/a788fb9089188617e3aade991dc187d1/xk/steinke_kersten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '517928',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kerstin Andreae',
            subtitle: 'Bündnis 90/Die Grünen, Freiburg (WK 281)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517924/3x4/284/379/cb0200e57e3ace0f4932ca61e934aedc/XS/andreae_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519850',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kerstin Griese',
            subtitle: 'SPD, Mettmann II (WK 105)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519848/3x4/284/379/8fa39db810a6c9fc19d32fa6b5dfe328/On/griese_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520872',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kerstin Kassner',
            subtitle:
              'Die Linke, Vorpommern-Rügen – Vorpommern-Greifswald I (WK 15)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520870/3x4/284/379/8079b336e278f2c96c49c371fefffe29/Lm/kassner_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524014',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kerstin Tack',
            subtitle: 'SPD, Stadt Hannover I (WK 41)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524012/3x4/284/379/dca5c9abc22bfb379dfc23ceaf7dd348/dg/tack_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524262',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kerstin Vieregge',
            subtitle: 'CDU/CSU, Lippe I (WK 135)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524260/3x4/284/379/8208e3d5312bad6580a263b8d15aff49/bG/vieregge_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521754',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kirsten Lühmann',
            subtitle: 'SPD, Celle – Uelzen (WK 44)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521752/3x4/284/379/4bcc454fad5b5bcc0e3d9d3c73152149/dV/luehmann_kirsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524010',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kirsten Tackmann',
            subtitle:
              'Die Linke, Prignitz – Ostprignitz-Ruppin – Havelland I (WK 56)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524008/3x4/284/379/ab648f9304846531be0fda13ec74ee79/eF/tackmann_kirsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519312',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Klaus Ernst',
            subtitle: 'Die Linke, Schweinfurt (WK 250)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519308/3x4/284/379/5bce7b8e1daaac7a1a9e25b82ee53d7c/LZ/ernst_klaus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522046',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Klaus Mindrup',
            subtitle: 'SPD, Berlin-Pankow (WK 76)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522044/3x4/284/379/ffa05a0aaabe6bbfe87dd2e119c549c1/Gg/mindrup_klaus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519874',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Klaus-Dieter Gröhler',
            subtitle: 'CDU/CSU, Berlin-Charlottenburg-Wilmersdorf (WK 80)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519872/3x4/284/379/126eba765fc1687f260cafbd27772116/ax/groehler_klaus_dieter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524612',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Klaus-Peter Willsch',
            subtitle: 'CDU/CSU, Rheingau-Taunus – Limburg (WK 178)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524610/3x4/284/379/8504311081f9814ff50715d9f4f15741/qr/willsch_klaus_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521404',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Konstantin Kuhle',
            subtitle: 'FDP, Göttingen (WK 53)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527228/3x4/284/379/1c66ab840da659a53b077e9be4ff3f94/HQ/kuhle_konstantin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522400',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Konstantin von Notz',
            subtitle:
              'Bündnis 90/Die Grünen, Herzogtum Lauenburg – Stormarn-Süd (WK 10)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522398/3x4/284/379/658f1c8b9ec11c3b0ae29fc4db632ab3/KU/notz_konstantin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '829232',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kordula Kovac',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521258/3x4/284/379/61887e52b9e7999069b8f33e8f0deddc/ZV/kovac_kordula_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523514',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kordula Schulz-Asche',
            subtitle: 'Bündnis 90/Die Grünen, Main-Taunus (WK 181)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523512/3x4/284/379/13a9113bb2a6daff2ffe59156e4a0832/FD/schulz-asche_kordula_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523226',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Kristina Nordt',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/829772/3x4/284/379/6f26761192f8c9c028396afde568b644/DR/nordt_kristina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518862',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lars Castelluci',
            subtitle: 'SPD, Rhein-Neckar (WK 277)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518860/3x4/284/379/9052d26e24685af4ed86972e90c51ce8/jE/castelluci_lars_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520336',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lars Herrmann',
            subtitle: 'fraktionslos, Leipzig-Land (WK 154)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529282/3x4/284/379/601fa69cd54fbc61d81816a806732957/Qo/herrmann_lars_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '521076',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lars Klingbeil',
            subtitle: 'SPD, Rotenburg I – Heidekreis (WK 35)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521074/3x4/284/379/db3ffeed8f2196dd8b91cdb94a489497/ll/klingbeil_lars_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520498',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Leif-Erik Holm',
            subtitle: 'AfD, Vorpommern-Rügen – Vorpommern-Greifswald I (WK 15)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529382/3x4/284/379/e678288a626dbe4dabf101014b620edf/DM/holm_leif_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518680',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Leni Breymaier',
            subtitle: 'SPD, Aalen – Heidenheim (WK 270)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529414/3x4/284/379/e3f576d3a3ea0e5d2a570b2b0c99bdb9/fz/breymaier_leni_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521594',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Leutert Michael',
            subtitle: 'Die Linke, Chemnitz (WK 162)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521592/3x4/284/379/d68862a38507d4ef8970f6417523ed4e/gN/leutert_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524066',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Linda Teuteberg',
            subtitle:
              'FDP, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527244/3x4/284/379/28893e129fa510c4ae7781019c34a7ef/Mi/teuteberg_linda_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524852',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lisa Badum',
            subtitle: 'Bündnis 90/Die Grünen, Bamberg (WK 236)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524850/3x4/284/379/9b1cdf35da97b22c4e168937894bb044/hF/badum_lisa_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522568',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lisa Paus',
            subtitle:
              'Bündnis 90/Die Grünen, Berlin-Charlottenburg-Wilmersdorf (WK 80)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522566/3x4/284/379/feb71a073603b7fb96570f3350e74ffb/fI/paus_lisa_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518390',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lorenz Gösta Beutin',
            subtitle: 'Die Linke, Plön – Neumünster (WK 6)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518388/3x4/284/379/f984dd4cd35c248b71a86ae01529c779/hV/beutin_lorenz_goesta_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518422',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lothar Binding',
            subtitle: 'SPD, Heidelberg (WK 274)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518418/3x4/284/379/e7c1cbef5d0f4e3141ad805d308d5e89/nZ/binding_lothar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522922',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lothar Riebsamen',
            subtitle: 'CDU/CSU, Bodensee (WK 293)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522920/3x4/284/379/5d7961790cfd4410d5aebbce34f6b7cd/Dg/riebsamen_lothar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517914',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Luise Amtsberg',
            subtitle: 'Bündnis 90/Die Grünen, Kiel (WK 5)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517910/3x4/284/379/5512c5f16ee362daf1579bf53c7597c6/mq/amtsberg_luise_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521144',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Lukas Köhler',
            subtitle: 'FDP, München-West/Mitte (WK 220)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526308/3x4/284/379/691d4f4759ddbefeb62c06390e21a1c/Nv/koehler_lukas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522456',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mahmut Özdemir',
            subtitle: 'SPD, Duisburg II (WK 116)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522454/3x4/284/379/cf2abc16b1736b1bff7b48a1d41a5bba/vw/oezdemir_mahmut_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518266',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Maik Beermann',
            subtitle: 'CDU/CSU, Nienburg II – Schaumburg (WK 40)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518262/3x4/284/379/8e63b728bd5aa8ee7c728557d08fbbd5/op/beermann_maik_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519564',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Maika Friemann-Jennert',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/832690/3x4/284/379/46efe06cba42358442db78b39b98a5b6/Pm/friemann_jennert_maika_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518278',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Manfred Behrens',
            subtitle: 'CDU/CSU, Börde – Jerichower Land (WK 67)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518276/3x4/284/379/bed6568613f1ea7bd494c478fc650e0b/wP/behrens_manfred_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519946',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Manfred Grund',
            subtitle:
              'CDU/CSU, Eichsfeld – Nordhausen – Kyffhäuserkreis (WK 189)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519942/3x4/284/379/314abc63b58e56078a079de4af64b074/sA/grund_manfred_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524134',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Manfred Todtenhausen',
            subtitle: 'FDP, Wuppertal I (WK 102)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527160/3x4/284/379/309a95a2bb4f38ad1f5bff9e13c4fd62/nd/Todtenhausen_manfred_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520414',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Manuel Höferlin',
            subtitle: 'FDP, Worms (WK 206)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527168/3x4/284/379/7228505478e696da19e2e46ee9b3bfb7/Kf/hoeferlin_manuel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523126',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Manuel Sarrazin',
            subtitle:
              'Bündnis 90/Die Grünen, Hamburg-Bergedorf – Harburg (WK 23)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523124/3x4/284/379/fc35e15e20cbd26a18019f7e6420fb43/Xa/sarrazin_manuel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518352',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marc Bernhard',
            subtitle: 'AfD, Karlsruhe-Stadt (WK 271)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518348/3x4/284/379/4582c5284493f986ddd524741c3912bc/tG/bernhard_marc_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518398',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marc Biadacz',
            subtitle: 'CDU/CSU, Böblingen (WK 260)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526354/3x4/284/379/a48c9629976c4075fc9a086daace3628/er/biadacz_marc_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520304',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marc Henrichmann',
            subtitle: 'CDU/CSU, Coesfeld – Steinfurt II (WK 127)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520302/3x4/284/379/4c4211d692b2616cf3a949356f1e9ceb/jn/henrichmann_marc_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519272',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marcel Emmerich',
            subtitle: 'Bündnis 90/Die Grünen, Ulm (WK 291)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/845056/3x4/284/379/6bbf37ec4670e3b98b24ad6b5272d51c/Uy/emmerich_marcel_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '518782',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marco Bülow',
            subtitle: 'fraktionslos, Dortmund I (WK 142)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518778/3x4/284/379/d5fa648db487ed3f3992ffa54d9aa58c/Wp/buelow_marco_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '524416',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marco Wanderwitz',
            subtitle:
              'CDU/CSU, Chemnitzer Umland – Erzgebirgskreis II (WK 163)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524414/3x4/284/379/d5722c77167a12afff9f1fbf2bb9e87e/CR/wanderwitz_marco_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518774',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marcus Bühl',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518772/3x4/284/379/6a5b11d3abb29063a91e4478599d2674/Cq/buehl_marcus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520248',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marcus Held',
            subtitle: 'SPD, Worms (WK 206)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520244/3x4/284/379/57ffb49b80bebd4e312c5e78d7f3b60a/ID/held_marcus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524490',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marcus Weinberg',
            subtitle: 'CDU/CSU, Hamburg-Altona (WK 19)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524488/3x4/284/379/1ca06ccf8a721eab1652f2b65fcf2f46/qP/weinberg_marcus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518228',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Margarete Bause',
            subtitle: 'Bündnis 90/Die Grünen, München-Ost (WK 218)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518224/3x4/284/379/fc5040df6766078e565d9971fa4cb4fe/RE/bause_margarete_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523974',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Margit Stumpp',
            subtitle: 'Bündnis 90/Die Grünen, Aalen – Heidenheim (WK 270)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523972/3x4/284/379/60c6cce46cefd5e42d09d1580e6df51e/XG/stumpp_margit_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519466',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Maria Flachsbarth',
            subtitle: 'CDU/CSU, Hannover-Land II (WK 47)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519464/3x4/284/379/c7e30a1a8437509fccb65715a644e527/tK/flachsbarth_maria_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521066',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Maria Klein-Schmeink',
            subtitle: 'Bündnis 90/Die Grünen, Münster (WK 129)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521064/3x4/284/379/569148f8943745b34d7b7a473d969eca/Ww/klein_schmeink_maria_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524538',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marian Wendt',
            subtitle: 'CDU/CSU, Nordsachsen (WK 151)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524536/3x4/284/379/f1c54aa80a09575be2b1f2fbfd0e0781/qy/wendt_marian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520106',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mariana Harder-Kühnel',
            subtitle: 'AfD, Main-Kinzig – Wetterau II – Schotten (WK 175)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520102/3x4/284/379/c3669e8c258df8c3fa66ff84c0d047ed/ZM/harder_kuehnel_mariana_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523244',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marianne Schieder',
            subtitle: 'SPD, Schwandorf (WK 234)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523242/3x4/284/379/44a1b8004c6aeabbc20f562aa735982b/BO/schieder_marianne_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519098',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marie-Luise Dött',
            subtitle: 'CDU/CSU, Oberhausen – Wesel III (WK 117)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519094/3x4/284/379/b54e2062e90bba6135aab92907100f1f/cI/doett_marie_luise_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518588',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mario Brandenburg',
            subtitle: 'FDP, Südpfalz (WK 211)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526398/3x4/284/379/657863f1a3164af52c7120151053f329/mm/brandenburg_mario_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522032',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mario Mieruch',
            subtitle: 'fraktionslos, Steinfurt I – Borken I (WK 124)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530218/3x4/284/379/fba40e2ddc0770bd9cf4063ab58267a4/Uy/mieruch_mario_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '524274',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marja-Liisa Völlers',
            subtitle: 'SPD, Nienburg II – Schaumburg (WK 40)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/532590/3x4/284/379/8792f2bb2af6ef36022bda94ec699bde/VM/voellers_marja_liisa_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520150',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mark Hauptmann',
            subtitle:
              'CDU/CSU, Suhl – Schmalkalden-Meiningen – Hildburghausen – Sonneberg (WK 196)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520148/3x4/284/379/5b6b3bfac39b0aa731fe1810050f5bf8/GF/hauptmann_mark_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520256',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mark Helfrich',
            subtitle: 'CDU/CSU, Steinburg – Dithmarschen Süd (WK 3)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520252/3x4/284/379/b2ca13b2eded3e71c672dcdfb69131d6/jt/helfrich_mark_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519582',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Frohnmaier',
            subtitle: 'AfD, Böblingen (WK 260)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530350/3x4/284/379/1ce6bb504775fa1476c96fa59256fae5/cv/frohnmaier_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519922',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Grübel',
            subtitle: 'CDU/CSU, Esslingen (WK 261)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519920/3x4/284/379/450a9d5c6e84c053564d6ad7bb8c7583/hP/gruebel_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520314',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Herbrand',
            subtitle: 'FDP, Euskirchen – Rhein-Erft-Kreis II (WK 92)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526814/3x4/284/379/abf51b90bd0e9795af179af20514c0ee/PG/herbrand_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521224',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Koob',
            subtitle: 'CDU/CSU, Hochtaunus (WK 176)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521220/3x4/284/379/4956cf9f02e787814aa7853b1d84df43/DJ/koob_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521422',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Kurth',
            subtitle: 'Bündnis 90/Die Grünen, Dortmund I (WK 142)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521420/3x4/284/379/6a3d6bef997261d8f4841a548d6f5013/Ak/kurth_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '666032',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Paschke',
            subtitle: 'SPD, Unterems (WK 25)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522544/3x4/284/379/cd7175c267c07ae689d521c30f69857c/Iu/paschke_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524156',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Tressel',
            subtitle: 'Bündnis 90/Die Grünen, Saarlouis (WK 297)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524154/3x4/284/379/6c95dfbf92e1816527bc96799c12161f/FS/tressel_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524136',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Töns',
            subtitle: 'SPD, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525548/3x4/284/379/b422be90b5a8edb1454df2b15e46e5c4/xQ/toens_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524198',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Markus Uhl',
            subtitle: 'CDU/CSU, Homburg (WK 299)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524196/3x4/284/379/51a93e320d318c41d0b571fa8ca4948b/cR/uhl_markus_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522114',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marlene Mortler',
            subtitle: 'CDU/CSU, Roth (WK 246)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522112/3x4/284/379/5f1d29371c743d524d0c81c8c9b8e457/py/mortler_marlene_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518822',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Burkert',
            subtitle: 'SPD, Nürnberg-Süd (WK 245)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518818/3x4/284/379/bb5563d464b3fba992bc45924c3eafc1/SD/burkert_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522880',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Erwin Renner',
            subtitle: 'AfD, Mettmann I (WK 104)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527196/3x4/284/379/c3565b73d45f10f6574daeb8fa0979af/HM/renner_martin_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519720',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Gerster',
            subtitle: 'SPD, Biberach (WK 292)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519716/3x4/284/379/7d521adfba044843db9dcff52ec406b1/GG/gerster_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520164',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Hebner',
            subtitle: 'AfD, Starnberg – Landsberg am Lech (WK 224)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530072/3x4/284/379/b494dc9a4f0a04bf48856f72f45c2e7f/ib/hebner_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520352',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Hess',
            subtitle: 'AfD, Ludwigsburg (WK 265)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520350/3x4/284/379/dcc3aa858b5f808eff6b53e79e321645/XW/hess_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520486',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Hohmann',
            subtitle: 'AfD, Fulda (WK 174)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520484/3x4/284/379/59d27616865101eae0747ae66fe85e30/GD/hohmann_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522552',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Patzelt',
            subtitle: 'CDU/CSU, Frankfurt (Oder) – Oder-Spree (WK 63)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522550/3x4/284/379/25dc86c8b5fac644764d24ff65b9039f/Fn/patzelt_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522760',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Rabanus',
            subtitle: 'SPD, Rheingau-Taunus – Limburg (WK 178)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522758/3x4/284/379/f1a09b3e0ce692a163759a03e0c59a9a/OZ/rabanus_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522836',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Reichardt',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522834/3x4/284/379/e6d227d217e44edb7b63c529e60e9b39/tl/reichardt_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523020',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Rosemann',
            subtitle: 'SPD, Tübingen (WK 290)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523018/3x4/284/379/feb14c8fe4957b43baf607f7dc9ba184/jW/rosemann_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523528',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Schulz',
            subtitle: 'SPD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526778/3x4/284/379/2f5a4fb70573175bce48954fe3881c0d/dy/schulz_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523672',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martin Sichert',
            subtitle: 'AfD, Nürnberg-Nord (WK 244)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530402/3x4/284/379/e1562c988b3c5bc4ec444f0e334511d7/jD/sichert_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522884',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martina Renner',
            subtitle: 'Die Linke, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522882/3x4/284/379/9ab3395026da99eab1f4748011e1a450/oM/renner_martina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523806',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Martina Stamm-Fibich',
            subtitle: 'SPD, Erlangen (WK 242)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523804/3x4/284/379/58348af5693311e29f41b981adcc085/Ag/stamm-fibich_martina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521880',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Marwitz',
            subtitle: 'CDU/CSU, Märkisch-Oderland – Barnim II (WK 59)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521878/3x4/284/379/8d4bcfb1694661e800012cdf30d05ee0/Tj/marwitz_hans_georg_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518402',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matern von Marschall',
            subtitle: 'CDU/CSU, Freiburg (WK 281)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518400/3x4/284/379/20beffde779d325bd0ffec26b392a35f/Lu/von_marschall_matern_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522026',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mathias Middelberg',
            subtitle: 'CDU/CSU, Stadt Osnabrück (WK 39)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522024/3x4/284/379/762a58d3d0b7840af46301903f5057d7/CR/Middelberg_Mathias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523866',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mathias Stein',
            subtitle: 'SPD, Kiel (WK 5)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525824/3x4/284/379/146f648c5df7ab5b1df5ed4e7c579a64/JW/stein_mathias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518164',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Bartke',
            subtitle: 'SPD, Hamburg-Altona (WK 19)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518160/3x4/284/379/347fa14a02a3902de2ed31f19a379aa2/CR/bartke_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518432',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Birkwald',
            subtitle: 'Die Linke, Köln II (WK 94)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518428/3x4/284/379/ac3ae01e8b99ad0ca3a1ca789c4d6c61/Vr/birkwald_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518792',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Büttner',
            subtitle: 'AfD, Altmark (WK 66)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518788/3x4/284/379/641b1dc14974a6968547ef007c5d7d9f/fV/buettner_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519648',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Gastel',
            subtitle: 'Bündnis 90/Die Grünen, Nürtingen (WK 262)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519646/3x4/284/379/72226e07282ef4bed6b00ecfd56fe9b8/py/gastel_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520142',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Hauer',
            subtitle: 'CDU/CSU, Essen III (WK 120)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520140/3x4/284/379/e8e5d25120e92806c35c9f501473f68d/eU/hauer_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520420',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Höhn',
            subtitle: 'Die Linke, Altmark (WK 66)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529200/3x4/284/379/c84ff94088bb0d8842137681b9ca8385/SS/hoehn_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522030',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Miersch',
            subtitle: 'SPD, Hannover-Land II (WK 47)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522028/3x4/284/379/2adb849a5885929a95a0d01f4f5d6451/Cg/miersch_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522378',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Nölke',
            subtitle: 'FDP, Kassel (WK 168)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/693310/3x4/284/379/3085c8908e8ed62b0d286e22254d31c1/CL/noelke_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523620',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Seestern-Pauly',
            subtitle: 'FDP, Osnabrück-Land (WK 38)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530106/3x4/284/379/fa32341aa42d1829d46688786d70bf49/zy/seestern_pauly_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524810',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Matthias Zimmer',
            subtitle: 'CDU/CSU, Frankfurt am Main I (WK 182)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524808/3x4/284/379/e9251b199c2d1dd96dd617691d98f78/Nm/zimmer_matthias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523940',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Max Straubinger',
            subtitle: 'CDU/CSU, Rottal-Inn (WK 230)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523938/3x4/284/379/c52a77996ca6d7c3decec07e5907d244/eV/straubinger_max_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520216',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Mechthild Heil',
            subtitle: 'CDU/CSU, Ahrweiler (WK 198)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520212/3x4/284/379/871bada21c1d8213d4dd83484311576a/dE/heil_mechthild_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518360',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Melanie Bernstein',
            subtitle: 'CDU/CSU, Plön – Neumünster (WK 6)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518356/3x4/284/379/a0d5262df9d7f812460a36429434169/KO/bernstein_melanie_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520058',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Metin Hakverdi',
            subtitle: 'SPD, Hamburg-Bergedorf – Harburg (WK 23)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520056/3x4/284/379/11bdbffa4b20ebe21c20bd07dc0df85f/zJ/hakverdi_metin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518618',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Brand',
            subtitle: 'CDU/CSU, Fulda (WK 174)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518616/3x4/284/379/1b1451923951b6c20199c0787a33d26a/dd/brand_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519112',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Donth',
            subtitle: 'CDU/CSU, Reutlingen (WK 289)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519108/3x4/284/379/ef93d25a17240293a6765a3376a09d20/RU/donth_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519570',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Frieser',
            subtitle: 'CDU/CSU, Nürnberg-Süd (WK 245)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519568/3x4/284/379/e473c79e181339fa4187f228b746f0dc/xm/frieser_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521650',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Georg Link',
            subtitle: 'FDP, Heilbronn (WK 267)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527250/3x4/284/379/a59049f47f648cca2e0a02362786334c/MN/link_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519708',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Gerdes',
            subtitle: 'SPD, Bottrop – Recklinghausen III (WK 125)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519704/3x4/284/379/502382f2099168f5c6fd4aff5dcc4685/el/gerdes_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519908',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Gross',
            subtitle: 'SPD, Recklinghausen II (WK 122)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519904/3x4/284/379/5fb2501b6121b6c1c67796999433cde9/Uu/gross_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519894',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Grosse-Brömer',
            subtitle: 'CDU/CSU, Harburg (WK 36)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519890/3x4/284/379/212c262bf8f9b1b07e0bb41907c17ee1/BC/grosse_broemer_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520992',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Hannes Kießling',
            subtitle: 'CDU/CSU, Starnberg – Landsberg am Lech (WK 224)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526238/3x4/284/379/64337af7260e28cdb391ad2c72be12dc/Co/kiessling_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520300',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Hennrich',
            subtitle: 'CDU/CSU, Nürtingen (WK 262)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520298/3x4/284/379/b8c8cbe5be9d036f9e3aa99d8ff44f17/fe/hennrich_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521398',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Kuffer',
            subtitle: 'CDU/CSU, München-Süd (WK 219)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529172/3x4/284/379/fe3d34fa91b636c24c421a546a892d1d/bz/kuffer_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521950',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Meister',
            subtitle: 'CDU/CSU, Bergstraße (WK 188)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521948/3x4/284/379/a932c4bffd9961faf6787ee6f5e5c76b/Uu/meister_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523042',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Roth',
            subtitle: 'SPD, Werra-Meißner – Hersfeld-Rotenburg (WK 169)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523040/3x4/284/379/69abe3459507d05a6fc7bb388e5d2fff/Ln/roth_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523468',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Schrodi',
            subtitle: 'SPD, Fürstenfeldbruck (WK 215)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530062/3x4/284/379/8b8ea36fb1b30ffe5e28104df19766a4/NU/schrodi_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523966',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Stübgen',
            subtitle: 'CDU/CSU, Elbe-Elster – Oberspreewald-Lausitz II (WK 65)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523964/3x4/284/379/9b961dcaf94adbbd7179e38e84759048/Va/stuebgen_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524076',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Theurer',
            subtitle: 'FDP, Karlsruhe-Stadt (WK 271)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531986/3x4/284/379/31ad6e6559afd0c45eac20622e1145db/mN/theurer_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524080',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michael Thews',
            subtitle: 'SPD, Hamm – Unna II (WK 145)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524078/3x4/284/379/8b77bbb3c73f15e49f9c84837d635fa3/Jg/thews_michael_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522382',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michaela Noll',
            subtitle: 'CDU/CSU, Mettmann I (WK 104)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522380/3x4/284/379/62e85b2ca60a9c169cf8bbf890a50a0a/Vm/noll_michaela_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518612',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michel Brandt',
            subtitle: 'Die Linke, Karlsruhe-Stadt (WK 271)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529444/3x4/284/379/70077d764a8f57fda01e03218490d781/cS/brandt_michel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522228',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Michelle Müntefering',
            subtitle: 'SPD, Herne – Bochum II (WK 141)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522226/3x4/284/379/f53edad9cfa8c76ac23bc49aff2ef688/oF/muentefering_michelle_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519928',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Monika Grütters',
            subtitle: 'CDU/CSU, Berlin-Marzahn-Hellersdorf (WK 85)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519926/3x4/284/379/6aefeeb080a15e52f5df62bb89144c4/VP/gruetters_monika_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521516',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Monika Lazar',
            subtitle: 'Bündnis 90/Die Grünen, Leipzig II (WK 153)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521514/3x4/284/379/d8ef12edb8237a6a537d6c3f54db0cc9/BP/lazar_monika_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523428',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nadine Schön',
            subtitle: 'CDU/CSU, St. Wendel (WK 298)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523426/3x4/284/379/53e3b1910e80e240017a9603cf1759f4/YS/schoen_nadine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522264',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nahles',
            subtitle: 'SPD, Ahrweiler (WK 198)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522262/3x4/284/379/471276d4b82d1dee736b876a032f930c/Bd/nahles_andrea_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518120',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nezahat Baradari',
            subtitle: 'SPD, Olpe – Märkischer Kreis I (WK 149)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/586816/3x4/284/379/456daf5c1bb579ebdbf22bab4d66337b/vm/baradari_nezahat_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518270',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nicola Beer',
            subtitle: 'FDP, Frankfurt am Main I (WK 182)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525866/3x4/284/379/f51ca61e0dc0a6ed2fb8be9895ea200e/eo/beer_nicola_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518192',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nicole Bauer',
            subtitle: 'FDP, Landshut (WK 228)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529884/3x4/284/379/99e1d533ef54805cfe22a30d59a304bf/cx/bauer_nicole_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519802',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nicole Gohlke',
            subtitle: 'Die Linke, München-Süd (WK 219)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519798/3x4/284/379/746bf8201cf67187e9e8ea558662b165/rc/gohlke_nicole_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520412',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nicole Höchst',
            subtitle: 'AfD, Kreuznach (WK 201)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530008/3x4/284/379/b27882c01b4596d2bd785cffda53c977/tZ/hoechst_nicole_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '524556',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nicole Westig',
            subtitle: 'FDP, Rhein-Sieg-Kreis II (WK 98)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526980/3x4/284/379/57dc659da5b7d0368e3957e796c58ccb/Gm/westig_nicole_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '517946',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Niels Annen',
            subtitle: 'SPD, Hamburg-Eimsbüttel (WK 20)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517942/3x4/284/379/83689be23d13a9feeefb53e87f230591/Ba/annen_niels_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522136',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Niema Movassat',
            subtitle: 'Die Linke, Oberhausen – Wesel III (WK 117)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522134/3x4/284/379/f342dae5c2a506d0f487e50c17230165/jz/movassat_niema_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521676',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nikolas Löbel',
            subtitle: 'fraktionslos, Mannheim (WK 275)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521674/3x4/284/379/a475ad9aca234d3bc9b2ade9827b8ff5/hi/loebel_nikolas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '523200',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nina Scheer',
            subtitle: 'SPD, Herzogtum Lauenburg – Stormarn-Süd (WK 10)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523198/3x4/284/379/e03bb1f31df605768b23842d3eaeada4/Nu/scheer_nina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '583208',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nina Warken',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524430/3x4/284/379/cda76d1674034aacb91843a86ba9ac76/sC/warken_nina_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517882',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Norbert Altenkamp',
            subtitle: 'CDU/CSU, Main-Taunus (WK 181)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529148/3x4/284/379/ea1bf160deaf07f7a99e29084afb8562/kR/altenkamp_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518156',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Norbert Barthle',
            subtitle: 'CDU/CSU, Backnang – Schwäbisch Gmünd (WK 269)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518152/3x4/284/379/5b19036b1c70e727fd5239bd26aa53f8/wn/barthle_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518566',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Norbert Brackmann',
            subtitle: 'CDU/CSU, Herzogtum Lauenburg – Stormarn-Süd (WK 10)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518564/3x4/284/379/310e1ee4d892cce6fce64533e0253cd1/DY/brackmann_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521050',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Norbert Kleinwächter',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530016/3x4/284/379/882e8320e4f7b832706f41325907d958/eS/kleinwaechter_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522202',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Norbert Müller',
            subtitle:
              'Die Linke, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522200/3x4/284/379/d0a46a9c80c50d8286fbc61af8816f0b/WJ/mueller_norbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522394',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Nord',
            subtitle: 'Die Linke, Frankfurt (Oder) – Oder-Spree (WK 63)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522392/3x4/284/379/efeb66bcfadb7088bf4167cfb409f387/ff/nord_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '518260',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Olaf in der Beek',
            subtitle: 'FDP, Bochum I (WK 140)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529144/3x4/284/379/9024487600cf37b6b005fd4de8d933f6/KG/in_der_beek_olaf_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519978',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Olav Gutting',
            subtitle: 'CDU/CSU, Bruchsal – Schwetzingen (WK 278)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519976/3x4/284/379/f324ddc39f32be99338c3f543b03dfbd/oC/gutting_olav_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519940',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oliver Grundemann',
            subtitle: 'CDU/CSU, Stade I – Rotenburg II (WK 30)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519938/3x4/284/379/d8e4f5000a4efcb718fb8be76050dd0e/iF/grundmann_oliver_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520772',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oliver Kaczmarek',
            subtitle: 'SPD, Unna I (WK 144)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520770/3x4/284/379/eaae57c801baf6882a87fc6048d8090c/qz/kaczmarek_oliver_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521322',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oliver Krischer',
            subtitle: 'Bündnis 90/Die Grünen, Düren (WK 90)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521320/3x4/284/379/9d0652608f931457c84c330f2c228c6d/lA/krischer_oliver_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521764',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oliver Luksic',
            subtitle: 'FDP, St. Wendel (WK 298)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527286/3x4/284/379/e9e49d8f99b980f993bb8cb7ba3d5145/mZ/luksic_oliver_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524644',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oliver Wittke',
            subtitle: 'CDU/CSU, Gelsenkirchen (WK 123)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524642/3x4/284/379/e4a0168a923825061905b584a56a3cc3/Hg/wittke_oliver_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522404',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Omid Nouripour',
            subtitle: 'Bündnis 90/Die Grünen, Frankfurt am Main II (WK 183)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522402/3x4/284/379/a308e57e2b9639a4f79a58d771bfba18/Iw/nouripour_omid_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524250',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oswin Veith',
            subtitle: 'CDU/CSU, Wetterau I (WK 177)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524248/3x4/284/379/56fa1d2bc29057a3cf0708b24ad2e471/ji/veith_oswin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520504',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ottmar von Holtz',
            subtitle: 'Bündnis 90/Die Grünen, Hildesheim (WK 48)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520502/3x4/284/379/d1cecb3eb048974817c23afb8571da77/Iv/holtz_ottmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '519542',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Otto Fricke',
            subtitle: 'FDP, Krefeld I – Neuss II (WK 110)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525440/3x4/284/379/8bd0a696d28f88942e75b3a6bbbdeaee/hs/fricke_otto_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522478',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Oßner',
            subtitle: 'CDU/CSU, Landshut (WK 228)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522476/3x4/284/379/b4e7d3fafdd4f9d428042f718251d9a6/aG/ossner_florian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521126',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Pascal Kober',
            subtitle: 'FDP, Reutlingen (WK 289)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527268/3x4/284/379/9f22ab5767c475e8881bbb16648ac873/lK/kober_pascal_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521944',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Pascal Meiser',
            subtitle:
              'Die Linke, Berlin-Friedrichshain-Kreuzberg – Prenzlauer Berg Ost (WK 83)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526476/3x4/284/379/5f76abb2d300cfb8dc7b87c5c8fd2eef/sS/meiser_pascal_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521664',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Patricia Lips',
            subtitle: 'CDU/CSU, Odenwald (WK 187)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521662/3x4/284/379/4dab05c17ebef2485fc873a4e5af530c/Eb/lips_patricia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523412',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Patrick Schnieder',
            subtitle: 'CDU/CSU, Bitburg (WK 202)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523410/3x4/284/379/c8308a498d9b31b1106f5ddde2b489f3/JN/schnieder_patrick_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521542',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Paul Lehrieder',
            subtitle: 'CDU/CSU, Würzburg (WK 251)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521540/3x4/284/379/4b26a502627f19240b2ec7352948988f/dz/lehrieder_paul_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522664',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Paul Viktor Podolay',
            subtitle: 'AfD, Erlangen (WK 242)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527510/3x4/284/379/2c97f89419d9212d82c096ed9bc1d4eb/wl/podolay_paul_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '524780',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Paul Ziemiak',
            subtitle: 'CDU/CSU, Herne – Bochum II (WK 141)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524778/3x4/284/379/a99583a7bc59094f61f3836cbe1e3c52/YQ/ziemiak_paul_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517888',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Altmaier',
            subtitle: 'CDU/CSU, Saarlouis (WK 297)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517884/3x4/284/379/cbefed3b99408e01e454e1f81ad35676/zh/altmaier_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518024',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Aumer',
            subtitle: 'CDU/CSU, Regensburg (WK 233)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527254/3x4/284/379/3f465eff73507b5836fbcd6e1f4629d/vM/aumer_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518396',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Beyer',
            subtitle: 'CDU/CSU, Mettmann II (WK 105)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518392/3x4/284/379/61679a5fe467aed619d8432a42abec38/vG/beyer_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518466',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Bleser',
            subtitle: 'CDU/CSU, Mosel/Rhein-Hunsrück (WK 200)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518462/3x4/284/379/8082052e87170a712c174a485576e056/Jq/bleser_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518516',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Boehringer',
            subtitle: 'AfD, Amberg (WK 232)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518512/3x4/284/379/c6636fc7e47f81c7e76fb72091abfa5a/st/boehringer_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519410',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Felser',
            subtitle: 'AfD, Oberallgäu (WK 256)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529624/3x4/284/379/de5c220cc90ee9040ab79929a019a2c5/AZ/felser_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520198',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Heidt',
            subtitle: 'FDP, Wetterau I (WK 177)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/644394/3x4/284/379/f14d6a88444fe01be40fab0af0924b22/Xy/heidt_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523870',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Stein',
            subtitle: 'CDU/CSU, Rostock – Landkreis Rostock II (WK 14)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523868/3x4/284/379/5b9054392121b6fb4e88179cd5fcc9ab/bE/stein_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524514',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Peter Weiß',
            subtitle: 'CDU/CSU, Emmendingen – Lahr (WK 283)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524512/3x4/284/379/9c0b26d9a3436cf004ef3d284bf44f47/nY/weiss_peter_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518846',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Petr Bystron',
            subtitle: 'AfD, München-Nord (WK 217)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530322/3x4/284/379/73e2a29b9eee04d05982f87ff4c9f786/hw/bystran_petr_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522344',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Petra Niclolaisen',
            subtitle: 'CDU/CSU, Flensburg – Schleswig (WK 1)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522342/3x4/284/379/bae60206f15f78c7badebd6b2a67b62c/yn/nicolaisen_petra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522572',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Petra Pau',
            subtitle: 'Die Linke, Berlin-Marzahn-Hellersdorf (WK 85)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522570/3x4/284/379/690e5ffe0e26124762b6746d4e63d4d4/uP/pau_petra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '517908',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Philipp Amthor',
            subtitle:
              'CDU/CSU, Mecklenburgische Seenplatte I – Vorpommern-Greifswald II (WK 16)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526146/3x4/284/379/92ba2f0f0562c715e4fe5b99ad7be278/Yn/amthor_philipp_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524798',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Pia Zimmermann',
            subtitle: 'Die Linke, Helmstedt – Wolfsburg (WK 51)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524796/3x4/284/379/a36517310debe71958ce70feeb0a05f0/ib/zimmermann_pia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524204',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Andrew Ullmann',
            subtitle: 'FDP, Würzburg (WK 251)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527000/3x4/284/379/6012744490bb7283862cfefa8d2fdfc3/YA/ullmann_andrew_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519684',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Axel Gehrke',
            subtitle: 'AfD, Ostholstein – Stormarn-Nord (WK 9)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526394/3x4/284/379/4490eb13a43af872c47871a212b1a49b/Ng/gehrke_axel_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523318',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Claudia Schmidtke',
            subtitle: 'CDU/CSU, Lübeck (WK 11)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529964/3x4/284/379/48eaef8bd229d946cfc782fa0dede104/vk/schmidtke_claudia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524572',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Harald Weyel',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529180/3x4/284/379/9e7a9e82d1096f5853a1af58296b75d8/dZ/weyel_harald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520348',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Heiko Heßenkemper',
            subtitle: 'AfD, Mittelsachsen (WK 161)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530372/3x4/284/379/89cb58716a8dffc70cfcd2274f31719b/HG/hessenkemper_heiko_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521812',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Lothar Maier',
            subtitle: 'AfD, Stuttgart II (WK 259)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525922/3x4/284/379/5dfb929ea6719266f9a75786bbb5b612/zA/maier_lothar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522314',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Martin Neumann',
            subtitle: 'FDP, Elbe-Elster – Oberspreewald-Lausitz II (WK 65)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526758/3x4/284/379/8b51a93af8e608e8b442f925420e595c/nV/neumann_martin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523668',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Prof. Dr. Patrick Sensburg',
            subtitle: 'CDU/CSU, Hochsauerlandkreis (WK 147)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523666/3x4/284/379/f01b8f5e82ae5d5c59642d3bcc6d22d3/dj/sensburg_patrick_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522768',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Radomski',
            subtitle: 'CDU/CSU, Krefeld II – Wesel II (WK 114)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522766/3x4/284/379/8681508d2bfe2cfa0ed05c45c1b4b7ba/RZ/radomski_kerstin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523774',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rainer Spiering',
            subtitle: 'SPD, Osnabrück-Land (WK 38)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523772/3x4/284/379/26de5ece5022bb61d622b25cdbaecc15/sp/spiering_rainer_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518630',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ralf Brauksiepe',
            subtitle: 'CDU/CSU, Ennepe-Ruhr-Kreis II (WK 139)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518626/3x4/284/379/1437f66930b8b3613f7b6fd9445985a4/nK/brauksiepe_ralf_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520834',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ralf Kapschack',
            subtitle: 'SPD, Ennepe-Ruhr-Kreis II (WK 139)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520832/3x4/284/379/6460311cc8adc9f11c6655153a1bc8c9/jD/kapschack_ralf_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518692',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ralph Brinkhaus',
            subtitle: 'CDU/CSU, Gütersloh I (WK 131)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518688/3x4/284/379/2e4f5d2fc645f27211d3d5d008b780cc/Yw/brinkhaus_ralph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521572',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ralph Lenkert',
            subtitle: 'Die Linke, Jena – Sömmerda – Weimarer Land I (WK 191)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521570/3x4/284/379/c6008b40935021c69e35e530fad1abd8/xy/lenkert_ralph_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522814',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rawert',
            subtitle: 'SPD, Berlin-Tempelhof-Schöneberg (WK 81)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522812/3x4/284/379/d18230b563c0686bbf7d3b4750011570/VM/rawert_mechthild_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520086',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Reginald Hanke',
            subtitle:
              'FDP, Saalfeld-Rudolstadt – Saale-Holzland-Kreis – Saale-Orla-Kreis (WK 195)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/673004/3x4/284/379/413c3bd66b5f65fdd5cacf01bd325544/pH/hanke_reginald_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '518598',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Reinhard Brandl',
            subtitle: 'CDU/CSU, Ingolstadt (WK 216)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518594/3x4/284/379/82abdb74dbcb7c91361ff26035632768/jr/brandl_reinhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520538',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Reinhard Houben',
            subtitle: 'FDP, Köln I (WK 93)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527026/3x4/284/379/388caf0be04102b23a5d07b29b015eb5/Ok/houben_reinhard_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523658',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Reinhold Sendker',
            subtitle: 'CDU/CSU, Warendorf (WK 130)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523656/3x4/284/379/c61b196597a866e07fbd1c47d3638466/Pp/sendker_reinhold_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '517892',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Renata Alt',
            subtitle: 'FDP, Nürtingen (WK 262)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526344/3x4/284/379/384009adfc8045cfa77865d0f2243bac/yN/alt_renata_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521392',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Renate Künast',
            subtitle:
              'Bündnis 90/Die Grünen, Berlin-Tempelhof-Schöneberg (WK 81)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521390/3x4/284/379/d1362e180cd0401a16429603b8740ebc/Zn/kuenast_renate_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522992',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rene Röspel',
            subtitle: 'SPD, Hagen – Ennepe-Ruhr-Kreis I (WK 138)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522990/3x4/284/379/94717c543c39352d5303c4768bafecec/Ab/roespel_rene_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523784',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'René Springer',
            subtitle:
              'AfD, Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II (WK 61)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525550/3x4/284/379/8c88f95ec5db42d681ce84b55e2a7eea/cz/springer_rene_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520038',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rita Hagl-Kehl',
            subtitle: 'SPD, Deggendorf (WK 227)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520036/3x4/284/379/edefdc2c6f19dafe8eb55e52d3ca87c5/aW/hagl-kehl_rita_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523572',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rita Schwarzelühr-Sutter',
            subtitle: 'SPD, Waldshut (WK 288)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523570/3x4/284/379/2524d15fd69daa8868d4683d094d8f1b/sK/schwarzeluehr_sutter_rita_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520990',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Roderich Kiesewetter',
            subtitle: 'CDU/CSU, Aalen – Heidenheim (WK 270)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520988/3x4/284/379/e24a69365808bad047240f9c478e591/Zm/kiesewetter_roderich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522238',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rolf Mützenich',
            subtitle: 'SPD, Köln III (WK 95)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522236/3x4/284/379/8adcfae90293fba1bab06d37a6211cbe/he/muetzenich_rolf_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522162',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Roman Müller-Böhm',
            subtitle: 'FDP, Oberhausen – Wesel III (WK 117)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531390/3x4/284/379/689edff5145857b08966d5c499026db4/uA/mueller_boehm_roman_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522898',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Roman Reusch',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522896/3x4/284/379/7f642cb58ff4b026c5f60f917edd161d/oE/reusch_roman_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520934',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ronja Kemmer',
            subtitle: 'CDU/CSU, Ulm (WK 291)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520932/3x4/284/379/1b93b22917abfe7d4094418335169290/uf/kemmer_ronja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521378',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Roy Kühne',
            subtitle: 'CDU/CSU, Goslar – Northeim – Osterode (WK 52)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521376/3x4/284/379/aafca7768e4fbc432a1388a49a3de0f2/Iz/kuehne_roy_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520294',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rudolf Henke',
            subtitle: 'CDU/CSU, Aachen I (WK 87)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520292/3x4/284/379/6a8e99a7e0be6e9e17a5eadca240384/Aj/henke_rudolf_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523090',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rupprecht',
            subtitle: 'CDU/CSU, Weiden (WK 235)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523088/3x4/284/379/6f5afd7b461bf7d2b9452121becdfef0/ET/rupprecht_albert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523096',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ryglewski',
            subtitle: 'SPD, Bremen I (WK 54)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523094/3x4/284/379/1967c8ce5c6b66e507d1247883113b17/Ku/ryglewski_sarah_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522980',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Röring Johannes',
            subtitle: 'CDU/CSU, Borken II (WK 126)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522978/3x4/284/379/9192ca5b27f5eac19b73f380423ecb0b/GC/roering_johannes_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521358',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rüdiger Kruse',
            subtitle: 'CDU/CSU, Hamburg-Eimsbüttel (WK 20)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521356/3x4/284/379/ffd810315aa5fdc8f630181c0183f367/Lr/kruse_ruediger_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521724',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Rüdiger Lucassen',
            subtitle: 'AfD, Euskirchen – Rhein-Erft-Kreis II (WK 92)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529134/3x4/284/379/2bcb123102469a2d0927ee7ab2ba6a8f/mV/lucassen_ruediger_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519068',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sabine Dittmar',
            subtitle: 'SPD, Bad Kissingen (WK 248)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519066/3x4/284/379/5d5fb93f65d80fba988283f86196b438/vN/dittmar_sabine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521550',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sabine Leidig',
            subtitle: 'Die Linke, Werra-Meißner – Hersfeld-Rotenburg (WK 169)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521546/3x4/284/379/c3376ecb0ec3bc69bff9cd7e7d339d59/GI/leidig_sabine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522688',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sabine Poschmann',
            subtitle: 'SPD, Dortmund II (WK 143)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522686/3x4/284/379/de971ac532e4bdfdd79395f0b7ec3dc3/GM/poschmann_sabine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524518',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sabine Weiss',
            subtitle: 'CDU/CSU, Wesel I (WK 113)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524516/3x4/284/379/a6d085fc9adfbd7f1d4b94c7ec462e9c/GP/Weiss_Sabine_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518748',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sandra Bubendorfer-Licht',
            subtitle: 'FDP, Altötting (WK 212)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/679752/3x4/284/379/a70a113e8d7a25f6db8b081d89a2221d/oU/bubendorfer-licht_sandra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524458',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sandra Weeser',
            subtitle: 'FDP, Neuwied (WK 197)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527038/3x4/284/379/add219dd4d8641b92c5d0e1904033e7/FD/weeser_sandra_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522750',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sascha Raabe',
            subtitle: 'SPD, Hanau (WK 180)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522748/3x4/284/379/78e1dfed266e0c0ba2101cdcb18b88ad/xb/raabe_sascha_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519324',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Saskia Esken',
            subtitle: 'SPD, Calw (WK 280)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519322/3x4/284/379/57a5518e7d446e3e7ccfdb32558f36c0/ax/esken_saskia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523250',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Schiefner',
            subtitle: 'SPD, Viersen (WK 111)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523248/3x4/284/379/b3cf0043107ae0072caa36c4ff45ff77/pH/schiefner_udo_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523558',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Schwabe',
            subtitle: 'SPD, Recklinghausen I (WK 121)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523556/3x4/284/379/80a7923a30d0f7f56560f7dbebe65d5f/np/schwabe_frank_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518666',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sebastian Brehm',
            subtitle: 'CDU/CSU, Nürnberg-Nord (WK 244)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527068/3x4/284/379/9c5b15091e333e17dede1ba5327ba2ef/ot/brehm_sebastian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520118',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sebastian Hartmann',
            subtitle: 'SPD, Rhein-Sieg-Kreis I (WK 97)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520116/3x4/284/379/2772d9cc4d633e4845eed3ea5a53b339/YP/hartmann_sebastian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522230',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sebastian Münzenmaier',
            subtitle: 'AfD, Mainz (WK 205)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530394/3x4/284/379/251163e8e152af7d48cd904d6ec8836f/sV/muenzenmaier_sebastian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523848',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sebastian Steineke',
            subtitle:
              'CDU/CSU, Prignitz – Ostprignitz-Ruppin – Havelland I (WK 56)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523846/3x4/284/379/690d6d28dbabbe16c42aa3f25b8dc2ad/lP/steineke_sebastian_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522214',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sepp Müller',
            subtitle: 'CDU/CSU, Dessau – Wittenberg (WK 70)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529446/3x4/284/379/e0e47681acd8b13646ed65f8ffa27d5/DP/mueller_sepp_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518950',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sevim Dağdelen',
            subtitle: 'Die Linke, Bochum I (WK 140)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518948/3x4/284/379/70b5bd201bf7c51166d4445041034a98/jy/dagdelen_sevim_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '519150',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Siegbert Droese',
            subtitle: 'AfD, Leipzig II (WK 153)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530340/3x4/284/379/24c745c32feb9aa0eabebc1c9453fce4/AQ/droese_siegbert_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522078',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Siemtje Möller',
            subtitle: 'SPD, Friesland – Wilhelmshaven – Wittmund (WK 26)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527378/3x4/284/379/598b9a39a3616a0d1d2fa5604c0af8e8/it/moeller_siemtje_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519626',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sigmar Gabriel',
            subtitle: 'SPD, Salzgitter – Wolfenbüttel (WK 49)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519624/3x4/284/379/4b0c72944d359001bce8269e25d09880/vR/gabriel_sigmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521504',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Silke Launert',
            subtitle: 'CDU/CSU, Bayreuth (WK 237)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521502/3x4/284/379/4db43774a6020e2aef1ed3e0147ecd76/Qc/launert_silke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518654',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Silvia Breher',
            subtitle: 'CDU/CSU, Cloppenburg – Vechta (WK 32)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518650/3x4/284/379/6319e09d769e7e343a2146e72ce2d99f/LN/breher_silvia_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518148',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Simone Barrientos',
            subtitle: 'Die Linke, Würzburg (WK 251)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518144/3x4/284/379/147cceaa334b491142bb23bd7cad3215/wi/barrientos_simone_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523824',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sonja Amalie Steffen',
            subtitle: 'SPD, Vorpommern-Rügen – Vorpommern-Greifswald I (WK 15)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523822/3x4/284/379/ddd38de948da7f9a1798f8e51a01b3e8/rT/steffen_sonja_amalie_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519698',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Gelbhaar',
            subtitle: 'Bündnis 90/Die Grünen, Berlin-Pankow (WK 76)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527396/3x4/284/379/ed6b7c10eb1173cc1d2a7bb17f1e4d53/ZT/gelbhaar_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '520904',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Kaufmann',
            subtitle: 'CDU/CSU, Stuttgart I (WK 258)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520900/3x4/284/379/a71da25f936686ee3b0b682eef4f52e4/Lm/kaufmann_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520980',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Keuter',
            subtitle: 'AfD, Essen III (WK 120)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529204/3x4/284/379/86ba5debb59aa710a162581c93449de7/vy/keuter_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521618',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Liebich',
            subtitle: 'Die Linke, Berlin-Pankow (WK 76)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521616/3x4/284/379/ce1b18ced91ec1bfcb224101ea1bcf7e/fq/liebich_stefan_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522218',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Müller',
            subtitle: 'CDU/CSU, Erlangen (WK 242)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522216/3x4/284/379/d4db0704e22d4300a65e2f8478f90d62/od/mueller_stefan_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523048',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Rouenhoff',
            subtitle: 'CDU/CSU, Kleve (WK 112)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/531158/3x4/284/379/8d67b1a409f101233211844f70b1f2ab/dN/rouenhoff_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523140',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Sauer',
            subtitle: 'CDU/CSU, Groß-Gerau (WK 184)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529270/3x4/284/379/97099f498e8f71da5fc5f8bd83c0a9d8/Ce/sauer_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523368',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Schmidt',
            subtitle: 'Bündnis 90/Die Grünen, Regensburg (WK 233)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527408/3x4/284/379/e7ee0a0f57c084b864907a574e767cde/tp/schmidt_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523568',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Schwartze',
            subtitle: 'SPD, Herford – Minden-Lübbecke II (WK 133)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523566/3x4/284/379/b33c7bada89159566ffc23b052b44326/iQ/schwartze_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524784',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stefan Zierke',
            subtitle: 'SPD, Uckermark – Barnim I (WK 57)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524782/3x4/284/379/beb906deacfc1b24315d2e26e61c4bbe/YK/zierke_stefan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518410',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Steffen Bilger',
            subtitle: 'CDU/CSU, Ludwigsburg (WK 265)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518406/3x4/284/379/b622869f5b158f888065ad561bce282a/nv/bilger_steffen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521250',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Steffen Kotré',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/525442/3x4/284/379/b2eacbd1c05eb3bb87dd5b11f3a18ed1/WJ/kotre_steffen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521560',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Steffi Lemke',
            subtitle: 'Bündnis 90/Die Grünen, Dessau – Wittenberg (WK 70)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521556/3x4/284/379/d5c8063ddc6067b72eb6dcbdad8f1f27/Hi/lemke_steffi_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '517864',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Albani',
            subtitle: 'CDU/CSU, Oldenburg – Ammerland (WK 27)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/517860/3x4/284/379/3d1b75d0a10a96be14b90c5ab6830c2f/zH/albani_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518604',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Brandner',
            subtitle: 'AfD, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518600/3x4/284/379/a7750e40078400dcaa7f49099174ac4c/sz/brandner_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521388',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Kühn',
            subtitle: 'Bündnis 90/Die Grünen, Dresden II – Bautzen II (WK 160)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521386/3x4/284/379/55530d4631cf9559959470ff80e6a71a/PT/kuehn_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521916',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Mayer',
            subtitle: 'CDU/CSU, Altötting (WK 212)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521914/3x4/284/379/25d67f8b0e2bafcb79b63b678168b6ed/FG/mayer_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522652',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Pilsinger',
            subtitle: 'CDU/CSU, München-West/Mitte (WK 220)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529384/3x4/284/379/5a66e18bec6098440c9babcc3769ddeb/Wj/pilsinger_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522722',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Protschka',
            subtitle: 'AfD, Rottal-Inn (WK 230)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527022/3x4/284/379/3861b1b3181414edaecb6359e52ed6d3/pO/protschka_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523926',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Stracke',
            subtitle: 'CDU/CSU, Ostallgäu (WK 257)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523924/3x4/284/379/e0f247959fdab57dd0971594286dbe33/Ll/stracke_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524102',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Stephan Thomae',
            subtitle: 'FDP, Oberallgäu (WK 256)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527112/3x4/284/379/29806502e5fe3ed62679c6d434c70c5d/AE/thomae_stephan_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523948',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Strenz',
            subtitle:
              'CDU/CSU, Ludwigslust-Parchim II – Nordwestmecklenburg II – Landkreis Rostock I (WK 13)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523946/3x4/284/379/a2ed90dc3d5e853d4c44c50883a1d9e6/Mx/strenz_karin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523072',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Susann Rüthrich',
            subtitle: 'SPD, Meißen (WK 155)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523070/3x4/284/379/8dd6a3e39a723d0c0388567cdc263ddf/ia/ruethrich_susann_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519424',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Susanne Ferschl',
            subtitle: 'Die Linke, Ostallgäu (WK 257)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519420/3x4/284/379/ba4c88da581907cf43559529d45d8daf/oh/ferschl_susanne_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522058',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Susanne Mittag',
            subtitle: 'SPD, Delmenhorst – Wesermarsch – Oldenburg-Land (WK 28)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522056/3x4/284/379/9b5045b27a5edbcc3371bb00ff778d1/RL/mittag_susanne_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521536',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sven Lehmann',
            subtitle: 'Bündnis 90/Die Grünen, Köln II (WK 94)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527402/3x4/284/379/c97139c67c217eb94e38e4b4118ccc7f/JT/lehmann_sven_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521000',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sven-Christian Kindler',
            subtitle: 'Bündnis 90/Die Grünen, Stadt Hannover II (WK 42)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520998/3x4/284/379/e78871466578255361b017edcac92f0c/aO/kindler_sven_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523794',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Svenja Stadler',
            subtitle: 'SPD, Harburg (WK 36)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523792/3x4/284/379/d05c45dc3e2a010d5fb9e10b76f2feb9/fv/stadler_svenja_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523534',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Swen Schulz',
            subtitle: 'SPD, Berlin-Spandau – Charlottenburg Nord (WK 78)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523532/3x4/284/379/f45866fae2ce9e2b8b2461ababec0928/YR/schulz_swen_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518308',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sybille Benning',
            subtitle: 'CDU/CSU, Münster (WK 129)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518304/3x4/284/379/139ac0ea87a07481878f669f90e0403f/ZY/benning_sybille_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519618',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sylvia Gabelmann',
            subtitle: 'Die Linke, Siegen-Wittgenstein (WK 148)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519616/3x4/284/379/b5e27c06435860568ebcdc7a446c02b0/dS/gabelmann_sylvia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '521256',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sylvia Kotting-Uhl',
            subtitle: 'Bündnis 90/Die Grünen, Karlsruhe-Stadt (WK 271)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521254/3x4/284/379/b685ec27a271c8400b84310b6a1be90c/gm/kotting_uhl_sylvia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '521538',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sylvia Lehmann',
            subtitle:
              'SPD, Dahme-Spreewald – Teltow-Fläming III – Oberspreewald-Lausitz I (WK 62)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526854/3x4/284/379/5d14d01e293539b7a78e82811d195122/DS/lehmann_sylvia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522534',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sylvia Pantel',
            subtitle: 'CDU/CSU, Düsseldorf II (WK 107)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522532/3x4/284/379/42601a17597ef77edf5a9110efc69875/Wg/pantel_sylvia_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522962',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sönke Rix',
            subtitle: 'SPD, Rendsburg-Eckernförde (WK 4)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522960/3x4/284/379/f83a24a96ee643dd6f30b91d697960b7/pE/rix_soenke_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518170',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sören Bartol',
            subtitle: 'SPD, Marburg (WK 171)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518166/3x4/284/379/7c2e083a96405d409ffb7af4c6539e94/sx/bartol_soeren_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522580',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Sören Pellmann',
            subtitle: 'Die Linke, Leipzig II (WK 153)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/532814/3x4/284/379/fc77bf6c6fff52847e551a60daaf6053/xl/pellmann_soeren_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522996',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tabea Rößner',
            subtitle: 'Bündnis 90/Die Grünen, Mainz (WK 205)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522994/3x4/284/379/780d45cec4bf6731bc104f170da9a0e7/Io/roessner_tabea_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523278',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tankred Schipanski',
            subtitle: 'CDU/CSU, Gotha – Ilm-Kreis (WK 192)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523276/3x4/284/379/7c1ba3f291be4261ef07daaf561074a7/pj/schipanski_tankred_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '518130',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Bareiß',
            subtitle: 'CDU/CSU, Zollernalb – Sigmaringen (WK 295)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518126/3x4/284/379/e48a477054734661651abe2e20c60dee/JY/bareiss_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519228',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Ehrhorn',
            subtitle: 'AfD, Celle – Uelzen (WK 44)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530002/3x4/284/379/5f46ddbcb3576f1d50e096ede81a681b/GO/ehrhorn_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519306',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Erndl',
            subtitle: 'CDU/CSU, Deggendorf (WK 227)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530764/3x4/284/379/5d3aff41993755235996e27129f9ada2/QF/erndl_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520008',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Hacker',
            subtitle: 'FDP, Bayreuth (WK 237)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527020/3x4/284/379/1af753a64de110bc97e8ed1e350155ce/qv/hacker_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520204',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Heilmann',
            subtitle: 'CDU/CSU, Berlin-Steglitz-Zehlendorf (WK 79)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526768/3x4/284/379/bc6cb382e22affca70282afa71b26a64/tN/heilmann_thomas_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520406',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Hitschler',
            subtitle: 'SPD, Südpfalz (WK 211)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520404/3x4/284/379/8deee36cbab6924d9a617f009f547dfa/zm/hitschler_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520684',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Jarzombek',
            subtitle: 'CDU/CSU, Düsseldorf I (WK 106)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520682/3x4/284/379/3e05a3d4e9c1c817d406abd812f4c7f9/cN/jarzombek_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520762',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Jurk',
            subtitle: 'SPD, Görlitz (WK 157)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520760/3x4/284/379/fd9292ab147c4a7fd492c247b2de4212/il/jurk_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520930',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas L. Kemmerich',
            subtitle: 'FDP, Erfurt – Weimar – Weimarer Land II (WK 193)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530770/3x4/284/379/89a8cf8f01324a9816ce5ef96861dd5d/Em/kemmerich_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '521770',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Lutze',
            subtitle: 'Die Linke',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521768/3x4/284/379/3fb097f477f83548b51662b39b1846ed/FE/lutze_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '522472',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Oppermann',
            subtitle: 'SPD, Göttingen (WK 53)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522470/3x4/284/379/6610a5826abaa23c1928020faa6a676b/SG/oppermann_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '522764',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Rachel',
            subtitle: 'CDU/CSU, Düren (WK 90)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522762/3x4/284/379/9c87f35e7699d64ec9c25100dd911d47/Js/rachel_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523134',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Sattelberger',
            subtitle: 'FDP, München-Süd (WK 219)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527156/3x4/284/379/aba702b0b8790f42188c48af734f9f0a/Sm/sattelberger_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523642',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Seitz',
            subtitle: 'AfD, Emmendingen – Lahr (WK 283)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530086/3x4/284/379/63936a8c127b9c0e1c4e35a1130c7bba/Jv/seitz_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523692',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Silberhorn',
            subtitle: 'CDU/CSU, Bamberg (WK 236)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523690/3x4/284/379/171361ff2ce0daeade87efbbc7457a46/Jx/silberhorn_thomas_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524266',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas Viesehon',
            subtitle: 'CDU/CSU, Waldeck (WK 167)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524264/3x4/284/379/19ba72f719984bc97cadebdc0791e65f/vg/viesehon_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521820',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thomas de Maizière',
            subtitle: 'CDU/CSU, Meißen (WK 155)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521818/3x4/284/379/6fd1f6f2854e0d6d3a2e9fc75b262dc/qc/maiziere_thomas_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519532',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Thorsten Frei',
            subtitle: 'CDU/CSU, Schwarzwald-Baar (WK 286)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519530/3x4/284/379/43c509e7e61d011442b0c69484a882fd/mB/frei_thorsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521854',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Till Mansmann',
            subtitle: 'FDP, Bergstraße (WK 188)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526490/3x4/284/379/a788ae3054839690afbbfafe007efa0c/XQ/mansmann_till_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '519844',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Timon Gremmels',
            subtitle: 'SPD, Kassel (WK 168)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529136/3x4/284/379/da6340cde4fc123ccfdeffda4040462c/rz/gremmels_timon_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '518884',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tino Chrupalla',
            subtitle: 'AfD, Görlitz (WK 157)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530328/3x4/284/379/33907ad78e8802fd7175c51547887d86/DE/chrupalla_tino_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523744',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tino Sorge',
            subtitle: 'CDU/CSU, Magdeburg (WK 69)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523742/3x4/284/379/c349e4873fcb8c793b5c802615ae95e7/Lw/sorge_tino_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521644',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tobias Lindner',
            subtitle: 'Bündnis 90/Die Grünen, Südpfalz (WK 211)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521642/3x4/284/379/bdfce3bd5aba26b54ec65c126ba53708/cY/lindner_tobias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522594',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tobias Peterka',
            subtitle: 'AfD, Bayreuth (WK 237)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530380/3x4/284/379/88e3dabd0b486bf19d51077da43071d2/eM/peterka_tobias_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522622',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tobias Pflüger',
            subtitle: 'Die Linke, Freiburg (WK 281)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/533896/3x4/284/379/814e291a4a5fb7253eb0a6394fa7d218/Rb/pflueger_tobias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '524744',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Tobias Zech',
            subtitle: 'CDU/CSU',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524742/3x4/284/379/a61901b69c29e56ca35fee87ced42fab/XT/zech_tobias_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520862',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Torbjörn Kartes',
            subtitle: 'CDU/CSU, Ludwigshafen/Frankenthal (WK 207)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520860/3x4/284/379/20bff7e11521646c153f5bbd5fe2efcf/kD/kartes_torbjoern_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520316',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Torsten Herbst',
            subtitle: 'FDP, Bautzen I (WK 156)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526690/3x4/284/379/7042da4e11c7a60eba8b930c9c8189ec/Uk/herbst_torsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '523596',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Torsten Schweiger',
            subtitle: 'CDU/CSU, Mansfeld (WK 74)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523594/3x4/284/379/52c3c2bb4eb1fc8f3e80a8c901bbc347/gU/schweiger_torsten_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520272',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Udo Hemmelgarn',
            subtitle: 'AfD, Gütersloh I (WK 131)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530368/3x4/284/379/15e77680037870ddcab10f635f819b08/kq/hemmelgarn_udo_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519882',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uli Grötsch',
            subtitle: 'SPD, Weiden (WK 235)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519878/3x4/284/379/87c843bbb1d679149ac3d3bf7d87611e/IQ/groetsch_uli_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520606',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulla Ihnen',
            subtitle: 'FDP, Stadt Hannover II (WK 42)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526838/3x4/284/379/7ffce91b39ff81ef867b116fe603919b/bz/ihnen_ulla_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '520694',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulla Jelpke',
            subtitle: 'Die Linke, Dortmund I (WK 142)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520692/3x4/284/379/4789dd977bce743925929e09f37f3b2c/Du/jelpke_ulla_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '523374',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulla Schmidt',
            subtitle: 'SPD, Aachen I (WK 87)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523372/3x4/284/379/a61897892223d52a77d8b891dc5b3a3b/jD/schmidt_ulla_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523196',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulle Schauws',
            subtitle: 'Bündnis 90/Die Grünen, Krefeld II – Wesel II (WK 114)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523194/3x4/284/379/d5830ccb70322cb8e82f5754c7c9464c/IE/schauws_ulle_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '522370',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulli Nissen',
            subtitle: 'SPD, Frankfurt am Main II (WK 183)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522368/3x4/284/379/274889321c039ee9f1129def6bca4b9c/oi/nissen_ulli_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519516',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrich Freese',
            subtitle: 'SPD, Cottbus – Spree-Neiße (WK 64)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519512/3x4/284/379/9b9165b733b89bfc9ca6936d8f4b5e80/vs/freese_ulrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '520922',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrich Kelber',
            subtitle: 'SPD, Bonn (WK 96)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520920/3x4/284/379/566ba2fe2844af58888d3435255d98f9/IE/kelber_ulrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521486',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrich Lange',
            subtitle: 'CDU/CSU, Donau-Ries (WK 254)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521484/3x4/284/379/193c9556c3c439ee361a2c19b3cf30eb/yw/lange_ulrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '521524',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrich Lechte',
            subtitle: 'FDP, Regensburg (WK 233)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526790/3x4/284/379/6178136b55a7ab4be0bc5a7b943296e9/OO/lechte_ulrich_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '522440',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrich Oehme',
            subtitle: 'AfD, Chemnitzer Umland – Erzgebirgskreis II (WK 163)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526492/3x4/284/379/6af4f24bf97028f259e37fb62a01abc7/yA/oehme_ulrich_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '518112',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrike Bahr',
            subtitle: 'SPD, Augsburg-Stadt (WK 252)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518108/3x4/284/379/5a9d5a921e68d5ad3082f6351429a471/bc/bahr_ulrike_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523252',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ulrike Schielke-Ziesing',
            subtitle:
              'AfD, Mecklenburgische Seenplatte II – Landkreis Rostock III (WK 17)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530400/3x4/284/379/a2c70cbf6a507f800045c5c6b5a2d9b1/tV/schielke_ziesing_ulrike_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519866',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ursula Groden-Kranich',
            subtitle: 'CDU/CSU, Mainz (WK 205)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519864/3x4/284/379/185b8699f40dfb1407e8cd54dd65f395/pS/groden-kranich_ursula_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '523508',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ursula Schulte',
            subtitle: 'SPD, Borken II (WK 126)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523506/3x4/284/379/9dc65b594ae15e736dc5e32e6ff394f8/dk/schulte_ursula_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '524294',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Ute Vogt',
            subtitle: 'SPD, Stuttgart I (WK 258)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524292/3x4/284/379/587c8e59f9409564a29ad7cd6de9b28f/wQ/vogt_ute_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '519380',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Feiler',
            subtitle: 'CDU/CSU, Oberhavel – Havelland II (WK 58)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/519378/3x4/284/379/c992c8cbc61162e449ac2ee1ca1a3a42/Bq/feiler_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520808',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Kamann',
            subtitle: 'fraktionslos, Oberhausen – Wesel III (WK 117)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527482/3x4/284/379/3673cbaa3b1576373c90a1de1e86489c/NF/kamann_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '520918',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Kekeritz',
            subtitle: 'Bündnis 90/Die Grünen, Fürth (WK 243)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520916/3x4/284/379/f6bbfcec216ee8350c898b67207089e9/iU/kekeritz_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '523376',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Schmidt',
            subtitle: 'SPD, Bremen II – Bremerhaven (WK 55)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/529336/3x4/284/379/caa1b37ea6037a5134b73baca1699cac/Xa/schmidt_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '523538',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Schulz',
            subtitle: 'AfD, Gießen (WK 173)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523536/3x4/284/379/e3f288fa346df200033ebf6e95621bd8/Mp/schulz_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '523544',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Schummer',
            subtitle: 'CDU/CSU, Viersen (WK 111)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/523542/3x4/284/379/397faf1a87556c7e59da8107c5481154/wA/schummer_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524648',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Uwe Witt',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530408/3x4/284/379/b37d68fec18c330dec754510fe6e9861/Vr/witt_uwe_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520120',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Verena Hartmann',
            subtitle: 'fraktionslos',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530354/3x4/284/379/c793431a9823b8a102b85d95c2711775/ZH/hartmann_verena_gross.png',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: undefined,
            },
          },
          {
            id: '518290',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Veronika Bellmann',
            subtitle: 'CDU/CSU, Mittelsachsen (WK 161)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/518286/3x4/284/379/2bbb42d9202d81e7f1df2b1c2b1413c0/SD/bellmann_veronika_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522586',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Victor Perli',
            subtitle: 'Die Linke, Salzgitter – Wolfenbüttel (WK 49)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522584/3x4/284/379/362c8e372d70f5b4e29d9bdf0a4e5139/Lt/perli_victor_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
          {
            id: '520888',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Volker Kauder',
            subtitle: 'CDU/CSU, Rottweil – Tuttlingen (WK 285)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520886/3x4/284/379/bc85d69c1ceedac5ded1231ed6cd3f58/QT/kauder_volker_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522234',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Volker Münz',
            subtitle: 'AfD, Göppingen (WK 263)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522232/3x4/284/379/2edd4dfb89ccd01815e1d3f8faea4ad1/Tl/muenz_volker_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '521070',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Volkmar Klein',
            subtitle: 'CDU/CSU, Siegen-Wittgenstein (WK 148)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521068/3x4/284/379/dff05b8d283cf5701904340f172992bd/YN/klein_volkmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '524284',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Volkmar Vogel',
            subtitle: 'CDU/CSU, Gera – Greiz – Altenburger Land (WK 194)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524282/3x4/284/379/378231e5b27d5fcf04a7a6bb6f8dce64/sq/vogel_volkmar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '520322',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Waldemar Herdt',
            subtitle: 'AfD, Osnabrück-Land (WK 38)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530360/3x4/284/379/c074983b69645a18976cdeb133525d6b/ns/herdt_waldemar_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '522444',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wilfried Oellers',
            subtitle: 'CDU/CSU, Heinsberg (WK 89)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/522442/3x4/284/379/5539a6b7de473c1c0f620854710754d6/Qo/oellers_wilfried_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '519822',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wilhelm von Gottberg',
            subtitle: 'AfD',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/530206/3x4/284/379/2095365f04a8da2fb31274243d82c1f5/rf/gottberg_wilhelm_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '520270',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wolfgang Hellmich',
            subtitle: 'SPD, Soest (WK 146)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/520268/3x4/284/379/59759fc155aafb3182ce9b7c2588a60b/SK/hellmich_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521368',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wolfgang Kubicki',
            subtitle: 'FDP, Steinburg – Dithmarschen Süd (WK 3)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526982/3x4/284/379/356e0f18dc3f3cd335daa7094f6902f7/bE/kubicki_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'FDP',
                width: 200,
              },
            },
          },
          {
            id: '524570',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wolfgang Wetzel',
            subtitle: 'Bündnis 90/Die Grünen, Zwickau (WK 165)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/526750/3x4/284/379/a33e41285040d277a841592fec47ab9d/OE/wetzel_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Grüne',
                width: 200,
              },
            },
          },
          {
            id: '524588',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Wolfgang Wiehle',
            subtitle: 'AfD, München-Süd (WK 219)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/524586/3x4/284/379/a33bc49eddf9663248de1a99bf404bb9/vV/wiehle_wolfgang_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'AfD',
                width: 200,
              },
            },
          },
          {
            id: '519354',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Yasmin Fahimi',
            subtitle: 'SPD, Stadt Hannover II (WK 42)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/527478/3x4/284/379/b8581543569d58dcde6f380ddf142e10/oP/fahimi_yasmin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'SPD',
                width: 200,
              },
            },
          },
          {
            id: '521800',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Yvonne Magwas',
            subtitle: 'CDU/CSU, Vogtlandkreis (WK 166)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/521798/3x4/284/379/e88a826adaba83e8b9ce5cae424b3b66/nc/magwas_yvonne_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Union',
                width: 200,
              },
            },
          },
          {
            id: '522270',
            onPress: () => navigation.navigate('MemberProfil'),
            title: 'Zaklin Nastic',
            subtitle: 'Die Linke, Hamburg-Eimsbüttel (WK 20)',
            avatar: {
              profileImage: {
                source: {
                  uri:
                    'https://www.bundestag.de/resource/image/532812/3x4/284/379/afa7cf9e9dee9501be91d97dd3bf623c/Ri/nastic_zaklin_gross.jpg',
                },
                height: 200,
                variant: 'oval',
              },
              partyLogo: {
                party: 'Linke',
                width: 200,
              },
            },
          },
        ]}
      />
    </Wrapper>
  );
};
