import { kakaoProfile } from '../assets/imgs';
import { discordRequester } from '.';

export const sendFeedbackMessage = async ({
  content,
  user,
}: {
  content: string;
  user?: User;
}) => {
  if (!user) return;
  const { data } = await discordRequester.post('', {
    avatar_url: user.isOriginProfile === 'N' ? kakaoProfile : user.profileImage,
    username: user.email,
    embeds: [
      {
        title: content,
        color: 0xe7d747,
        timestamp: new Date().toISOString(),
      },
    ],
  });
  return data;
};
