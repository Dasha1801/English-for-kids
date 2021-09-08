import './style.scss';

import { App } from './app';

window.onload = () => {
  const appElement :HTMLBodyElement = document.querySelector('body')!;

  if (!appElement) throw Error('App root element not found');

  const Application = new App(appElement);
};
