import { BaseComponent } from '../../base-component';
import './footer.scss';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = `
    <div class="footer-container">
      <a class="github" href="https://github.com/Dasha1801" target="_blank" rel="noopener noreferrer">github</a>
      <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener">
        <span class="rss-year">'21</span>
      </a>
    </div>
    `;
  }
}
