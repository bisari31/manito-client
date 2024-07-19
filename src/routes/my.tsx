import styled from '@emotion/styled';
import { useState } from 'react';

import PageMenu from '../components/my/page-menu';
import PaperList from '../components/my/paper-list';
import PaperMenu from '../components/my/paper-menu';
import UserInfo from '../components/my/user-info';
import { usePaperQuery } from '../queries/paper';
import { useUserQuery } from '../queries/users';

export default function My() {
  const { data: userData } = useUserQuery();
  const { data: paperData } = usePaperQuery(userData?.data?.id);
  const [activePaperMenuIndex, setActivePaperMenuIndex] = useState(0);
  const [activePageMenuIndex, setActivePageMenuIndex] = useState(0);

  return (
    <StyledWrapper>
      <UserInfo />
      <StyledContentsWrapper>
        <PageMenu
          activePageMenuIndex={activePageMenuIndex}
          onActivePageMenuChange={(i: number) => setActivePageMenuIndex(i)}
        />
        <PaperMenu
          onActivePaperMenuIndex={activePaperMenuIndex}
          onActivePaperMenuChange={(i: number) => setActivePaperMenuIndex(i)}
        />
        <PaperList list={paperData?.data} />
      </StyledContentsWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
