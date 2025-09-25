import { sharedStyles } from "../styles.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sharedStyles];

    this.shadowRoot.innerHTML = `
    <style>
        .search-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }

        .search-container {
            display: flex;
            align-items: center;
            justify-content: center;
 }

        input{
        padding: 1.5rem;
        font-size: var(--font-size-base);
        border-radius: 0.5rem;
        background-color: var(--input-background);
        border: none;
        color: var(--primary-color);
        
        }

        .search-container *{
            margin: 0 10px;
            }

            .search-btn{
            background-color: var(--primary-color);
            color: white;
            border: none;
            }
            
</style>

<div class="search-wrapper">
<div class="search-container">
<h3>Search by:</h3>
    <input type="text" placeholder="tender name" />
    <button class="btn search-btn">Search</button>
    </div>
    <div class="date-range-container">
    </div>
</div>

`;
  }
}

customElements.define("search-bar", SearchBar);
