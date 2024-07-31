import styled from '@emotion/styled';

import { LinkButton } from '../components/common/buttons';
import { routes } from '../router';

export default function SetupIntro() {
  return (
    <StyledWrapper>
      <LinkButton to={routes.rolling.setup()}>시작하기</LinkButton>
      <StyledBackdrop />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  a {
    z-index: 50;
    margin-top: auto;
  }
`;

const StyledBackdrop = styled.div`
  position: absolute;
  transform: ${(props) => `translateY(-${props.theme.sizes.mainMarginTop})`};
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url('/src/assets/imgs/intro/rollring-paper-bg@4x-100.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
`;
