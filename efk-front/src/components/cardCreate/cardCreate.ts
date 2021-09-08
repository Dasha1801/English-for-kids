import { BaseComponent } from '../../base-component';
import './cardCreate.scss';

export class CardCreate extends BaseComponent {
  nameNewCategory :HTMLDivElement;

  btnCreate :HTMLDivElement;

  constructor() {
    super('div', ['box']);

    this.nameNewCategory = document.createElement('div');
    this.nameNewCategory.classList.add('nameCategory');
    this.nameNewCategory.textContent = 'Create new Category';

    this.element.appendChild(this.nameNewCategory);

    this.btnCreate = document.createElement('div');
    this.btnCreate.classList.add('btnCreate');
    this.btnCreate.textContent = '+';

    this.element.appendChild(this.btnCreate);
  }
}
