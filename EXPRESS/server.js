import express from "express";
import { connection } from "./connection.js";

const app = express();
const port = 3000;

app.listen(() => {
  console.log(`Server running on port ${port}`);
});
