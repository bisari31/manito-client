import 'swiper/css';

import styled from '@emotion/styled';
import { useState } from 'react';

// import { Font, fonts } from '../../constants/fonts';
import { usePaperMessagesQuery } from '../../../queries/message';
import ItemViewButtons from './item-view-buttons';
// import { StyledEmojiWrapper } from '../../routes/rolling-new.style';
import ItemViewSwiper from './item-view-swiper';
import ItemViewUserForm from './item-view-user-form';

interface ItemViewProps {
  onCloseItemView: () => void;
  paperId: number;
}

export default function ItemView({ onCloseItemView, paperId }: ItemViewProps) {
  const { data: messageData } = usePaperMessagesQuery(paperId);
  const [activeIndex, setActiveIndex] = useState(0);

  const message = messageData?.data?.[activeIndex];
  const messages = messageData?.data;

  if (!message || !messages) throw new Error();

  return (
    <StyledWrapper>
      <div>
        <ItemViewSwiper
          messages={messages}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
        <ItemViewUserForm
          nickname={message.anonymous || message.user?.nickname}
          activeIndex={activeIndex}
          totalIndex={messages.length}
        />
      </div>
      <ItemViewButtons onCloseItemView={onCloseItemView} message={message} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 50;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    transform: ${({ theme }) => `translateY(-${theme.sizes.paddingTop})`};
    justify-content: center;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
