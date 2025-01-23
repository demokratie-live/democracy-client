import styled from 'styled-components/native';

// TODO move to storybook
export const MenuButton = styled.TouchableOpacity`
  padding-left: ${({ theme }) => theme.spaces.default};
`;

export const BurgerMenuButton = styled(MenuButton)`
  padding-left: 18px;
`;
