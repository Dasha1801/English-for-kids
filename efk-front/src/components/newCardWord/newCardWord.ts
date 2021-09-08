import { createCard, urlStatic } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { Category } from '../../shared/category';
import { createWordEvent } from '../../shared/customEvents';
// import { PageWord } from '../pageWord/pageWord';
import './newCardWord.scss';

export class NewCardWord extends BaseComponent {
  cancelBtn: HTMLButtonElement;

  updateCreateBtn : HTMLButtonElement;

  inputWord : HTMLInputElement;

  inputTranslation : HTMLInputElement;

  info:Category;

  constructor(info:Category) {
    super('div', ['boxWord']);
    this.info = info;
    this.element.innerHTML = `
    <div class="newWord"><span>Word</span><input type="text" class="inputWord"></div>
    <div class="newTranslation"><span>Translation</span><input type="text" class="inputTranslation"></div>
    <div class="newSound"> <span>Audio:</span><button class="select">Select file</button></div>
    <div class="newImg"><span>Image: </span> <button class="select">Select file</button></div>
    <div class="listBtn">
      <button class="btn cancel">Cancel</button>
      <button class="btn updateCreate">Create</button>
    </div>
    `;
    this.cancelBtn = this.element.querySelector('.cancel')!;
    this.updateCreateBtn = this.element.querySelector('.updateCreate')!;
    this.inputWord = this.element.querySelector('.inputWord')!;
    this.inputTranslation = this.element.querySelector('.inputTranslation')!;
    this.cancelBtn.addEventListener('click', () => {
      this.element.remove();
    });
    this.updateCreateBtn.addEventListener('click', () => {
      this.addNewWord();
    });
  }

  async addNewWord() : Promise<void> {
    const newWord = {
      word: this.inputWord.value,
      translation: this.inputTranslation.value,
      image: this.tryGetImg()!,
      audioSrc: this.tryGetAudio()!,
      categoryId: this.info.categoryId!,
    };
    await createCard(newWord);
    this.element.dispatchEvent(createWordEvent);
    this.clear();
  }

  tryGetImg() : string | undefined {
    let imgSrc;
    if (this.info) {
      try {
        imgSrc = urlStatic + this.info.words[50].image;
      } catch (e) {
        imgSrc = './img/bg2.jpg';
      }
    }
    return imgSrc;
  }

  tryGetAudio(): string | undefined {
    let audioSrc;
    if (this.info) {
      try {
        audioSrc = urlStatic + this.info.words[50].audioSrc;
      } catch (e) {
        audioSrc = 'audio/not.mp3';
      }
    }
    return audioSrc;
  }

  clear() : void {
    this.element.remove();
  }
}
