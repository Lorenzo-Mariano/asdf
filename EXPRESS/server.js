import express from "express";
import cors from "cors";
import { connection } from "./connection.js";

const app = express();
const port = 3000;

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/student", async (req, res) => {
  connection.query("SELECT * from users", (err, results) => {
    if (err) {
      return console.log(err);
    }
    return res.send(results);
  });
});

app.post("/student", async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.age ||
    !req.body.course
  ) {
    console.log("Missing input data.");
  } else {
    connection.query(
      `INSERT INTO users (first_name, last_name, age, course) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.age}', '${req.body.course}')`,
      (err, results) => {
        if (err) {
          console.log(err);
        }

        res.send({ success: true });
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
