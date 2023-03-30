// // my-button.js
// class MyButton extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//       this.shadowRoot.innerHTML = `
//         <style>
//           button {
//             background-color: blue;
//             color: white;
//             padding: 10px 20px;
//             font-size: 16px;
//             border: none;
//             border-radius: 4px;
//           }
//           button:hover {
//             background-color: rgba(0,0,255,0.8);
//           }
//         </style>
//         <button>${this.getAttribute('label')}</button>
//       `;
//       this.shadowRoot.querySelector('button').addEventListener('click', () => {
//         console.log('Button clicked!');
//       });
//     }
//   }
  
//   window.customElements.define('my-button', MyButton);

//   // my-button.js
// class MyButton extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//       this.shadowRoot.innerHTML = `
//         <style>
//           button {
//             background-color: blue;
//             color: white;
//             padding: 10px 20px;
//             font-size: 16px;
//             border: none;
//             border-radius: 4px;
//           }
//           button:hover {
//             background-color: rgba(0,0,255,0.8);
//           }
//         </style>
//         <button onclick="${this.getAttribute('onclick')}">${this.getAttribute('label')}</button>
//       `;
//     }
//   }
  
//   window.customElements.define('my-button', MyButton);

// // my-button.js
// class MyButton extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//       const label = this.getAttribute('label');
//       this.shadowRoot.innerHTML = `
//         <style>
//           button {
//             background-color: blue;
//             color: white;
//             padding: 10px 20px;
//             font-size: 16px;
//             border: none;
//             border-radius: 4px;
//           }
//         </style>
//         <button>${label}</button>
//       `;
//       this.shadowRoot.querySelector('button').addEventListener('click', this.onClick.bind(this));
//     }
  
//     onClick() {
//         console.log(this.getAttribute('label'))
//       const eventName = this.getAttribute('event');
//       const event = new CustomEvent(eventName, { bubbles: true, composed: true });
//       this.dispatchEvent(event);
//     }
//   }
  
//   window.customElements.define('my-button', MyButton);

  // my-button.js
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const label = this.getAttribute('label');
    this.shadowRoot.innerHTML = `
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
    this.shadowRoot.querySelector('button').addEventListener('click', this.onClick.bind(this));
  }
  
  onClick() {
      console.log(this.getAttribute('label'))
    const eventName = this.getAttribute('event');
    const event = new CustomEvent(eventName, { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
}
  
  window.customElements.define('my-button', MyButton);