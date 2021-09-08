import { BaseComponent } from '../base-component';

const WRONG_STAR_PATH = './img/star-false.png';
const CORRECT_STAR_PATH = './img/star-true.png';
const WIN_SCREEN_PATH = './img/success.png';
const LOSE_SCREEN_PATH = './img/failure.png';

export const correctStar = (): HTMLElement => {
  const newStar = new BaseComponent('div', ['star']);
  newStar.element.style.backgroundImage = `url(${CORRECT_STAR_PATH})`;
  return newStar.element;
};

export const wrongStar = (): HTMLElement => {
  const newStar = new BaseComponent('div', ['star']);
  newStar.element.style.backgroundImage = `url(${WRONG_STAR_PATH})`;
  return newStar.element;
};

export const winGameScreen = (): HTMLElement => {
  const newScreen = new BaseComponent('div', ['win-screen']);
  newScreen.element.classList.add('shadow');
  newScreen.element.style.backgroundImage = `url(${WIN_SCREEN_PATH})`;
  return newScreen.element;
};

export const loseGameScreen = (mistakes: number): HTMLElement => {
  const newScreen = new BaseComponent('div', ['win-screen']);
  newScreen.element.classList.add('shadow');
  newScreen.element.style.backgroundImage = `url(${LOSE_SCREEN_PATH})`;

  const mistakesCounter = new BaseComponent('div', ['mistakes-counter']);
  mistakesCounter.element.textContent = `Mistakes: ${mistakes.toString()}`;

  newScreen.element.appendChild(mistakesCounter.element);

  return newScreen.element;
};
