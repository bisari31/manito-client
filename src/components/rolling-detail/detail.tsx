import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePaperDetailQuery } from '../../queries/paper';
import { routes } from '../../router';
import { useMessageScreenActions } from '../../stores/message-screen-store';
import useMessageStore from '../../stores/message-store';
import useToastStore from '../../stores/toast-store';
import { Button } from '../common/button/buttons';
import BottomSheet from './bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from './bottom-sheet/bottom-sheet.style';
import EmojiSelectorSheet from './bottom-sheet/emoji-sheet/emoji-selector-sheet';
import DetailHeader from './detail-header';
import MessageList from './message-list';

export default function Detail() {
  const { data } = usePaperDetailQuery();
  const messageScreen = useMessageScreenActions();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { activeEmojiName, activeMessageIndex, hasList, reset } =
    useMessageStore();

  const navigate = useNavigate();
  const { add } = useToastStore();
  const handleMessageScreenOpen = () => {
    if (hasList()) return messageScreen.open();
    add('상세보기 내역이 없습니다.');
  };

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <StyledWrapper>
      <DetailHeader
        onMessageScreenOpen={handleMessageScreenOpen}
        paperId={data?.data?.id}
      />
      <MessageList
        paperId={data?.data?.id}
        onBottomSheetOpen={setIsBottomSheetOpen}
      />
      <BottomSheet
        isDetailPage
        onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
        isOpen={isBottomSheetOpen}
      >
        <StyledBottomSheetContentWrapper>
          <EmojiSelectorSheet theme={data?.data?.theme} />
          <Button
            onClick={() =>
              navigate(routes.rolling.new(), {
                state: {
                  paperId: data?.data?.id,
                  emoji: activeEmojiName,
                  position: activeMessageIndex,
                  rollingThemeName: data?.data?.theme,
                },
              })
            }
            disabled={!activeEmojiName}
          >
            편지 선택하기
          </Button>
        </StyledBottomSheetContentWrapper>
      </BottomSheet>
    </StyledWrapper>
  );
}

export const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 50;
`;
