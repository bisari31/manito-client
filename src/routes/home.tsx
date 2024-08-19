import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { MainBanner, RollingBadge } from '../assets/imgs';
import routes from '../constants/routes';
import { useUserQuery } from '../queries/users';
import { getFontSizeAndWeight } from '../styles/mixins';

const CONTENTS = [
  {
    name: '롤링 페이퍼',
    isActive: true,
    href: () => routes.setupIntro('rolling'),
    badge: RollingBadge,
  },
  // {
  //   name: '케이크 꾸미기',
  //   isActive: false,
  //   href: () => '',
  //   badge: RollingBadge,
  // },
  // {
  //   name: '보물상자 채우기',
  //   isActive: false,
  //   href: () => '',
  //   badge: RollingBadge,
  // },
];

export default function Home() {
  const { data } = useUserQuery();
  return (
    <StyledWrapper>
      <section>
        <StyledHeading>
          <p>{data?.data?.nickname}님 안녕하세요!</p>
          <p>
            <strong>다양한 컨텐츠</strong>를 즐겨보세요.
          </p>
        </StyledHeading>
        <StyeldBanner>
          <MainBanner />
        </StyeldBanner>
        <StyeldContents>
          {CONTENTS.map((content) => {
            const Badge = content.badge;
            return (
              <StyledContentItem key={content.name}>
                {content.isActive ? (
                  <Link to={content.href()}>
                    <Badge />
                  </Link>
                ) : (
                  <div>{content.name}</div>
                )}
              </StyledContentItem>
            );
          })}
        </StyeldContents>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;
const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p:nth-of-type(1) {
    color: ${(props) => props.theme.colors['gray-800']};

    ${getFontSizeAndWeight('heading2', 'medium')}
  }
  p:nth-of-type(2) {
    color: ${(props) => props.theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading1', 'bold')}
    strong {
      color: ${(props) => props.theme.colors['powderBlue-900']};
    }
  }
`;
const StyeldBanner = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  height: 96px;
`;
const StyeldContents = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
const StyledContentItem = styled.li`
  a,
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors['powderBlue-50']};
    border-radius: 10px;
    aspect-ratio: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
