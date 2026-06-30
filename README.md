# Readiness Heatmap

Lightweight browser-based tool for visualizing capability readiness across key dimensions (e.g. Process, Data, Technology).

Designed for fast iteration, workshops, and early-phase (G0/G1) alignment — no backend, no dependencies.

---

## 🎯 Purpose

The Readiness Heatmap helps you:

- Assess current maturity across capabilities (e.g. PIM, CMS, Integration)
- Identify gaps, risks, and uneven maturity
- Support architectural and platform decisions
- Enable structured discussions in workshops and steering forums

Typical use cases:
- PIM / CMS pre-study
- Digital platform assessments
- Integration maturity evaluation
- Cross-functional readiness mapping

---

## 🧱 Architecture

Pure frontend (no build step):

/ (root)
├── index.html              # Tool launcher
├── /data-flow-mapper       # Existing tool
└── /readiness-heatmap
├── index.html        # Heatmap UI
├── styles.css        # Styling + heatmap colors
└── app.js            # Core logic

---

## 🚀 Getting started

1. Clone or download the repository
2. Open:


/index.html

3. Click **Readiness Heatmap**

No installation required.

---

## 🧠 Concept model

The heatmap is a matrix:

|                | Process | Data | Technology |
|----------------|--------|------|------------|
| PIM            |   2    |  3   |     4      |
| CMS            |   3    |  3   |     3      |
| Integration    |   1    |  2   |     4      |

### Components

- **Capabilities (rows)**  
  Business or technical domains  
  Examples:
  - PIM  
  - CMS  
  - Integration  
  - Governance  

- **Dimensions (columns)**  
  Evaluation perspectives  
  Examples:
  - Process  
  - Data  
  - Technology  
  - Ownership  

- **Scores (cells)**  
  Range: `1–5`

---

## 🎨 Scoring model

| Score | Meaning        | Interpretation            |
|------|--------------|---------------------------|
| 1    | Very Low      | Fragmented / missing      |
| 2    | Low           | Initial / inconsistent    |
| 3    | Medium        | Defined but immature      |
| 4    | High          | Controlled & scalable     |
| 5    | Very High     | Optimized / best practice |

### Color mapping

- 1–2 → 🔴 Red (risk / weak)
- 3 → 🟡 Yellow (acceptable)
- 4–5 → 🟢 Green (strong)

---

## ⚙️ Features (MVP)

- Dynamic grid rendering
- Editable scores (1–5)
- Add new:
  - Capabilities
  - Dimensions
- Visual color-based heatmap
- Instant recalculation on change

---

## 🛠 How to use

### 1. Define structure

Add:
- Capabilities (rows)
- Dimensions (columns)

Example:


Capabilities:  PIM, CMS, Integration
Dimensions:    Process, Data, Technology, Ownership

### 2. Score each cell

Set values between `1–5`.

### 3. Interpret results

Look for:
- Low scores → critical gaps
- Uneven rows → unstable capability
- Weak columns → systemic issue

---

## 🧩 Data model (internal)

The app uses a simple in-memory structure:

```javascript
capabilities = ["PIM", "CMS"];
dimensions = ["Process", "Data"];

scores = {
  "PIM": {
    "Process": 3,
    "Data": 4
  },
  "CMS": {
    "Process": 2,
    "Data": 3
  }
};