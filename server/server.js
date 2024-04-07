import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('test.sqlite');
import rl from 'readline'
const readline = rl.createInterface({ input: process.stdin, output: process.stdout });

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`\nServer listening on port ${PORT}`);
  db.each("SELECT * from LOREM", (err, row) => {
    console.log(row);
  });
});

function askQuestion() {
  readline.question("Enter a query or 'exit' to quit: ", (answer) => {
    if (answer.toLowerCase() === 'exit') {
      console.log('exiting!');
      db.close();
      readline.close();
      process.exit();
    }
    console.log(`ASKING DB: "${answer}"`);
    db.exec(answer);
    askQuestion();
  })
}

askQuestion();

// while(!exit)
// {
//     const readline = rl.createInterface({input: process.stdin, output: process.stdout});
//     readline.question("Enter an SQL query or 'exit' to exit: ", (answer) => {
//       readline.close();
//       if(answer == 'exit')
//       {
//         exit = true;
//       }
//       else
//       {
//           db.run(answer);
//       }
//     });
// }

// process.on("SIGINT", function () {
//   //graceful shutdown
//   console.log('exiting!');
//   db.close();
//   process.exit();
// });