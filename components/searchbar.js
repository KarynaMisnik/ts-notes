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

              #results {
          margin-top: 10px;
        }
            
</style>

<div class="search-wrapper">
<div class="search-container">
<h3>Search by:</h3>
    <input type="text" id="tenderName" placeholder="tender name" />
    <button class="btn search-btn">Search</button>
    </div>
</div>
 <div id="results"></div>

`;

    this.tenders = []; // Will hold JSON data
  }

  connectedCallback() {
    // Fetch tender.json when component is attached
    fetch("data/tender.json")
      .then((res) => res.json())
      .then((data) => (this.tenders = data))
      .catch((err) => console.error("Failed to load tenders:", err));

    // Attach event listener to search button
    const btn = this.shadow.querySelector(".search-btn");
    btn.addEventListener("click", () => this.searchTender());
  }

  searchTender() {
    const input = this.shadow.querySelector("#tenderName");
    const query = input.value.trim().toLowerCase();
    const resultsDiv = this.shadow.querySelector("#results");

    if (!query) {
      resultsDiv.innerHTML = "<p>Please type a tender name</p>";
      return;
    }

    const foundTender = this.tenders.find(
      (t) => t.tender_name.toLowerCase() === query
    );

    if (foundTender) {
      resultsDiv.innerHTML = `
        <h4>${foundTender.tender_name}</h4>
        <p>ID: ${foundTender.tender_id}</p>
        <p>Notice Date: ${foundTender.notice_date}</p>
        <p>Close Date: ${foundTender.close_date}</p>
        <p>Disclosing Date: ${foundTender.disclosing_date}</p>
        <p>Status: ${foundTender.tender_status}</p>
      `;
    } else {
      resultsDiv.innerHTML = "<p>No tender found with that name</p>";
    }
  }
}

customElements.define("search-bar", SearchBar);
