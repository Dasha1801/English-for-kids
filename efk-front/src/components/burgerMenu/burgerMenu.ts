import { getCategories } from '../../../serverApi';
import { BaseComponent } from '../../base-component';
import { SidebarLink } from '../../shared/sidebarLink';
import './burgerMenu.scss';

export class BurgerMenu extends BaseComponent {
  registrationBtn : HTMLButtonElement;

  sidebarMenu : HTMLElement;

  inputCheckbox : HTMLInputElement;

  sidebarIcon : HTMLElement;

  sidebarMenuInner : HTMLElement;

  constructor() {
    super('div', ['burger-menu']);
    this.element.innerHTML = `
    <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
     <label for="openSidebarMenu" class="sidebarIconToggle">
      <div class="spinner diagonal part-1"></div>
      <div class="spinner horizontal"></div>
      <div class="spinner diagonal part-2"></div>
     </label>
     <div class="sidebarMenu">
     <div class="sidebarMenuInner">
      <a href="#/main-page"  id="/main-page">Main Page</a>
     </div>
     <button class="registrationBtn">login</button>
     </div>
    `;
    this.registrationBtn = this.element.querySelector('.registrationBtn')!;
    this.sidebarMenu = this.element.querySelector('.sidebarMenu')!;
    this.inputCheckbox = this.element.querySelector('.openSidebarMenu')!;
    this.sidebarIcon = this.element.querySelector('.sidebarIconToggle')!;
    this.sidebarMenuInner = this.element.querySelector('.sidebarMenuInner')!;
  }

  async init() {
    const allCategory = await getCategories();
    allCategory.forEach((cat) => {
      this.sidebarMenuInner.appendChild(new SidebarLink(cat).element);
    });
  }

  clear() {
    this.sidebarMenuInner.innerHTML = '<a href="#/main-page"  id="/main-page">Main Page</a>';
  }

  updateSidebar() {
    this.clear();
    this.init();
  }
}
