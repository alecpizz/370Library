import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
    let params = useParams();
    //get the db entry from the user name, don't worry about security right now
    // ex: username/id was Alec, so make a query of all of alec's loaned books.
    const [loanedBooks, setLoanedBooks] = useEffect('');
     useEffect(() => {
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ userID: params.username })
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

    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>User Page</h1>
                <text>Username: {params.userid}</text>
            </caption>
        </table>
    </div>;
}

export default UserPage;
