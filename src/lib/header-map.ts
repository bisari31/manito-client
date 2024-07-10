import { routes } from '../router';

export interface HeaderConfig {
  pathname: () => string;
  title: string;
  isShowLeftBtn: boolean;
  isShowMenuBtn: boolean;
  hasBorder: boolean;
  hasHeaderColor: boolean;
}

const headerMap: HeaderConfig[] = [
  {
    hasHeaderColor: false,
    hasBorder: true,
    pathname: () => routes.join,
    title: '회원 가입',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    hasHeaderColor: false,
    hasBorder: true,
    pathname: () => routes.home,
    title: '메인 페이지',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    hasHeaderColor: false,
    hasBorder: false,
    pathname: () => routes.setupIntro(),
    title: 'Hello Roling',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    hasHeaderColor: false,
    hasBorder: true,
    pathname: () => routes.rolling.setup(),
    title: 'Hello Roling',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    hasBorder: false,
    hasHeaderColor: true,
    pathname: () => routes.rolling.detail(),
    title: '추억의 롤링페이퍼',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    hasBorder: true,
    hasHeaderColor: false,
    pathname: () => routes.rolling.new(),
    title: '편지 작성',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    hasBorder: true,
    hasHeaderColor: false,
    pathname: () => '',
    title: '마니또',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
];

export default headerMap;
