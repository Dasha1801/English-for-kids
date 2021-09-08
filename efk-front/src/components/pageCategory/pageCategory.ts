import { getCategories } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { CardCategory } from '../cardCategory/cardCategory';
import { CardCreate } from '../cardCreate/cardCreate';
import { CategoryCreate } from '../categoryCreate/categoryCreate';
import './pageCategory.scss';

export class PageCategory extends BaseComponent {
  cardCreate : CardCreate;

  categoryCreate : CategoryCreate;

  constructor() {
    super('div', ['main-page']);
    this.init();
    this.cardCreate = new CardCreate();
    this.element.appendChild(this.cardCreate.element);

    this.categoryCreate = new CategoryCreate();
    this.cardCreate.btnCreate.addEventListener('click', () => {
      this.element.appendChild(this.categoryCreate.element);
    });
    this.categoryCreate.cancelBtn.addEventListener('click', () => {
      this.categoryCreate.element.remove();
    });
    this.element.addEventListener('createCategory', () => {
      this.update();
    });
  }

  async init() : Promise<void> {
    const allCategory = await getCategories();
    allCategory.forEach((cat) => {
      this.element.appendChild(new CardCategory(cat).element);
    });
  }

  update() : void {
    this.element.innerHTML = '';
    this.element.appendChild(this.cardCreate.element);
    this.init();
  }
}
