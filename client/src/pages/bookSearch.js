import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookSearch = () => {
     let params = useParams();
     useEffect(() => {
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ bookname: params.bookname })
          };
          fetch("http://localhost:5050/bookSearch", requestOptions).then((response) => response.json()).then((data) =>
          {
               setBookResults(data);
          }).catch((error) =>
          {
               
          });
    });

    function addToCart(bookID){
          const userID = getCookie("username");
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ bookID: bookID, userID: userID })
          };
          try {
               fetch("http://localhost:5050/addToCart", requestOptions);
          } catch (error) {
               
          }
    }

    function getCookie(cname) {
     let name = cname + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');
     for(let i = 0; i <ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
     }
     return "";
   }

   
   const [bookSearchResult, setBookResults] = useState('');
   //need to read in all of the book search result objects
   function buildPage(){
     let elements = [];
     for(let i = 0; i < bookSearchResult.length; i++)
     {
          let current = bookSearchResult[i];
          var newElement = (<div>
               <h1>Title: {current.book_title}</h1>
               <h2>ISBN: {current.ISBN}</h2>
               <h3>Dewey Decimal Number: {current.dewey_decimal}</h3>
               <h3>Genre: {current.Genre}</h3>
               <h3>Copy ID: {current.Copy_id}</h3>
               <h3>Author ID: {current.author_id}</h3>
               <h3>Publisher ID: {current.publisher_id}</h3>
          </div>);
          elements.push(newElement);
     }
     return elements;
   }

    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>Book Search Page</h1>
                <text>You searched for: {params.bookname}</text>     
            </caption>
        </table>
     {buildPage()}
    </div>;
}

export default BookSearch;
