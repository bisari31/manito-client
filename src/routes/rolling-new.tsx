import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import ColorList from '../components/detail/bottom-sheet/font-sheet/color-list';
import FontList from '../components/detail/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../components/detail/bottom-sheet/font-sheet/font-selector-sheet';
import { ThemeKey } from '../lib/theme-map';
import { routes } from '../router';
import { StyledBackdrop } from './rolling-detail';

const data: { ['theme']: ThemeKey } = {
  theme: 'space',
};

export default function RollingNew() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeFontIndex, setActiveFontIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const navigate = useNavigate();

  return (
    <StyledRollingNew>
      <StyledWrapper>
        <BottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          isOpen={isBottomSheetOpen}
        >
          <FontSelectorSheet
            activeMenuIndex={activeMenuIndex}
            setActiveMenuIndex={setActiveMenuIndex}
          >
            {activeMenuIndex === 0 ? (
              <FontList setActiveFontIndex={setActiveFontIndex} />
            ) : (
              <ColorList />
            )}
          </FontSelectorSheet>
          <Button
            onClick={() => navigate(routes.rolling.new())}
            // disabled={typeof activeEmojiIndex !== 'number'}
          >
            작성완료하기
          </Button>
        </BottomSheet>
      </StyledWrapper>
      <StyledOverlayBackdrop themeName="nature" />
    </StyledRollingNew>
  );
}

const StyledRollingNew = styled.div``;
const StyledWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const StyledOverlayBackdrop = styled(StyledBackdrop)`
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.3);
`;
