interface PaperCreateType {
  category: 'ROLLING_PAPER';
  title: string;
  theme: ThemeKey;
}

type PaperType = '롤링페이퍼' | '보물찾기' | '케이크 꾸미기';

interface Paper {
  id: number;
  category: keyof PaperCreateType['category'];
  title: string;
  theme: ThemeKey;
  regDateTime: string;
  modDateTime?: string;
}

interface PaperDetail extends Paper {
  userId: number;
}
