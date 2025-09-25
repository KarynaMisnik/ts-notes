import { sharedStyles } from "../styles.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];

    this.shadowRoot.innerHTML = `
    <style>
        .search-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
        }
            
</style>

<div class="search-container">
<h3>Search Tenders:</h3>
</div>

`;
  }
}

customElements.define("search-bar", SearchBar);
