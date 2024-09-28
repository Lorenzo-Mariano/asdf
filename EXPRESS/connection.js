import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "192.168.126.184",
  user: "root",
  password: "password",
  database: "expresser",
});

connection.query("SELECT * from users", (err, results) => {
  if (err) {
    return console.log(err);
  }

  console.log(results);
});
