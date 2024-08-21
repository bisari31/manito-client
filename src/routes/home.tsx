import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { MainBanner, RollingBadge } from '../assets/imgs';
import Greeting from '../components/home/greeting';
import { GreetingSkeleton } from '../components/skeletons/skeletons';
import routes from '../routes';

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
  return (
    <StyledWrapper>
      <section>
        <Suspense fallback={<GreetingSkeleton />}>
          <Greeting />
        </Suspense>
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
