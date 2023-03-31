  // my-button.js
  class MyButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
    }

    connectedCallback() {
      const label = this.getAttribute('label');
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          button {
            background-color: blue;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
          }
        </style>
        <button>${label}<slot></slot></button>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('button').addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
      console.log(this.getAttribute('label'))
      const eventName = this.getAttribute('event');
      const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  // 將 MyButton 導出到全局命名空間中
  if (typeof window !== 'undefined') {
    window.MyButton = MyButton;
    window.customElements.define('my-button', MyButton);
    console.log('in window')
  }

  export default MyButton;
