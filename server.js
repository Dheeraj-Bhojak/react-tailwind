import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; // Import join function from path

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(join(__dirname, "build"))); // Use join function instead of path.join

app.get("/", function (req, res) {
  res.sendFile(join(__dirname, "build", "index.html")); // Use join function instead of path.join
});

app.listen(PORT, () => {
  console.log("React Server is Running on PORT: ", PORT);
});
