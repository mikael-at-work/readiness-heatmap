let capabilities = ["PIM", "CMS", "Integration", "Governance"];
let dimensions = ["Process", "Data", "Technology", "Ownership"];

let scores = {};

// Initialize scores
function initScores() {
  capabilities.forEach(cap => {
    if (!scores[cap]) scores[cap] = {};
    dimensions.forEach(dim => {
      if (!scores[cap][dim]) scores[cap][dim] = 3;
    });
  });
}

function render() {
  initScores();

  const container = document.getElementById("heatmap");
  container.innerHTML = "";

  let table = document.createElement("table");

  // Header row
  let headerRow = document.createElement("tr");
  headerRow.appendChild(document.createElement("th"));

  dimensions.forEach(dim => {
    let th = document.createElement("th");
    th.innerText = dim;
    headerRow.appendChild(th);
  });

  let avgHeader = document.createElement("th");
  avgHeader.innerText = "Avg";
  headerRow.appendChild(avgHeader);

  table.appendChild(headerRow);

  // Rows
  capabilities.forEach(cap => {
    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.innerText = cap;
    tr.appendChild(th);

    dimensions.forEach(dim => {
      let td = document.createElement("td");
      let value = scores[cap][dim];

      let input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 5;
      input.value = value;

      input.onchange = (e) => {
        let val = parseInt(e.target.value);

        if (isNaN(val) || val < 1) val = 1;
        if (val > 5) val = 5;

        scores[cap][dim] = val;
        render();
      };

      td.className = `score-${value}`;
      td.appendChild(input);

      tr.appendChild(td);
    });

    let total = 0;

    dimensions.forEach(dim => {
      total += scores[cap][dim];
    });

    let avg = (total / dimensions.length).toFixed(1);

    let avgTd = document.createElement("td");
    avgTd.innerText = avg;
    avgTd.style.fontWeight = "bold";

    tr.appendChild(avgTd);

    table.appendChild(tr);
  });

  container.appendChild(table);
}

// Add capability
function addCapability() {
  const name = prompt("Capability name:");
  if (!name) return;

  capabilities.push(name);
  render();
}

// Add dimension
function addDimension() {
  const name = prompt("Dimension name:");
  if (!name) return;

  dimensions.push(name);
  render();
}

function exportData() {
  const data = {
    capabilities,
    dimensions,
    scores
  };

  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  alert("Copied to clipboard");
}

render();