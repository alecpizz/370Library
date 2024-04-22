import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
const db = new Database('test.sqlite');
db.pragma('journal_mode = WAL')
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

app.post("/userLogin", (req, res) =>
{
     console.log(req.body);

     const stmt = db.prepare("SELECT user_id FROM Library_User WHERE user_name = ? AND password = ?");
     const result = stmt.get(req.body.username, req.body.password);

     res.send(JSON.stringify(result)); //we'll send the userID instead of the username
});

app.post("/empLogin", (req, res) =>
{
     console.log(req.body);

     const stmt = db.prepare("SELECT emp_id FROM Library_Emp WHERE emp_email = ? AND password = ?");
     const result = stmt.get(req.body.username, req.body.password);

     res.send(JSON.stringify(result)); //we'll send the userID instead of the username
});

app.post("/addToCart", (req, res) => {
     console.log(req.body);

     //do a database thing here where we add the bookID to the user's borrowed books.
     let book = req.body.bookID;
     let user = req.body.userID;
     //add the book to the user's loaned books
     //mark the book as unavaliable
     const stmt = db.prepare("UPDATE Book SET availability = 'unavailable' WHERE copy_id = ?");
     stmt.run(book);
     const stmt2 = db.prepare("UPDATE Book SET user_id = ? WHERE copy_id = ?"); //this might need more data.
     stmt2.run(user, book);
});

app.post("/returnBook", (req, res) => {
     //remove the book from the user's loaned books
     //mark the book as avaliable
     let book = req.body.bookID;
     let user = req.body.userID;
     const stmt = db.prepare("UPDATE Book SET availability = 'available' WHERE copy_id = ?");
     stmt.run(book);
     const stmt2 = db.prepare("UPDATE Book SET user_id = 0 WHERE copy_id = ?");
     stmt2.run(book);
});

//WHERE book_title LIKE '%$name%'", {$name: name});

app.post("/bookSearch", (req, res) => {

     const stmt = db.prepare("SELECT * FROM Book NATURAL JOIN Author WHERE book_title LIKE ? OR author_name LIKE ?");
     const result = stmt.all("%" + req.body.bookname + "%", "%" + req.body.bookname + "%");
     res.send(JSON.stringify(result));
});

app.post("/addBook", (req, res) => {
     let data = req.body;
     const stmt2 = db.prepare("SELECT * FROM Publisher WHERE publisher_name LIKE ?");
     const publisher = stmt2.get("%" + data.publisherName + "%");
     const stmt3 = db.prepare("SELECT * FROM Author WHERE author_name LIKE ?");
     const author = stmt3.get("%" + data.authorName + "%");
     const stmt = 
     db.prepare("INSERT INTO Book VALUES (:book_title, :ISBN, :dewey_decimal, :availability, :Genre, :Copy_id, :author_id, :user_id, :publisher_id)");
     const avaliablitiy = "available";
     const info = stmt.run({
          book_title: data.title,
          ISBN: data.isbn,
          dewey_decimal: data.deweyDecimalNumber,
          availability: avaliablitiy,
          Genre: data.genre,
          Copy_id: data.copyID,
          author_id: author.author_id,
          user_id: 0,
          publisher_id: publisher.publisher_id
     });
     res.send(JSON.stringify({result: info.changes}));
})

app.post("/userBooks", (req, res) => {
     let user = req.body.userID;
     const stmt = db.prepare("SELECT * FROM Book WHERE user_id = ?");
     const result = stmt.all(user);
     res.send(JSON.stringify(result));
});

app.post("/empData", (req, res) => {
     let user = req.body.userID;
     const stmt = db.prepare("SELECT * FROM Library_Emp where emp_id = ?");
     const result = stmt.get(user);
     res.send(JSON.stringify(result));
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
               db.exec(answer);
               const stmt = db.prepare(answer);
               console.log(stmt.all());
          }
          else
          {
               db.exec(answer);
               const stmt = db.prepare(answer);

               try
               {
                    stmt.all();
               }
               catch (error)
               {
                    stmt.run();
               }
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
