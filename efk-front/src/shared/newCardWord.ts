import { BaseComponent } from '../base-component';
import { CardInfo } from './cardInfo';

export class NewCardWord extends BaseComponent {
  constructor(info : CardInfo) {
    super('div', ['card']);
    
  }
}
