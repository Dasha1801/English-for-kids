import './header.scss';
import { BaseComponent } from '../../base-component';
import { Switch } from '../switch/switch';
import { BurgerMenu } from '../burgerMenu/burgerMenu';

export class Header extends BaseComponent {
  switch : Switch;

  burgerMenu : BurgerMenu;

  constructor() {
    super('header', ['header']);
    this.burgerMenu = new BurgerMenu();
    this.element.appendChild(this.burgerMenu.element);
    this.switch = new Switch();
    this.element.appendChild(this.switch.element);
  }
}
