import { createCategory } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { Category } from '../../shared/category';
import { createCategoryEvent } from '../../shared/customEvents';
import './categoryCreate.scss';

export class CategoryCreate extends BaseComponent {
  input : HTMLInputElement;

  cancelBtn : HTMLButtonElement;

  createBtn : HTMLButtonElement;

  totalWords: HTMLSpanElement;

  constructor() {
    super('div', ['box']);

    this.element.innerHTML = `
    <input type="text" class="name" placeholder=""></input>
    <div class="words">Words: <span class="totalWords"></span></div>
    <div class="listBtn">
      <button class="btn cancel">Cancel</button>
      <button class="btn create">Create</button>
    </div>
`;
    this.cancelBtn = this.element.querySelector('.cancel')!;
    this.createBtn = this.element.querySelector('.create')!;
    this.input = this.element.querySelector('.name')!;
    this.totalWords = this.element.querySelector('.totalWords')!;

    this.createBtn.addEventListener('click', () => {
      this.addNewCategory();
    });
  }

  async addNewCategory() :Promise <void> {
    const newCategory = {
      categoryName: this.input.value,
      words: [],
    };
    await createCategory(newCategory);
    this.element.dispatchEvent(createCategoryEvent);
    this.clear();
  }

  clear() : void {
    this.element.remove();
  }
}
