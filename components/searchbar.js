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

        .search-input-container {
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

        .search-input-container *{
            margin: 0 10px;
            }

            .search-btn{
            background-color: var(--primary-color);
            color: white;
            border: none;
            }

        #suggestions {
          max-height: 150px;
          overflow-y: auto;
          position: absolute;
          background: white;
          width: 300px;
        }
        #suggestions div {
          padding: 0.5rem;
          cursor: pointer;
        }
        #suggestions div:hover {
          background-color: #f0f0f0;
        }
        #results {
          margin-top: 10px;
        }
        .relative { position: relative; }
            
</style>

<div class="search-wrapper">
        <div class="search-input-container relative">
        <h3>Search by:</h3>
          <input type="text" id="tenderName" placeholder="Tender name" autocomplete="off" />
          <div id="suggestions"></div>
          <button class="search-btn">Search</button>
        </div>
      </div>
      <div id="results"></div>

`;

    this.tenders = [];
    // Bind method to ensure correct "this"
    this.showTender = this.showTender.bind(this);
  }

  connectedCallback() {
    // Load JSON
    fetch("data/tender.json")
      .then((res) => res.json())
      .then((data) => (this.tenders = data))
      .catch((err) => console.error("Failed to load tenders:", err));

    const input = this.shadow.querySelector("#tenderName");
    const suggestionsDiv = this.shadow.querySelector("#suggestions");
    const searchBtn = this.shadow.querySelector(".search-btn");

    // Suggest as user types
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      suggestionsDiv.innerHTML = "";
      if (!query) return;

      const matches = this.tenders.filter((t) =>
        t.tender_name.toLowerCase().includes(query)
      );
      matches.forEach((tender) => {
        const div = document.createElement("div");
        div.textContent = tender.tender_name;
        div.addEventListener("click", () => {
          input.value = tender.tender_name;
          suggestionsDiv.innerHTML = "";
          this.showTender(tender);
        });
        suggestionsDiv.appendChild(div);
      });
    });

    // Search button
    searchBtn.addEventListener("click", () => {
      const query = input.value.toLowerCase();
      const foundTender = this.tenders.find(
        (t) => t.tender_name.toLowerCase() === query
      );
      if (foundTender) this.showTender(foundTender);
      else
        this.shadow.querySelector("#results").innerHTML =
          "<p>No tender found with that name</p>";
    });
  }

  showTender(tender) {
    this.shadow.querySelector("#results").innerHTML = `
      <h4>${tender.tender_name}</h4>
      <p>ID: ${tender.tender_id}</p>
      <p>Notice Date: ${tender.notice_date}</p>
      <p>Close Date: ${tender.close_date}</p>
      <p>Disclosing Date: ${tender.disclosing_date}</p>
      <p>Status: ${tender.tender_status}</p>
    `;
  }
}

customElements.define("search-bar", SearchBar);
