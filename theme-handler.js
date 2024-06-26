import { LitElement, css, html } from "lit";

class ThemeToggler extends LitElement {
  static get properties() {
    return {
      brand: { state: true },
      color: { state: true },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          padding: 10px;
          background-color: lightgrey;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 14px;
        }

        select {
          display: block;
          font-size: 16px;
          width: 100px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.color = "blue";
    this.brand = "pc";
  }

  updated() {
    // adjustAdoptedStylesheetsMixin responds to this event
    // by dynamically importing the right stylesheet and applying it
    // to the host's shadowRoot adoptedStyleSheets
    this.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: { brand: this.brand, color: this.color },
      })
    );
  }

  render() {
    return html`
      <label>
        Brand
        <select @change=${this.onBrandChange}>
          <option>pc</option>
          <option>ucc</option>
          <option>pencs</option>
        </select>
      </label>
      <label>
        Color
        <select @change=${this.onColorChange}>
          <option>blue</option>
          <option>gray</option>
          <option>white</option>
          <option>darkslategray</option>
          <option>green</option>
        </select>
      </label>
    `;
  }

  onColorChange(ev) {
    const val = ev.target.selectedOptions[0].value;
    this.color = val;
  }

  onBrandChange(ev) {
    const val = ev.target.selectedOptions[0].value;
    this.brand = val;
  }
}
customElements.define("theme-toggler", ThemeToggler);
