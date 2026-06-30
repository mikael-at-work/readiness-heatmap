let capabilities = ["PIM", "CMS", "Integration"];
let dimensions = ["Process", "Data", "Tech"];

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
        scores[cap][dim] = parseInt(e.target.value);
        render();
      };

      td.className = `score-${value}`;
      td.appendChild(input);

      tr.appendChild(td);
    });

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

render();