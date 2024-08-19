import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Setting } from '../../assets/svg/icons';
import { defaultKaKaoUserProfile } from '../../constants/profile';
import routes from '../../constants/routes';
import { useUserQuery } from '../../queries/users';
import { getFontSizeAndWeight } from '../../styles/mixins';

export default function MyInfo() {
  const { data } = useUserQuery();
  const user = data?.data;

  return (
    <StyledWrapper>
      <StyledAvatarWrapper>
        <img
          src={
            user?.isOriginProfile === 'N'
              ? defaultKaKaoUserProfile
              : user?.profileImage
          }
          alt="avatar"
        />
      </StyledAvatarWrapper>
      <StyledNicknameWrapper>
        <p>{user?.nickname}</p>
        <p>{user?.email}</p>
      </StyledNicknameWrapper>
      <StyledSvgWrapper>
        <Link to={routes.my.setting()}>
          <Setting />
        </Link>
      </StyledSvgWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    border-bottom: 1px dashed ${(props) => props.theme.colors['gray-300']};
  }
  padding-bottom: 12px;
`;
const StyledNicknameWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 2px;
  justify-content: center;
  flex-direction: column;
  p:nth-of-type(1) {
    ${getFontSizeAndWeight('heading3', 'bold')}
    color: ${({ theme }) => theme.colors['gray-900']};
  }
  p:nth-of-type(2) {
    color: ${({ theme }) => theme.colors['gray-500']};
    ${getFontSizeAndWeight('body1', 'regular')}
  }
`;
const StyledAvatarWrapper = styled.div`
  img {
    border-radius: 999px;
    width: 48px;
    height: 48px;
  }
`;
const StyledSvgWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 4px;
  }
`;
