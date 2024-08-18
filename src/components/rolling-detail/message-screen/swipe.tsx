import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { RightChevron } from '../../../assets/svg/icons';
import { findEmojiSvgFromTheme } from '../../../constants/emojis';
import { useMessageScreenActions } from '../../../stores/message-screen-store';
import { Message } from '../../../types/message';
import EmojiSkin from '../../common/emoji-skin';

interface DetailSwiperProps {
  activeIndex: number;
  messages: Message<UserIdAndNickname>[];
}

export default function MessageScreenSwipe({
  activeIndex,
  messages,
}: DetailSwiperProps) {
  const messageScreen = useMessageScreenActions();
  const sortedMessages = messages.sort((a, b) => a.position - b.position);
  const [isBeginning, setIsBeginning] = useState(
    activeIndex === 0 ? true : false,
  );
  const [isEnd, setIsEnd] = useState(messages.length === 1 ? true : false);
  const swiperRef = useRef<SwiperType>();

  const handleSlideChange = (e: SwiperType) => {
    setIsEnd(e.isEnd);
    setIsBeginning(e.isBeginning);
    messageScreen.setActiveIndex(e.activeIndex);
  };

  return (
    <StyledSwiper
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation]}
      onSlideChange={handleSlideChange}
    >
      {sortedMessages.map((message) => {
        const emoji = findEmojiSvgFromTheme(message.theme);
        return (
          <SwiperSlide key={message.id}>
            <EmojiSkin message={message}>
              {emoji?.svg && <emoji.svg />}
              <p>{message.content}</p>
            </EmojiSkin>
          </SwiperSlide>
        );
      })}
      <StyledNavigationWarpper>
        {!isBeginning && (
          <StyledPrevNavigation onClick={() => swiperRef.current?.slidePrev()}>
            <RightChevron />
          </StyledPrevNavigation>
        )}
        {!isEnd && (
          <StyledNextNavigation onClick={() => swiperRef.current?.slideNext()}>
            <RightChevron />
          </StyledNextNavigation>
        )}
      </StyledNavigationWarpper>
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
`;

const StyledNavigationWarpper = styled.div`
  button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors['black']};
    border-radius: 999px;
    z-index: 50;
    top: 50%;
  }
`;
const StyledPrevNavigation = styled.button`
  transform: translateY(-50%) rotate(180deg);
  left: 0;
`;
const StyledNextNavigation = styled.button`
  transform: translateY(-50%);
  right: 0;
`;
