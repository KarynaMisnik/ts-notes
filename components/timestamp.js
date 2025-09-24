import { sharedStyles } from "../styles.js";

class MyTime extends HTMLElement {
  constructor() {
    super();

    // Create Shadow DOM (isolated styles/HTML)
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];

    // Initial HTML
    this.shadowRoot.innerHTML = `
  
      <style>
         

        .clock {
          font-family: var(--primary-font);
          font-size: var(--font-size-sm); 
          color: var(--secondary-color);
          margin: 5px 0 0 0;
          padding: 0,

  }
      </style>
      <div class="clock">--:--:--</div>
    `;
  }

  connectedCallback() {
    // Called when component is added to the DOM
    this.startClock();
  }

  disconnectedCallback() {
    // Called when component is removed
    clearInterval(this.timer);
  }

  startClock() {
    const clockEl = this.shadow.querySelector(".clock");

    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      clockEl.textContent = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    };

    updateTime(); // run once immediately
    this.timer = setInterval(updateTime, 1000);
  }
}

customElements.define("show-time", MyTime);
