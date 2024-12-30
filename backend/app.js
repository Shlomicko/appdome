const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { mockTreeData } = require("./data");
const { log } = require("console");
const app = express();

const OUTPUT_DIR = path.join(__dirname, "output");
fs.mkdir(OUTPUT_DIR, { recursive: true }).catch(console.error);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function processNodes(node, results) {
  if (Array.isArray(node)) {
    for (const n of node) {
      if (!results[n.category]) {
        results[n.category] = [];
      }
      results[n.category].push(n);
      if (n.children?.length > 0) {
        n.children.forEach((child) => {
          processNodes(child, results);
        });
      }
    }
  } else {
    results[node.category] = [node];
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
  res.json(mockTreeData);
});

app.post("/api/process-data", async (req, res) => {
  const processedNodes = processNodes(req.body.nodes, Object.create({}));
  await writeToFiles(processedNodes);
  res.json({
    message: "All is quiet at the western front",
    categories: Object.keys(processedNodes),
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
