import { BaseComponent } from '../../base-component';
import './mainPage.scss';
import { getCategories } from '../../../serverApi';
import { MainPageLink } from '../../shared/mainPageLink';

export class MainPage extends BaseComponent {
  constructor() {
    super('div', ['main-page']);
  }

  private async init() {
    const allCategory = await getCategories();
    allCategory.forEach((cat) => {
      this.element.appendChild(new MainPageLink(cat).element);
    });
  }

  clear() {
    this.element.innerHTML = '';
  }

  update() {
    this.clear();
    this.init();
  }
}
