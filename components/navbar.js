import "./timestamp.js";
import { sharedStyles } from "../styles.js";

class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];

    this.shadowRoot.innerHTML = `
     
      <style>
       
        .nav-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 4px solid var(--primary-color);
          color: var(--primary-color);
          font-family: Roboto, sans-serif;
          box-sizing: border-box;
        }

        .nav-top {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 10px;
        }

        .logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        h3 {
          margin: 0;
          color: var(--primary-color);
        }

        .nav-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-links a {
          color: var(--primary-color);
          margin-right: 15px;
          text-decoration: none;
        }

        .btn {
       background-color: var(--primary-color);
       color: white;
       border: none;
       margin: 0 5px;
          }

        /* Responsive Logo Sizes */
        @media (min-width: 768px) {
          .logo {
            width: 80px;
            height: 80px;
          }
        }

        @media (min-width: 1200px) {
          .logo {
            width: 120px;
            height: 120px;
          }
        }
      </style>

      <div class="nav-container">
        <show-time></show-time>
        <div class="nav-top">
          <div class="logo-container">
            <img src="./img/tendering-logo-500.png" alt="Logo" class="logo" />
            <h3>City Tender</h3>
          </div>
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <button class="btn login-staff">Staff Login</button>
            <button class="btn company-login">Company Login</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-navbar", CustomNavbar);
