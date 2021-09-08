import { urlStatic } from '../../serverApi';
import { BaseComponent } from '../base-component';
import { Category } from './category';

export class MainPageLink extends BaseComponent {
  constructor(info:Category) {
    super('a', ['card', 'color']);
    this.init(info);
  }

  init(info: Category) {
    this.element.setAttribute('href', `#/category/${info.categoryId}`);
    this.element.innerText = info.categoryName;
    const image = document.createElement('img');
    try {
      image.src = urlStatic + info.words[0].image;
    } catch (e) {
      image.src = './img/bg2.jpg';
    }
    this.element.appendChild(image);
  }
}
