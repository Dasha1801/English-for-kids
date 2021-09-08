import './card.scss';
import { BaseComponent } from '../../base-component';
import { CardInfo } from '../../shared/cardInfo';
import { urlStatic } from '../../../serverApi';

export class Card extends BaseComponent {
  audio : HTMLAudioElement;

  rotate : HTMLElement;

  word : HTMLElement;

  cardFront : HTMLElement;

  constructor(info : CardInfo) {
    super('div', ['card-container']);
    this.audio = new Audio(Card.getAudio(info.audioSrc));
    this.element.innerHTML = `
    <div class="card">
      <div class="card__front"  style="background-image: url(${Card.getImgFromServer(info.image)})">
        <div class="word">${info.word}<span class="rotate"></span></div>
      </div>
      <div class="card__back" style="background-image: url(${Card.getImgFromServer(info.image)})">
        <div class="word">${info.translation}</div>
      </div>
    </div>
        `;

    this.rotate = this.element.querySelector('.rotate')!;
    this.word = this.element.querySelector('.word')!;
    this.cardFront = this.element.querySelector('.card__front')!;

    this.rotate.addEventListener('click', () => {
      this.element.classList.add('flipped');
      this.element.addEventListener('mouseleave', () => {
        this.element.classList.remove('flipped');
      }, {
        once: true,
      });
    });

    this.element.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement);
      if (target.closest('.card__front') && !target.closest('.rotate')) {
        this.audio.play();
      }
    });
  }

  static getAudio(path:string) : string {
    const audio = `${path.slice(0, 6)}tasks_rslang_english-for.kids.data_audio_${path.slice(6)}`;
    return urlStatic + audio;
  }

  hideWord() : void {
    this.word.style.display = 'none';
    this.cardFront.style.backgroundSize = '300px 255px';
  }

  showWord() : void {
    this.word.style.display = 'flex';
    this.cardFront.style.backgroundSize = 'contain';
  }

  static getImgFromServer(path:string):string {
    return urlStatic + path;
  }
}
