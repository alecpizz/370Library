const express = require('express');
const cors = require('cors');
// import records from "./routes/record.js";

const fs = require('fs');
const initSqlJs = require('sql.js');
const filebuffer = fs.readFileSync('test.sqlite');

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


initSqlJs().then(function (SQL) {
  // Load the db
  const db = new SQL.Database(filebuffer);
});
// app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});