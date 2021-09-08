import { deleteCategory, updateCategory } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { Category } from '../../shared/category';
import { showWordsEvent } from '../../shared/customEvents';
import { PageWord } from '../pageWord/pageWord';
import './cardCategory.scss';

export class CardCategory extends BaseComponent {
  deleteBtn: HTMLSpanElement;

  input : HTMLInputElement;

  cardInfo : Category;

  updateBtn : HTMLButtonElement;

  addWordBtn : HTMLButtonElement;

  constructor(info:Category) {
    super('div', ['box']);

    this.cardInfo = info;

    this.element.innerHTML = `
    <div class="deleteCat"><span  class="delete">+</span></div>
    <input type="text" class="nameCategory" placeholder="${info.categoryName}" readonly></input>
    <div class="words">Words: <span>${info.words.length}</span></div>
    <div class="listBtn">
      <button class="btn update">Update</button>
      <button class="btn addWord">Add word</button>
    </div>
`;
    this.deleteBtn = this.element.querySelector('.delete')!;
    this.updateBtn = this.element.querySelector('.update')!;
    this.addWordBtn = this.element.querySelector('.addWord')!;
    this.input = this.element.querySelector('.nameCategory')!;

    this.deleteBtn.addEventListener('click', () => {
      this.deleteCat();
    });

    this.updateBtn.addEventListener('click', () => {
      this.updateCat();
    });
    this.addWordBtn.addEventListener('click', () => {
      this.saveUpdate();
    });
    this.addWordBtn.addEventListener('click', () => {
      window.location.hash = '#/word';
      this.element.dispatchEvent(showWordsEvent(this.cardInfo));
    });
  }

  async deleteCat() : Promise<void> {
    await deleteCategory(this.cardInfo.categoryId!);
    this.element.remove();
  }

  updateCat() : void {
    if (this.updateBtn.innerText === 'Update') {
      this.input.classList.add('updateName');
      this.input.removeAttribute('readonly');
      this.input.placeholder = '';
      this.updateBtn.innerText = 'Cancel';
      this.addWordBtn.innerText = 'Create';
    } else if (this.updateBtn.innerText === 'Cancel') {
      this.input.placeholder = this.cardInfo.categoryName;
      this.input.value = '';
      this.reset();
    }
  }

  async saveUpdate() :Promise<void> {
    if (this.addWordBtn.innerText === 'Create') {
      this.cardInfo.categoryName = this.input.value;
      await updateCategory(this.cardInfo);
      this.input.placeholder = this.cardInfo.categoryName;
      this.reset();
    }
  }

  reset() : void {
    this.input.classList.remove('updateName');
    this.updateBtn.innerText = 'Update';
    this.addWordBtn.innerText = 'Add word';
    this.input.setAttribute('readonly', 'readonly');
  }

  clear() : void {
    this.element.innerHTML = '';
  }
}
