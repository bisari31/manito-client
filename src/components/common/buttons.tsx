import styled from '@emotion/styled';

import { KakaoLogo } from '../../assets/svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mb?: number;
}

export function KakaoLoginButton({ ...props }: ButtonProps) {
  return (
    <StyledKakaoButton {...props}>
      <KakaoLogo />
      <span>카카오 로그인</span>
    </StyledKakaoButton>
  );
}

export function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button<{ mb?: number }>`
  margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : 0)};
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[200]};
    color: ${(props) => props.theme.colors.gray[500]};
  }
  font-weight: bold;
  border-radius: 4px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};
`;

const StyledKakaoButton = styled(StyledButton)`
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.AppleSDGothicNeo};
  background-color: ${(props) => props.theme.colors.kakao};
  color: ${(props) => props.theme.colors.black};
`;
