import app from "./src/app.js";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
