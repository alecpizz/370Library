import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
    let params = useParams();
    //get the db entry from the user name, don't worry about security right now
    // ex: username/id was Alec, so make a query of all of alec's loaned books.
    const [loanedBooks, setLoanedBooks] = useState('');
     useEffect(() => {
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ userID: params.userid })
          };
          fetch("http://localhost:5050/userBooks", requestOptions).then((response) => response.json()).then((data) =>
          {
               setLoanedBooks(data);
          }).catch((error) =>
          {
               
          });
     });

     function returnBook(bookID)
     {
          const userID = params.username;
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ bookID: bookID, userID: userID })
          };
          try {
               fetch("http://localhost:5050/returnBook", requestOptions);
          } catch (error) {
               
          }
     }

     function buildPage(){
          if(loanedBooks.length == 0)
          {
               return (<div><h2>No Books Loaned.</h2></div>)
          }
          let elements = [];
          for(let i = 0; i < loanedBooks.length; i++)
          {
               let current = loanedBooks[i];
               var newElement = (<div>
                    <h1>Title: {current.book_title}</h1>
                    <h2>ISBN: {current.ISBN}</h2>
                    <h3>Dewey Decimal Number: {current.dewey_decimal}</h3>
                    <h3>Genre: {current.Genre}</h3>
                    <h3>Copy ID: {current.Copy_id}</h3>
                    <h3>Author ID: {current.author_id}</h3>
                    <h3>Publisher ID: {current.publisher_id}</h3>
                    {buildButton("Return Book", function() {returnBook(current.Copy_id)})}
               </div>);
               elements.push(newElement);
          }
          return elements;
        }

        function buildButton(text, onClick){
          return (<button onClick={onClick}>{text}</button>)
        }

    return <div>
                <h1 className="text-center">User Page</h1>
                <body className="text-center">User ID: {params.userid}</body>
          <h1>Loaned Books:</h1>
        {buildPage()}
    </div>;
}

export default UserPage;
