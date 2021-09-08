import { BaseComponent } from '../../base-component';
import './wordCreate.scss';

export class WordCreate extends BaseComponent {
  titleNewWord :HTMLDivElement;

  btnCreate :HTMLDivElement;

  constructor() {
    super('div', ['boxNewWord']);
    this.titleNewWord = document.createElement('div');
    this.titleNewWord.classList.add('title');
    this.titleNewWord.textContent = 'Add new word';

    this.element.appendChild(this.titleNewWord);

    this.btnCreate = document.createElement('div');
    this.btnCreate.classList.add('btnCreate');
    this.btnCreate.textContent = '+';

    this.element.appendChild(this.btnCreate);
  }
}
