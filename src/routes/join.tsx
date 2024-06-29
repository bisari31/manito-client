import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import Input from '../components/common/input';
import { getFontSizeAndWeight } from '../styles/utils';

const MAX_LENGTH = 10;

export default function Join() {
  const [nickname, setNickname] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isSuccess = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{1,10}$/.test(value);
    setIsError(!isSuccess);
    setNickname(e.target.value);
  };

  return (
    <StyledWrapper>
      <section>
        <div>
          <p>마니또에 오신 걸 환영합니다.</p>
          <h2>
            사용하실 <strong>이름</strong>을 입력해주세요.
          </h2>
        </div>
        <Input
          isError={isError}
          onClick={() => setNickname('')}
          placeholder="이름을 입력해주세요."
          value={nickname}
          onChange={handleNicknameChange}
        >
          <span>
            {nickname.length} /<strong> {MAX_LENGTH}</strong>
          </span>
        </Input>
      </section>
      <div>
        <Button
          onClick={() => navigate('/home')}
          mb={50}
          disabled={!nickname.length || isError}
        >
          가입완료
        </Button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  section {
    display: flex;
    flex-direction: column;
    gap: 40px;

    & > div:first-child {
      margin-top: 24px;
      display: flex;
      gap: 4px;
      flex-direction: column;
      p {
        ${getFontSizeAndWeight('heading3', 'regular')}
        color: ${(props) => props.theme.colors.gray[800]};
      }
      h2 {
        ${getFontSizeAndWeight('heading1', 'bold')}
        color: ${(props) => props.theme.colors.gray[900]};
        strong {
          color: ${(props) => props.theme.colors.powderBlue[900]};
        }
      }
    }
  }
  & > div:last-child {
    flex: 1;
    display: flex;
    align-items: end;
  }
`;
