import styled from '@emotion/styled';

import Close from '../../assets/svg/close.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Input({
  children,
  onClick,
  isError = false,
  ...props
}: InputProps) {
  return (
    <StyledWrapper isError={isError}>
      <div>
        <input {...props} />
        <button type="button" onClick={onClick}>
          <Close />
        </button>
      </div>
      {children}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  div {
    position: relative;
  }
  input {
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors.black};
    font-size: 14px;
    box-sizing: border-box;
    padding: 15px 44px 15px 12px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors.gray[300]};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.gray[400]};
  }
  input:focus {
    border: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors.gray[600]};
    outline: none;
  }
  button {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }

  span {
    margin-left: 12px;
    font-size: 12px;
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors.gray[600]};
    strong {
      font-weight: 700;
      color: ${({ theme, isError }) =>
        isError ? `inherit` : theme.colors.gray[800]};
    }
  }
`;
