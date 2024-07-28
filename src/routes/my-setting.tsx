import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { routes } from '../router';
import { getFontSizeAndWeight } from '../utils/style';

export default function MySetting() {
  return (
    <StyledWrapper>
      <div>
        <StyledListWarpper>
          <div>내 정보</div>
          <StyledList>
            <StyledListItem>
              <Link to={routes.my.rename()}>내 프로필 수정</Link>
            </StyledListItem>
          </StyledList>
        </StyledListWarpper>
        <StyledListWarpper>
          <div>기타</div>
          <StyledList>
            <StyledListItem>
              <button>로그아웃</button>
            </StyledListItem>
            <StyledListItem>
              <button>문의하기</button>
            </StyledListItem>
            <StyledListItem>
              <button>탈퇴하기</button>
            </StyledListItem>
          </StyledList>
        </StyledListWarpper>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors['gray-100']};
  & > div {
    display: flex;
    gap: 12px;
    flex-direction: column;
    min-height: 100%;
    padding-left: ${({ theme }) => theme.sizes.padding};
    padding-right: ${({ theme }) => theme.sizes.padding};
    padding-top: ${({ theme }) =>
      `calc(${theme.sizes.header} + ${theme.sizes.mainMarginTop})`};
  }
`;

const StyledListWarpper = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 4px;
  & > div {
    ${getFontSizeAndWeight('heading2', 'bold')}
    padding: 0 16px;
  }

  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledList = styled.ul``;
const StyledListItem = styled.li`
  color: ${({ theme }) => theme.colors['gray-800']};
  ${getFontSizeAndWeight('heading3', 'regular')}
  padding: 12px 16px;
  button {
    font-size: inherit;
    font-weight: inherit;
  }
`;
