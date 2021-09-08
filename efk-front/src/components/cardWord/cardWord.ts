import { BaseComponent } from '../../base-component';
import './cardWord.scss';
import { CardInfo } from '../../shared/cardInfo';
import { deleteCard, urlStatic } from '../../../serverApi';

export class CardWord extends BaseComponent {
  deleteBtn : HTMLSpanElement;

  changeBtn :HTMLButtonElement;

  info : CardInfo;

  constructor(info : CardInfo) {
    super('div', ['boxWord']);
    this.info = info;
    this.element.innerHTML = `
    <div class="deleteWord"><span  class="delete">+</span></div>
    <div class="word">Word: <span>${info.word}</span></div>
    <div class="translation">Translation: <span>${info.translation}</span></div>
    <div class="sound">Audio: <span>${info.audioSrc}</span></div>
    <div class="img"><span>Image: </span><img class="image" src="${urlStatic}${info.image}" alt=""></div>
    <button class="change">Change</button>
    `;
    this.deleteBtn = this.element.querySelector('.delete')!;
    this.changeBtn = this.element.querySelector('.change')!;

    this.deleteBtn.addEventListener('click', () => {
      this.deleteWord();
    });

    this.changeBtn.addEventListener('click', () => {

    });
  }

  async deleteWord() : Promise<void> {
    await deleteCard(this.info.word);
    this.element.remove();
  }
}
