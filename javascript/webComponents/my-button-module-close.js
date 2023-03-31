// my-button.js
class MyButton extends HTMLElement {
  
  static get observedAttributes() {
    return ['label'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} value changed from ${oldValue} to ${newValue}`);
    this.render();
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'closed' }); // changed mode to 'close'
  }

  connectedCallback() {
    // const label = this.getAttribute('label');
    // const template = document.createElement('template');
    // template.innerHTML = `
    //   <style>
    //     button {
    //       background-color: blue;
    //       color: white;
    //       padding: 10px 20px;
    //       font-size: 16px;
    //       border: none;
    //       border-radius: 4px;
    //     }
    //   </style>
    //   <button>${label}<slot></slot></button>
    // `;
    // this._root.appendChild(template.content.cloneNode(true));
    // this._root.appendChild(this.temp.content.cloneNode(true));
    // this._root.querySelector('button').addEventListener('click', this.onClick.bind(this));
    this.render()
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

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get temp() {
    // const label = this.getAttribute('label');
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
      <button>${this.label}<slot></slot></button>
    `;
    // return template.content.cloneNode(true)
    return template
  }
  

  render() {
    // this._root.innerHTML = '';
    while (this._root.firstChild) {
      this._root.removeChild(this._root.lastChild);
    }
    console.log(this.temp)
    this._root.appendChild(this.temp.content.cloneNode(true));
    // this._root.innerHTML = this.temp.content.cloneNode(true);
    this._root.querySelector('button').addEventListener('click', this.onClick.bind(this));
  }
}

// Export MyButton to global namespace
if (typeof window !== 'undefined') {
  window.MyButton = MyButton;
  window.customElements.define('my-button', MyButton);
  console.log('in window')
}

export default MyButton;
