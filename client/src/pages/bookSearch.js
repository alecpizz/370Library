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
          let userID = getCookie("username");
          if(userID != "" && userID != "null"){
               //TODO see if db has our login
               setLoggedIn(true);
          }

    });

    const [isLoggedIn, setLoggedIn] = useState(false);

    function addToCart(bookID){
          console.log('add to cart' + bookID);
          const userID = getCookie("username");
          console.log(userID);
          if(userID == "")
          {
               return;
          }
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
               <h3>Avalible: {current.availability}</h3>
               {buildButton(current.availability == "available" && isLoggedIn, "Check Out Book", function() {addToCart(current.Copy_id)})}
               <br></br>
               <br></br>
          </div>);
          elements.push(newElement);
     }
     return elements;
   }

   function buildButton(enabled, text, onClick){
     if(!enabled) return null;
     return (<button onClick={onClick}>{text}</button>)
   }

    return <div>
          <div className="text-center">
               <h1>Book Search Page</h1>
               <text>You searched for: {params.bookname}</text>     
     </div>
            
     {buildPage()}
    </div>;
}

export default BookSearch;
