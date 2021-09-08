import { getCategoryById } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { Category } from '../../shared/category';
import { CardWord } from '../cardWord/cardWord';
import { NewCardWord } from '../newCardWord/newCardWord';
import { WordCreate } from '../wordCreate/wordcreate';
import './pageWord.scss';

export class PageWord extends BaseComponent {
  wordCreate : WordCreate;

  info? : Category;

  constructor() {
    super('div', ['main-page']);
    this.wordCreate = new WordCreate();
    this.element.appendChild(this.wordCreate.element);

    this.wordCreate.btnCreate.addEventListener('click', () => {
      this.showNewCard();
    });
    this.element.addEventListener('createWord', () => {
      this.update();
    });
  }

  async init(info: Category) {
    this.info = info;
    const allWord = await getCategoryById(info.categoryId!);
    this.clear();
    allWord.words.forEach((w) => {
      this.element.appendChild(new CardWord(w).element);
    });
  }

  clear() : void {
    this.element.innerHTML = '';
    this.element.appendChild(this.wordCreate.element);
  }

  showNewCard(): void {
    if (this.info) {
      const newCard = new NewCardWord(this.info);
      this.element.appendChild(newCard.element);
    }
  }

  update() : void {
    this.element.innerHTML = '';
    this.element.appendChild(this.wordCreate.element);
    this.init(this.info!);
  }
}
