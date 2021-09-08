import { BaseComponent } from '../base-component';
import { Category } from './category';

export class SidebarLink extends BaseComponent {
  constructor(info:Category) {
    super('a');
    this.init(info);
  }

  init(info: Category) {
    this.element.setAttribute('href', `#/category/${info.categoryId}`);
    this.element.innerText = info.categoryName;
  }
}
