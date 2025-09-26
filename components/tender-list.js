class TenderList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <style>
        .tender {
          border: 1px solid #ddd;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 0.5rem;
          background: #fafafa;
        }
        .tender h4 {
          margin: 0 0 0.5rem 0;
        }
      </style>
      <div id="tenders"></div>
    `;
  }

  connectedCallback() {
    fetch("data/tender.json")
      .then((res) => res.json())
      .then((data) => {
        this.renderTenders(data);
      })
      .catch((err) => console.error("Error loading tenders:", err));
  }

  renderTenders(tenders) {
    const container = this.shadow.querySelector("#tenders");
    container.innerHTML = ""; // clear before rendering

    tenders.forEach((t) => {
      const tenderEl = document.createElement("div");
      tenderEl.classList.add("tender");
      tenderEl.innerHTML = `
        <h4>${t.tender_name}</h4>
        <p><b>ID:</b> ${t.tender_id}</p>
        <p><b>Notice date:</b> ${t.notice_date}</p>
        <p><b>Close date:</b> ${t.close_date}</p>
        <p><b>Disclosing date:</b> ${t.disclosing_date}</p>
        <p><b>Status:</b> ${t.tender_status}</p>
      `;
      container.appendChild(tenderEl);
    });
  }
}

customElements.define("tender-list", TenderList);
