import { BaseComponent } from '../../base-component';
import { logOutEvent } from '../../shared/customEvents';
import './headerBack.scss';

export class HeaderBack extends BaseComponent {
  router: HTMLDivElement;

  linkRoutCat:HTMLAnchorElement;

  linkRoutWord:HTMLAnchorElement;

  btnLogOut:HTMLButtonElement;

  constructor() {
    super('header', ['headerBack']);

    this.router = document.createElement('div');
    this.router.classList.add('router');
    this.element.appendChild(this.router);

    this.linkRoutCat = document.createElement('a');
    this.linkRoutCat.classList.add('rout');
    this.linkRoutCat.textContent = 'Categories';
    this.linkRoutCat.href = '#/categories';
    this.linkRoutCat.id = '/categories';
    this.router.appendChild(this.linkRoutCat);

    this.linkRoutWord = document.createElement('a');
    this.linkRoutWord.classList.add('rout');
    this.linkRoutWord.classList.add('word');
    this.linkRoutWord.textContent = 'Word';
    this.linkRoutWord.href = '#/word';
    this.linkRoutWord.id = '/word';
    this.router.appendChild(this.linkRoutWord);

    this.btnLogOut = document.createElement('button');
    this.btnLogOut.classList.add('logOut');
    this.btnLogOut.textContent = 'Log out';
    this.element.appendChild(this.btnLogOut);

    this.btnLogOut.addEventListener('click', () => {
      this.element.dispatchEvent(logOutEvent);
      window.location.hash = '#/main-page';
    });
  }
}
