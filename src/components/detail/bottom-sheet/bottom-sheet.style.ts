import styled from '@emotion/styled';

import { BottomSheetProps } from './bottom-sheet';

type BottomSheetType = Pick<BottomSheetProps, 'isOpen'> & { height?: number };
export const StyledBottomSheet = styled.div<BottomSheetType>`
  position: fixed;
  border-top: 1px solid ${(props) => props.theme.colors['gray-300']};
  bottom: ${({ isOpen, height }) => (isOpen ? '0' : `-${height}px`)};
  transition: bottom 300ms ease-out;
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  gap: 8px;
  transform: ${(props) => `translateX(-${props.theme.sizes.padding})`};
  padding: 0 24px 40px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const StyledBottomSheetHeader = styled.button`
  display: flex;
  justify-content: center;
  padding-top: 19px;
  padding-bottom: 18px;
  div {
    width: 66px;
    height: 3px;
    background-color: ${(props) => props.theme.colors['gray-800']};
  }
`;

export const StyledBottomSheetContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
