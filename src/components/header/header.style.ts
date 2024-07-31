import styled from '@emotion/styled';

import { HeaderConfig } from '../../constants/header-config';
import { getFontSizeAndWeight } from '../../styles/mixins';

type HeaderType = Pick<HeaderConfig, 'hasBorder' | 'hasHeaderColor'>;
type HeaderButtonType = Pick<HeaderConfig, 'hasHeaderColor'>;
export const StyledHeader = styled.header<HeaderType>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 51;
  position: fixed;
  background-color: ${({ hasHeaderColor, theme }) =>
    hasHeaderColor ? theme.colors['powderBlue-900'] : theme.colors.white};
  border-bottom: ${({ hasBorder, theme }) =>
    hasBorder ? `1px solid ${theme.colors['gray-300']}` : 'none'};
  & > div {
    h1 {
      ${getFontSizeAndWeight('heading2', 'medium')}
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ hasHeaderColor, theme }) =>
      hasHeaderColor ? theme.colors.white : theme.colors['gray-800']};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 16px;
    padding-bottom: 16px;
    ${getFontSizeAndWeight('heading2', 'medium')}
  }
`;

export const StyledLeftButton = styled.button<HeaderButtonType>`
  svg {
    rect {
      fill: ${({ hasHeaderColor, theme }) =>
        hasHeaderColor ? 'transparent' : theme.colors.white};
    }
    path {
      stroke: ${({ hasHeaderColor, theme }) =>
        hasHeaderColor ? theme.colors.white : 'auto'};
    }
  }
`;

export const StyledMenuButton = styled.button<HeaderButtonType>`
  margin-left: auto;
  svg path {
    stroke: ${({ hasHeaderColor, theme }) =>
      hasHeaderColor ? theme.colors.white : 'auto'};
  }
`;
