import { ColorKey, FontKey } from '../styles/theme';
import { YerOrNo } from './auth';
import { User } from './user';

interface CreateMessageApiParams {
  content: string;
  font: FontKey;
  fontColor: ColorKey;
  isPublic: YerOrNo;
  theme: string;
  paperId: number;
  position: number;
  anonymous?: string;
}

interface Message {
  id: number;
  anonymous?: string;
  paperId: number;
  theme: string;
  content: string;
  regDateTime: string;
  font: FontKey;
  fontColor: ColorKey;
  isPublic: YerOrNo;
  position: number;
  user: User | null;
}
