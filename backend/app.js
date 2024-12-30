const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

const OUTPUT_DIR = path.join(__dirname, "output");
fs.mkdir(OUTPUT_DIR, { recursive: true }).catch(console.error);

function processNodes(node, results = {}) {
  if (!results[node.category]) {
    results[node.category] = [];
  }

  results[node.category].push({
    id: node.id,
    label: node.label,
  });

  // Process children
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      processNodes(child, results);
    });
  }

  return results;
}

async function writeToFiles(results) {
  const writePromises = Object.entries(results).map(
    async ([category, items]) => {
      const filePath = path.join(OUTPUT_DIR, `${category}.json`);
      await fs.writeFile(filePath, JSON.stringify(items, null, 2));
    }
  );

  return Promise.all(writePromises);
}

app.get("/api/data", (req, res) => {
  res.send(mockTreeData);
});

app.post("/api/process-data", async (req, res) => {
  const processedNodes = processNodes(req.body.nodes);
  await writeToFiles(processNodes);
  res.json({
    message: "All is quiet at the western front",
    categories: Object.keys(results),
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
