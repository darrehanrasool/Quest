// script.js
// Enhanced JavaScript with search functionality and data population
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  document
    .getElementById("mobileToggle")
    .addEventListener("click", function () {
      document.getElementById("navLinks").classList.toggle("active");
    });

  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      if (document.getElementById("navLinks").classList.contains("active")) {
        document.getElementById("navLinks").classList.remove("active");
      }
    });
  });

  // Populate tables with data
  populateTable("coreTable", institutesData.iits.core);
  populateTable("emergingTable", institutesData.iits.emerging);
  populateTable("interTable", institutesData.iits.interdisciplinary);
  populateTable("nitCoreTable", institutesData.nits.core);
  populateTable("nitCseTable", institutesData.nits.cse);
  populateTable("nitInterTable", institutesData.nits.interdisciplinary);

  // Initialize search functionality
  initSearch("coreSearch", "coreTable");
  initSearch("emergingSearch", "emergingTable");
  initSearch("interSearch", "interTable");
  initSearch("nitCoreSearch", "nitCoreTable");
  initSearch("nitCseSearch", "nitCseTable");
  initSearch("nitInterSearch", "nitInterTable");

  // Initialize charts
  initCharts();
});

function populateTable(tableId, data) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    // Apply color coding based on admission marks
    let admissionClass = "marks-medium";
    if (item.admission >= 70) admissionClass = "marks-high";
    if (item.admission <= 55) admissionClass = "marks-low";

    row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.branch}</td>
            <td>${item.qualify}</td>
            <td class="${admissionClass}">${item.admission}</td>
            <td>${item.seats}</td>
            <td>${
              item.demand || item.growth || item.field || item.placement
            }</td>
        `;
    tbody.appendChild(row);
  });
}

function initSearch(inputId, tableId) {
  const searchInput = document.getElementById(inputId);
  const table = document.getElementById(tableId);

  searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(searchText) ? "" : "none";
    });
  });
}

function initCharts() {
  // IIT Comparison Chart
  const iitCtx = document.getElementById("iitComparisonChart").getContext("2d");
  new Chart(iitCtx, {
    type: "bar",
    data: {
      labels: ["Core", "Emerging", "Interdisciplinary"],
      datasets: [
        {
          label: "Average Qualifying Marks",
          data: [27.5, 29.0, 26.5],
          backgroundColor: "rgba(124, 58, 237, 0.7)",
        },
        {
          label: "Average Admission Marks",
          data: [65.8, 76.8, 55.2],
          backgroundColor: "rgba(37, 99, 235, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Marks" } },
      },
    },
  });

  // Branch Comparison Chart
  const branchCtx = document
    .getElementById("branchComparisonChart")
    .getContext("2d");
  new Chart(branchCtx, {
    type: "radar",
    data: {
      labels: [
        "IIT Bombay",
        "IIT Delhi",
        "IIT Madras",
        "IIT Kharagpur",
        "IIT Kanpur",
      ],
      datasets: [
        {
          label: "Core",
          data: [65, 68, 63, 62, 67],
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "rgba(16, 185, 129, 1)",
        },
        {
          label: "Emerging",
          data: [78, 76, 74, 75, 77],
          backgroundColor: "rgba(245, 158, 11, 0.2)",
          borderColor: "rgba(245, 158, 11, 1)",
        },
        {
          label: "Interdisciplinary",
          data: [58, 55, 62, 53, 57],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: { beginAtZero: true },
      },
    },
  });
}
