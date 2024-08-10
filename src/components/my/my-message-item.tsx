import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '../../assets/svg/icons';
import { findEmojiSvgFromTheme } from '../../constants/emojis';
import { getRollingThemeName } from '../../constants/theme-list';
import { useDeleteMessage } from '../../queries/message';
import { routes } from '../../router';
import { Message } from '../../types/message';
import EmojiSkin from '../common/emoji-skin';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '../detail/message-item.style';
import DeleteModal from '../modal/delete-modal';

interface MyMessageItemProps {
  message: Message<User>;
}
export default function MyMessageItem({ message }: MyMessageItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
  });
  const navigate = useNavigate();
  const EmojiSvg = findEmojiSvgFromTheme(message.theme)?.svg;
  return (
    <StyledMessageItem isServerData>
      <StyledEditButton
        type="button"
        onClick={() =>
          navigate(routes.rolling.messageEdit(), {
            state: {
              ...message,
              rollingThemeName: getRollingThemeName(message),
            },
          })
        }
      >
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => setIsModalOpen(true)}>
        <Trash />
      </StyledTrashButton>
      <EmojiSkin
        isSmall
        emoji={message.theme}
        fontName={message.font}
        color={message.fontColor}
      >
        {EmojiSvg && <EmojiSvg />}
        <p>{message.content}</p>
      </EmojiSkin>
      {isModalOpen && (
        <DeleteModal
          isMessageDelete
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          handler={() => mutate(message.id)}
        />
      )}
    </StyledMessageItem>
  );
}
