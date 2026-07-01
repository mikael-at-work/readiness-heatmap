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
      if (value <= 2) {
        td.style.border = "2px solid #ef4444";
      }
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

function calculateEvaluation() {
  let totalScore = 0;
  let totalCount = 0;

  let capabilityResults = [];

  capabilities.forEach(cap => {
    let sum = 0;

    dimensions.forEach(dim => {
      let val = scores[cap][dim];
      sum += val;

      totalScore += val;
      totalCount++;
    });

    let avg = sum / dimensions.length;

    capabilityResults.push({
      name: cap,
      avg: avg.toFixed(1)
    });
  });

  let overall = (totalScore / totalCount).toFixed(2);

  let maturity = "";
  if (overall < 2.5) maturity = "Low maturity (fragmented)";
  else if (overall < 3.5) maturity = "Moderate maturity (developing)";
  else if (overall < 4.5) maturity = "High maturity (controlled)";
  else maturity = "Very high maturity (optimized)";

  let weakest = capabilityResults
    .sort((a, b) => a.avg - b.avg)
    .slice(0, 2)
    .map(c => `${c.name} (${c.avg})`)
    .join(", ");

  let html = `
  <h3>Readiness Assessment</h3>

  <p style="font-size:18px;">
    <strong>${overall}</strong> / 5 → ${maturity}
  </p>

  <p>
    Overall capability maturity is <strong>${maturity}</strong>, with the most pressure on:
    <strong>${weakest}</strong>
  </p>

  <hr style="border:none;border-top:1px solid rgba(255,255,255,0.2); margin:15px 0"/>

  <h4>Breakdown</h4>
  <ul>
    ${capabilityResults.map(c =>
      `<li>${c.name}: <strong>${c.avg}</strong></li>`
    ).join("")}
  </ul>

  <h4>What this means</h4>
  <ul>
    <li>Low scores indicate operational or structural gaps</li>
    <li>Variation suggests lack of alignment across capabilities</li>
    <li>Improving weakest areas will unlock system-wide maturity</li>
  </ul>
`;

  let evaluationEl = document.getElementById("evaluation");
  if (!evaluationEl) {
    evaluationEl = document.createElement("div");
    evaluationEl.id = "evaluation";
    evaluationEl.className = "panel";
    evaluationEl.style.marginTop = "20px";
    document.body.appendChild(evaluationEl);
  }

  evaluationEl.innerHTML = html;
}

render();