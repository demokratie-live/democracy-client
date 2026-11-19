import React, { useState } from "react";
import styled from "styled-components/native";
import { formatEuroShort, parseEuroInput } from "../../../lib/formatEuro";

/**
 * Betragsauswahl im Signal-Stil: Raster mit drei gleich breiten Kacheln je Zeile – die Vorschläge
 * aus der Server-Konfiguration plus „Eigener Betrag". Die eigene Eingabe erscheint erst, wenn diese
 * Kachel gewählt ist.
 */

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-horizontal: -4px;
`;

const Cell = styled.View`
  width: 33.333%;
  padding: 4px;
`;

const Tile = styled.TouchableOpacity<{ selected: boolean }>`
  height: 56px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? "#4494d3" : "#d6d6d6")};
  background-color: ${({ selected }) => (selected ? "#4494d3" : "#fff")};
  align-items: center;
  justify-content: center;
`;

const TileText = styled.Text<{ selected: boolean; small?: boolean }>`
  font-size: ${({ small }) => (small ? 14 : 18)}px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  text-align: center;
`;

const CustomRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border-width: 1px;
  border-color: #4494d3;
  border-radius: 8px;
  padding-horizontal: 14px;
`;

const CustomInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  padding-vertical: 12px;
  color: #333;
`;

const Suffix = styled.Text`
  font-size: 18px;
  color: #777;
`;

interface Props {
  presets: number[];
  valueCents: number | null;
  onChange: (cents: number | null) => void;
  disabled?: boolean;
}

export const AmountPicker: React.FC<Props> = ({ presets, valueCents, onChange, disabled }) => {
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState("");

  const choosePreset = (cents: number) => {
    setCustomMode(false);
    setCustomText("");
    onChange(cents);
  };

  const chooseCustom = () => {
    setCustomMode(true);
    onChange(parseEuroInput(customText));
  };

  const changeCustom = (text: string) => {
    setCustomText(text);
    onChange(parseEuroInput(text));
  };

  return (
    <>
      <Grid accessibilityRole="radiogroup" accessibilityLabel="Betrag auswählen">
        {presets.map((cents) => {
          const selected = !customMode && valueCents === cents;
          return (
            <Cell key={cents}>
              <Tile
                selected={selected}
                disabled={disabled}
                onPress={() => choosePreset(cents)}
                accessibilityRole="radio"
                accessibilityState={{ selected, disabled }}
                accessibilityLabel={formatEuroShort(cents)}
                testID={`donate-amount-${cents}`}
              >
                <TileText selected={selected}>{formatEuroShort(cents)}</TileText>
              </Tile>
            </Cell>
          );
        })}
        <Cell>
          <Tile
            selected={customMode}
            disabled={disabled}
            onPress={chooseCustom}
            accessibilityRole="radio"
            accessibilityState={{ selected: customMode, disabled }}
            accessibilityLabel="Eigener Betrag"
            testID="donate-amount-own"
          >
            <TileText selected={customMode} small>
              {"Eigener\nBetrag"}
            </TileText>
          </Tile>
        </Cell>
      </Grid>
      {customMode && (
        <CustomRow>
          <CustomInput
            value={customText}
            onChangeText={changeCustom}
            editable={!disabled}
            autoFocus
            placeholder="Betrag"
            placeholderTextColor="#9b9b9b"
            keyboardType="decimal-pad"
            returnKeyType="done"
            accessibilityLabel="Eigener Betrag in Euro"
            testID="donate-amount-custom"
          />
          <Suffix>€</Suffix>
        </CustomRow>
      )}
    </>
  );
};
