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

app.listen(PORT, async () =>
{
     console.log(`\nServer listening on port ${PORT}`);
});

app.post("/login", (req, res) =>
{
     console.log(req.body);
     res.send({userID: "53"}); //we'll send the userID instead of the username
});

app.post("/addToCart", (req, res) => {
     //do a database thing here where we add the bookID to the user's borrowed books.
     let book = req.body.bookID;
     let user = req.body.userID;
});

app.post("/returnBook", (req, res) => {
     //do a database thing here where we add the bookID to the user's borrowed books.
     let book = req.body.bookID;
     let user = req.body.userID;
});

app.post("/userBooks", (req, res) => {
     let user = req.body.userID;

});

function askQuestion()
{
     readline.question("Enter a query or 'exit' to quit: ", (answer) =>
     {
          if (answer.toLowerCase() === 'exit')
          {
               console.log('exiting!');
               db.close();
               readline.close();
               process.exit();
          }

          console.log(`ASKING DB: "${answer}"`);
          if (answer.toLowerCase().includes("select"))
          {
               db.each(answer, (err, row) =>
               {
                    console.log(row);
               });
          }
          else
          {
               db.exec(answer);
          }
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
