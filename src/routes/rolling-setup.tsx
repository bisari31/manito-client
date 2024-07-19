import { useState } from 'react';

import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import ThemeCarousel from '../components/setup/theme-carousel';
import { useNameForm } from '../hooks';
import { titleMaxLength } from '../lib/regexPatterns';
import themeList from '../lib/theme-map';
import { useCreateRollingPaper } from '../queries/paper';
import {
  StyledHeading,
  StyledSectionWrapper,
  StyledWrapper,
} from './rolling-setup.style';

export default function RollingSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const { mutate, isPending } = useCreateRollingPaper();
  const handleSubmit = () => {
    mutate({
      category: 'ROLLING_PAPER',
      theme: themeList[activeThemeIndex].themeEng,
      title: name,
    });
  };

  return (
    <StyledWrapper>
      <StyledSectionWrapper>
        <NameForm
          ref={nameRef}
          onChange={handleNameChange}
          value={name}
          isError={isError}
          maxLength={titleMaxLength}
          onClick={handleNameReset}
        >
          <StyledHeading>
            <h2>롤링페이퍼</h2>
            <h3>
              <strong>제목</strong>을 입력해주세요.
            </h3>
          </StyledHeading>
        </NameForm>
        <ThemeCarousel
          onActiveIndexChange={(i) => setActiveThemeIndex(i)}
          activeIndex={activeThemeIndex}
        />
      </StyledSectionWrapper>
      <Button
        disabled={!name.length || isError || isPending}
        hasMarginBottom
        onClick={handleSubmit}
      >
        시작하기
      </Button>
    </StyledWrapper>
  );
}
