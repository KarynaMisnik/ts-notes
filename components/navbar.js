import "./timestamp.js";

class MyNavbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        nav {
          background: #333;
          padding: 10px;
        }
        nav a {
          color: white;
          margin-right: 15px;
          text-decoration: none;
        }
      </style>
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
    `;
  }
}
customElements.define("page-navbar", MyNavbar);
