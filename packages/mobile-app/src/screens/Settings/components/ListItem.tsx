import React, { ReactNode } from 'react';
import ArrowIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Arrow';
import { styled } from '../../../styles';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  height: 44px;
  align-items: center;
  padding-left: 16px;
  padding-right: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #c8c7cc;
  font-size: 17px;
`;

const Value = styled.Text<{ arrow: boolean }>`
  font-size: 17px;
  color: ${({ theme }) => theme.textColors.secondary};
  padding-right: ${({ arrow }) => (arrow ? 5 : 12)}px;
`;

const Description = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.textColors.secondary};
  padding-horizontal: 18px;
  padding-vertical: 8px;
`;

const Arrow = styled(ArrowIcon).attrs(() => ({
  color: 'rgb(180, 180, 180)',
  width: 17,
  height: 17,
}))`
  transform: rotate(90deg);
`;

// const NavigationIoniconsIcon = styled(Ionicons).attrs(() => ({
//   size: 24,
//   color: 'grey',
// }))`
//   text-align: center;
//   width: 24px;
//   padding-right: 10px;
//   margin-top: 3px;
// `;

export interface Props {
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
  testID?: string;
}

export const ListItem: React.FC<Props> = ({
  children,
  text,
  arrow = false,
  onPress,
  component,
  description,
  testID,
}) => {
  return (
    <>
      <Wrapper onPress={onPress} testID={testID}>
        {children}
        {!!text && <Value arrow={arrow}>{text}</Value>}
        {!!arrow && <Arrow />}
        {!!component && component}
      </Wrapper>
      {!!description && <Description>{description}</Description>}
    </>
  );
};
