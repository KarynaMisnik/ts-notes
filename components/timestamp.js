class MyTime extends HTMLElement {
  constructor() {
    super();

    // Create Shadow DOM (isolated styles/HTML)
    this.shadow = this.attachShadow({ mode: "open" });

    // Initial HTML
    this.shadow.innerHTML = `
      <style>
        .clock {
          font-family: Roboto, sans-serif;
          font-size: 1.5rem;
          background: pink;
          color: red;
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-block;
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
