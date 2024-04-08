import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookSearch = () => {
     let params = useParams();
     useEffect(() => {
          console.log('getting stuff from db here');
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ searchText: params.bookname })
          };
          fetch("http://localhost:5050/bookSearch", requestOptions).then((response) => response.json()).then((data) =>
          {
               setBookResults(data);
          }).catch((error) =>
          {
               
          });
    });

    const [bookSearchResult, setBookResults] = useState('');
    //need to read in all of the book search result objects

    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>Book Search Page</h1>
                <text>You searched for: {params.bookname}</text>
            </caption>
        </table>
    </div>;
}

export default BookSearch;
