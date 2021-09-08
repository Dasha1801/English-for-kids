// import { allCards } from '../public/image';
import { BaseComponent } from './base-component';
import { BtnGame } from './components/btnGame/btnGame';
import { Card } from './components/card/card';
import { FormRegistration } from './components/formRegistr/formRegistration';
import { Header } from './components/header/header';
import { MainPage } from './components/mainPage/mainPage';
import { sound } from './shared/sound';
import {
  correctStar, loseGameScreen, winGameScreen, wrongStar,
} from './shared/gameScore';
import { Star } from './components/stars/star';
import { Smile } from './components/smile/smile';
import { Footer } from './components/footer/footer';
import { HeaderBack } from './components/headerBack/headerBack';
import { PageCategory } from './components/pageCategory/pageCategory';
import { PageWord } from './components/pageWord/pageWord';
import {
  createCard, createCategory, deleteCard, deleteCategory, getCard, getCards, getCategories, getCategoryById, updateCard, updateCategory,
} from '../serverApi';
import { Category } from './shared/category';

export class App extends BaseComponent {
  headerBack : HeaderBack;

  header: Header;

  formRegistration : FormRegistration;

  mainPage : MainPage;

  btnGame : BtnGame;

  cardArray : Card[] = [];

  gameAudio = new Array<HTMLAudioElement>();

  star : Star;

  smile : Smile;

  footer : Footer;

  isMenuOpen = false;

  pageCategory : PageCategory;

  isAdmin = false;

  pageWord : PageWord;

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['main']);

    window.location.hash = '';
    this.pageWord = new PageWord();
    this.headerBack = new HeaderBack();
    this.pageCategory = new PageCategory();
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.star = new Star();
    this.rootElement.appendChild(this.star.element);
    this.smile = new Smile();
    this.rootElement.appendChild(this.smile.element);
    this.rootElement.appendChild(this.element);
    this.formRegistration = new FormRegistration();
    this.rootElement.appendChild(this.formRegistration.element);
    this.mainPage = new MainPage();
    this.btnGame = new BtnGame();
    this.rootElement.appendChild(this.btnGame.element);
    this.footer = new Footer();
    this.rootElement.appendChild(this.footer.element);

    this.header.burgerMenu.registrationBtn.addEventListener('click', () => {
      this.showPopup();
    });

    this.btnGame.btn.addEventListener('click', () => {
      this.gameMode();
    });

    this.header.burgerMenu.sidebarMenu.addEventListener('transitionend', () => {
      if (this.header.burgerMenu.inputCheckbox.checked) {
        this.isMenuOpen = true;
      } else {
        this.isMenuOpen = false;
      }
    });
    this.rootElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.sidebarMenu') || target.closest('a')) {
        if (this.isMenuOpen === true) {
          this.header.burgerMenu.inputCheckbox.dispatchEvent(new MouseEvent('click'));
        }
      }
    });

    window.addEventListener('hashchange', (e) => {
      const location = window.location.hash;

      if (location) {
        this.locationResolver(location, e);
      }
    });
    window.location.hash = '#/main-page';

    this.header.switch.input.addEventListener('click', () => {
      this.switchHandler();
    });
    this.rootElement.addEventListener('logIn', () => {
      this.isAdmin = true;
    });
    this.rootElement.addEventListener('logOut', () => {
      this.isAdmin = false;
    });
    this.rootElement.addEventListener('showWord', (e) => {
      const info = (e as CustomEvent).detail;
      this.element.innerHTML = '';
      this.showPageWords(info);
      this.rootElement.appendChild(this.element);
    });
  }

  initPage() :void {
    this.element.innerHTML = '';
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.star.element);
    this.rootElement.appendChild(this.smile.element);
    this.rootElement.appendChild(this.element);
    this.rootElement.appendChild(this.formRegistration.element);
    this.element.appendChild(this.mainPage.element);
    this.rootElement.appendChild(this.btnGame.element);
    this.rootElement.appendChild(this.footer.element);
    this.rootElement.classList.add('body');
    this.rootElement.classList.remove('bodyBack');
  }

  initAdminPage() :void {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.headerBack.element);
    this.rootElement.classList.remove('body');
    this.rootElement.classList.add('bodyBack');
  }

  showPopup() :void {
    this.formRegistration.element.style.display = 'block';
    this.header.burgerMenu.inputCheckbox.dispatchEvent(new MouseEvent('click'));
  }

  locationResolver = (location:string, e:HashChangeEvent):void => {
    const oldUrl = (e.oldURL).split('#')[1];
    const newUrl = (e.newURL).split('#')[1];
    if (newUrl === '') {
      return;
    }
    this.resetGame();
    this.cardArray.length = 0;
    this.header.burgerMenu.updateSidebar();
    switch (location) {
      case '#/main-page':
        this.rootElement.innerHTML = '';
        this.mainPage.update();
        this.initPage();
        this.switchHandler();
        break;
      case '#/categories':
        if (this.isAdmin) {
          this.initAdminPage();
          this.rootElement.appendChild(this.pageCategory.element);
        } else {
          window.location.hash = '#/main-page';
        }

        break;
      case '#/word':
        if (this.isAdmin) {
          // this.initAdminPage();
        } else {
          window.location.hash = '#/main-page';
        }
        break;
      default:
        this.element.innerHTML = '';
        this.switchHandler();
        break;
    }
    document.getElementById(oldUrl)?.classList.remove('active');
    document.getElementById(newUrl)?.classList.add('active');
  };

  showPageWords(info : Category) :void {
    this.initAdminPage();
    this.element.appendChild(this.pageWord.element);
    this.pageWord.init(info);
  }

  async switchHandler() : Promise<void> {
    if (this.header.switch.input.checked === false && window.location.hash !== '#/main-page') {
      await this.updateCardArray();
      this.btnGame.btn.style.display = 'block';
      this.resetGame();
      this.cardArray.forEach((card) => {
        card.hideWord();
      });
    } else if (window.location.hash === '#/main-page') {
      this.btnGame.hideBtnAll();
    } else {
      // тренировочный режим
      await this.updateCardArray();
      this.btnGame.hideBtnAll();
      this.resetGame();
      this.cardArray.forEach((card) => {
        card.showWord();
      });
    }
  }

  async categoryHandler(hash:string) : Promise<void> {
    const indexCategory = +hash.slice(11);
    const category = await getCategoryById(indexCategory);
    category?.words.forEach((card) => {
      const newCard = new Card(card);
      this.cardArray.push(newCard);
      this.element.appendChild(newCard.element);
    });
  }

  addStarTrue() :void {
    this.star.element.appendChild(correctStar());
  }

  addStarFalse() :void {
    this.star.element.appendChild(wrongStar());
  }

  hideElementGame() :void {
    this.star.element.innerHTML = '';
    this.element.innerHTML = '';
    this.btnGame.repeat.style.display = 'none';
  }

  addWinSmile() :void {
    this.smile.element.appendChild(winGameScreen());
    this.smile.element.style.marginTop = '90px';
  }

  goMainPage() :void {
    setTimeout(() => {
      this.smile.element.innerHTML = '';
      window.location.hash = '#/main-page';
    }, 2000);
  }

  resetGame() :void {
    this.star.element.innerHTML = '';
    this.cardArray.forEach((card) => {
      card.element.classList.remove('noActive');
    });
    this.btnGame.repeat.style.display = 'none';
  }

  async updateCardArray() :Promise<void> {
    this.cardArray.length = 0;
    this.element.innerHTML = '';
    const location = window.location.hash;
    await this.categoryHandler(location);
  }

  gameMode() :void {
    // счетчик кликов
    let errorCounter = 0;
    this.gameAudio.length = 0;
    this.btnGame.showBtnRepeat();
    // создаем массив рандомных аудио
    this.cardArray.forEach((card) => {
      this.gameAudio.push(card.audio);
      this.gameAudio.sort(() => Math.random() - 0.5);
      // отслеживаем событие клика на карточку и соответствует ли она аудио
      card.element.addEventListener('click', () => {
        // counter++;
        card.audio.pause();
        // проверка на соответствие
        if (card.audio === this.gameAudio[0]) {
          sound.correct();
          this.gameAudio.shift();
          card.element.classList.add('noActive');
          this.addStarTrue();
          setTimeout(() => {
            this.gameAudio[0].play();
          }, 2000);
          if (this.gameAudio.length === 0 && errorCounter === 0) {
            setTimeout(() => {
              this.hideElementGame();
              this.addWinSmile();
              sound.success();
              this.goMainPage();
            }, 2000);
          } else if (this.gameAudio.length === 0 && errorCounter > 0) {
            setTimeout(() => {
              this.hideElementGame();
              this.smile.element.appendChild(loseGameScreen(errorCounter));
              this.smile.element.style.marginTop = '90px';
              sound.failure();
              this.goMainPage();
            }, 2000);
          }
        } else {
          sound.error();
          this.addStarFalse();
          errorCounter++;
        }
      });
    });
    this.gameAudio[0].play();
    this.btnGame.repeat.addEventListener('click', () => {
      // при нажатии на кнопку - повторно слышим слово
      this.gameAudio[0].play();
    });
  }
}
