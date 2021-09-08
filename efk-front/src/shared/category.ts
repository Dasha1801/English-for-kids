import { CardInfo } from './cardInfo';

export interface Category {
  categoryName: string,
  categoryId?: number,
  words: CardInfo[]
}
