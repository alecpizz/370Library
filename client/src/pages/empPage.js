import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useHref, useParams } from "react-router-dom";

const EmployeePage = () =>
{
     let params = useParams();
     //get the db entry from the user name, don't worry about security right now
     // ex: username/id was Alec, so make a query of all of alec's loaned books.
     const [employeeInfo, setEmployeeInfo] = useState('');
     useEffect(() =>
     {
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ userID: params.userid })
          };
          fetch("http://localhost:5050/empData", requestOptions).then((response) => response.json()).then((data) =>
          {
               setEmployeeInfo(data);
          }).catch((error) =>
          {

          });
     });

     const [bookInputs, setBookInputs] = useState({});

     const handleChangeEvent = (event) =>
     {
          const name = event.target.name;
          const value = event.target.value;
          setBookInputs(values => ({ ...values, [name]: value }));
     }

     const handleSubmit = (event) =>
     {
          event.preventDefault();
          //do something with our inputs
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(bookInputs)
          };
          fetch("http://localhost:5050/addBook", requestOptions).then((response) => response.json()).then((data) =>
          {
               
          }).catch((error) =>
          {

          });
     }

     function deleteAllCookies()
     {
          document.cookie = `emp_username=null;path=/`;
          window.location.href = (`http://localhost:3000/`);
     }

     //book title, isbn, dewey decimal, avaliablitiy, genre, copy_id, author name, publisher name
     return <div>
          <div className="text-center">
               <h1>Employee Page</h1>
               <body>Employee ID: {employeeInfo.emp_id}</body>
               <body>Employee Name: {employeeInfo.emp_name}</body>
               <body>Position: {employeeInfo.position}</body>
               <button onClick={() => deleteAllCookies()}>Log Out</button>
          </div>
          <Container></Container>
          <div className="text-left">
               <h1>Book Submission Form</h1>
               <form onSubmit={handleSubmit}>
                    <div>
                         <label>Book Title:</label>
                         <input type="text"
                              name="title"
                              value={bookInputs.title}
                              onChange={handleChangeEvent}
                              placeholder="Book Title..."></input>
                    </div>
                    <div>

                         <label>Book ISBN #:</label>
                         <input type="text"
                              name="isbn"
                              value={bookInputs.isbn}
                              onChange={handleChangeEvent}
                              placeholder="ISBN Here..."></input>
                    </div>
                    <div>

                         <label>Book Dewey Decimal #:
                         </label>
                         <input type="text"
                              name="deweyDecimalNumber"
                              value={bookInputs.deweyDecimalNumber}
                              onChange={handleChangeEvent}
                              placeholder="Dewey Decimal Here..."></input>
                    </div>
                    <div>
                         <label>Genre:
                         </label>
                         <input type="text"
                              name="genre"
                              value={bookInputs.genre}
                              onChange={handleChangeEvent}
                              placeholder="Book Genre..."></input>
                    </div>
                    <div>
                         <label>Copy #:
                         </label>
                         <input type="text"
                              name="copyID"
                              value={bookInputs.copyID}
                              onChange={handleChangeEvent}
                              placeholder="Copy Number..."></input>
                    </div>
                    <div>
                         <label>Author Name:
                         </label>
                         <input type="text"
                              name="authorName"
                              value={bookInputs.authorName}
                              onChange={handleChangeEvent}
                              placeholder="Author Name..."></input>
                    </div>
                    <div>
                         <label>Publisher Name:
                         </label>
                         <input type="text"
                              name="publisherName"
                              value={bookInputs.publisherName}
                              onChange={handleChangeEvent}
                              placeholder="Publisher Name..."></input>
                    </div>
                    <input type="submit" value = "Submit Book!"
                    placeholder="Book Title..."></input>
               </form>
          </div>
     </div>;
}

export default EmployeePage;
