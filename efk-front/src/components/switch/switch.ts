import { BaseComponent } from '../../base-component';
import './switch.scss';

export class Switch extends BaseComponent {
  switch : HTMLElement;

  input : HTMLInputElement;

  constructor() {
    super('div', ['switch']);
    this.element.innerHTML = `
    <label class="toggle-switch-box switch-rounded switch-bg-success">
    <input type="checkbox" checked>
    <span class="toggle-switch-item" data-tg-on="TRAIN" data-tg-off="PLAY">
      <span class="switch-button"></span>
    </span>
  </label>
    `;
    this.switch = this.element.querySelector('.toggle-switch-item')!;
    this.input = this.element.querySelector('input')!;
  }
}
