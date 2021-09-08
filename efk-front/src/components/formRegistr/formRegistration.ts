import { BaseComponent } from '../../base-component';
import { logEvent } from '../../shared/customEvents';
import './formRegistration.scss';

export class FormRegistration extends BaseComponent {
  btnCancel: HTMLButtonElement;

  btnLogin: HTMLButtonElement;

  nameInput: HTMLInputElement;

  passwordInput: HTMLInputElement;

  constructor() {
    super('div', ['popup']);
    this.element.innerHTML = `
    <div class="popup__form">
    <form action="" class="registrationForm">
      <input type="text" class="names"  placeholder="admin" required>
      <input type="password" class="password" required placeholder="Password">
    </form>
    <div class="container-btn">
    <button class="btn login">login</button>
      <button class="btn cancel">cancel</button>
    </div>
    <div class="prompt">name - admin, password - any</div>
   </div>
    `;
    this.passwordInput = this.element.querySelector('.password')!;
    this.nameInput = this.element.querySelector('.names')!;
    this.btnCancel = this.element.querySelector('.cancel')!;
    this.btnLogin = this.element.querySelector('.login')!;
    this.btnCancel.addEventListener('click', () => {
      this.hidePopup();
    });

    this.btnLogin.addEventListener('click', () => {
      if (this.nameInput.value === 'admin') {
        this.hidePopup();
        this.element.dispatchEvent(logEvent);
        window.location.hash = '#/categories';
        this.nameInput.value = '';
        this.passwordInput.value = '';
      }
    });
  }

  hidePopup() :void {
    this.element.style.display = 'none';
  }
}
