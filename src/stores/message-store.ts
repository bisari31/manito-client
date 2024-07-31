import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import emojis from '../constants/emojis';
import { ThemeKey } from '../constants/theme-list';
import { Message } from '../types/message';

const INIT_LIST = Array(8).fill(null);

interface MessageState {
  list: Array<null | Message | Pick<Message, 'theme'>>;
  activeEmojiIndex: null | number;
  activeMessageIndex: null | number;
  setActiveEmojiIndex: (i: number | null) => void;
  setActiveMessageIndex: (i: number | null) => void;
  snycList: (serverData?: Message[]) => void;
  addList: (theme: ThemeKey) => void;
  reset: () => void;
  hasList: () => boolean;
}

const useMessageStore = create<MessageState>()(
  devtools((set, get) => ({
    list: INIT_LIST,
    activeEmojiIndex: null,
    activeMessageIndex: null,
    hasList: () => {
      return get().list.some((item) => {
        return item?.theme && 'id' in item;
      });
    },
    setActiveEmojiIndex: (i: number | null) => set({ activeEmojiIndex: i }),
    setActiveMessageIndex: (i: number | null) => set({ activeMessageIndex: i }),
    snycList: (serverData?: Message[]) =>
      set((state) => ({
        list: state.list.map((prev, i) => {
          const item = serverData?.find((item) => item.position === i);
          return item ?? prev;
        }),
      })),
    addList: (theme: ThemeKey) =>
      set((state) => ({
        list: state.list.map((prev, i) => {
          if (
            state.activeMessageIndex === i &&
            state.activeEmojiIndex !== null
          ) {
            return {
              theme: emojis[theme][state.activeEmojiIndex].name,
            };
          }
          if (prev?.theme && !('content' in prev)) {
            return null;
          }
          return prev;
        }),
      })),
    reset: () =>
      set({
        list: INIT_LIST,
        activeMessageIndex: null,
        activeEmojiIndex: null,
      }),
  })),
);

export default useMessageStore;
