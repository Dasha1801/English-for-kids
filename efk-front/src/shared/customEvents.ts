import { Category } from './category';

export const logEvent = new CustomEvent('logIn', {
  bubbles: true,
});

export const logOutEvent = new CustomEvent('logOut', {
  bubbles: true,
});

export const createCategoryEvent = new CustomEvent('createCategory', {
  bubbles: true,
});

export const createWordEvent = new CustomEvent('createWord', {
  bubbles: true,
});

export function showWordsEvent(detail: Category): CustomEvent {
  return new CustomEvent('showWord', {
    bubbles: true,
    detail,
  });
}
