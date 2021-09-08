import { Category } from './src/shared/category';

import { CardInfo } from './src/shared/cardInfo';

export const urlBase = 'https://supermarche-chaise-96133.herokuapp.com/';

export const urlStatic = `${urlBase}static/`;

const urlCategories = 'api/categories';

const urlWords = 'api/wordCards';

export const getCategories = async () : Promise <Category[]> => {
  const response = await fetch(`${urlBase}${urlCategories}`);
  const data = await response.json();
  return data;
};

export const getCategoryById = async (categoryId : number) : Promise <Category> => {
  const response = await fetch(`${urlBase}${urlCategories}/${categoryId}`);
  const сategory = await response.json();
  return сategory;
};

export const updateCategory = async (body : Category) : Promise <Category> => {
  const response = await fetch(`${urlBase}${urlCategories}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const updateCat = await response.json();
  return updateCat;
};

export const createCategory = async (category: Category) : Promise <Category> => {
  const response = await fetch(`${urlBase}${urlCategories}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  const newCategory = await response.json();
  return newCategory;
};

export const deleteCategory = async (categoryId : number) :Promise<void> => {
  await fetch(`${urlBase}${urlCategories}/${categoryId}`, {
    method: 'DELETE',
  });
};

export const getCards = async (): Promise<CardInfo[]> => {
  const response = await fetch(`${urlBase}${urlWords}`);
  const data = await response.json();
  return data;
};

export const getCard = async (info: CardInfo['word']): Promise<CardInfo> => {
  const response = await fetch(`${urlBase}${urlWords}/${info}`);
  const data = await response.json();
  return data;
};

export const deleteCard = async (info: CardInfo['word']): Promise<void> => {
  await fetch(`${urlBase}${urlWords}/${info}`, {
    method: 'DELETE',
  });
};

export const createCard = async (info: CardInfo): Promise<CardInfo> => {
  const response = await fetch(`${urlBase}${urlWords}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  const data = await response.json();
  return data;
};

export const updateCard = async (info: CardInfo): Promise<CardInfo> => {
  const response = await fetch(`${urlBase}${urlWords}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  const data = await response.json();
  return data;
};
