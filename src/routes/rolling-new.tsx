import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../components/detail/bottom-sheet/bottom-sheet.style';
import ColorList from '../components/detail/bottom-sheet/font-sheet/color-list';
import FontList from '../components/detail/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../components/detail/bottom-sheet/font-sheet/font-selector-sheet';
import { Modal } from '../components/modal/modal';
import emojis from '../constants/emojis';
import { colors, Font, fonts } from '../constants/fonts';
import { useValidationQueryString } from '../hooks';
import { useCreateMessage } from '../queries/message';
import modalStore from '../stores/modalStore';
import themeObject, { ColorKey } from '../styles/theme';
import { StyledBackdrop } from './rolling-detail.style';

type EmojiType = 'Circle' | 'Square' | 'Rest';
const EMOJI_TYPE: EmojiType[] = ['Circle', 'Square', 'Rest'];

export default function RollingNew() {
  const { emojiIndex, paperId, theme, position } = useValidationQueryString();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const { activeIndex } = modalStore();
  const [activeFontIndex, setActiveFontIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [message, setMessage] = useState('');
  const { mutate } = useCreateMessage(+paperId);
  const activeFont = fonts[activeFontIndex];
  const activeColor = colors[theme][activeColorIndex];
  const { svg: Svg, name } = emojis[theme][+emojiIndex];
  const emojiType: EmojiType = EMOJI_TYPE.filter((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return name.includes(type);
  })[0];

  const handleMessageSubmit = () => {
    mutate({
      font: activeFont.name,
      content: message,
      fontColor: activeColor,
      position: +position,
      theme: emojis[theme][+emojiIndex].name,
      isPublic: activeIndex === 0 ? 'Y' : 'N',
      paperId: +paperId,
    });
  };

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, []);

  return (
    <StyledRollingNew>
      <StyledWrapper>
        <StyledEmojiWrapper
          font={activeFont}
          color={activeColor}
          type={emojiType}
        >
          <Svg />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </StyledEmojiWrapper>
        <BottomSheet
          onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
          isOpen={isBottomSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <FontSelectorSheet
              activeMenuIndex={activeMenuIndex}
              setActiveMenuIndex={setActiveMenuIndex}
            >
              {activeMenuIndex === 0 ? (
                <FontList
                  activeFontIndex={activeFontIndex}
                  setActiveFontIndex={setActiveFontIndex}
                />
              ) : (
                <ColorList
                  theme={theme}
                  activeColorIndex={activeColorIndex}
                  setActiveColorIndex={setActiveColorIndex}
                />
              )}
            </FontSelectorSheet>
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={!message.length}
            >
              작성완료
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      </StyledWrapper>
      <StyledOverlayBackdrop themeName={theme} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <Modal.CheckboxForm />
          <Modal.Buttons>
            <Modal.Button
              css={{ border: `1px solid ${themeObject.colors['gray-300']}` }}
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </Modal.Button>
            <Modal.Button
              isActionBtn
              css={{
                backgroundColor: themeObject.colors['gray-900'],
                color: themeObject.colors.white,
              }}
              onClick={handleMessageSubmit}
            >
              작성하기
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
    </StyledRollingNew>
  );
}

const StyledEmojiWrapper = styled.div<{
  type: EmojiType;
  color: ColorKey;
  font: Font;
}>`
  width: 100%;
  transform: translateY(-24px);
  position: relative;
  svg {
    width: 100%;
    height: 100%;
  }
  textarea {
    font-size: 22px;
    font-family: ${({ theme, font }) => theme.fontFamily[font.name]};
    font-weight: ${({ font }) => font.fontWeight};
    color: ${({ color, theme }) => theme.colors[color]};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55.5%;
    height: 55.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    resize: none;
    outline: none;
    background-color: transparent;
  }
`;

const StyledRollingNew = styled.div`
  width: 100%;
`;
const StyledWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const StyledOverlayBackdrop = styled(StyledBackdrop)``;
