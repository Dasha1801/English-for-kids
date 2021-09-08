import { BaseComponent } from '../../base-component';
import './btnGame.scss';

export class BtnGame extends BaseComponent {
  btn : HTMLButtonElement;

  repeat : HTMLButtonElement;

  constructor() {
    super('div', ['btnGame']);
    this.element.innerHTML = `
    <button class="start">START GAME</button>
    <button class="repeat"></button>
    `;
    this.btn = this.element.querySelector('.start')!;
    this.repeat = this.element.querySelector('.repeat')!;
  }

  showBtnRepeat() {
    this.btn.style.display = 'none';
    this.repeat.style.display = 'block';
  }

  hideBtnAll() {
    this.btn.style.display = 'none';
    this.repeat.style.display = 'none';
  }
}
