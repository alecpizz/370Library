import { useEffect, useState } from "react";

const EmpLogin = () =>
{
     //following a login, redirect the user to their checked out books.

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState(null);

     useEffect(() => {
          let userID = getCookie("emp_username");
          if(userID != "" && userID != "null"){
               //TODO see if db has our login
               window.location.href = (`http://localhost:3000/employee/${userID}`);
          }
     });

     //idk how to make global functions
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


     const handleLogin = async (e) =>
     {
          setError(null);
          e.preventDefault();
          console.log(username);
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ username: username, password: password })
          };
          fetch("http://localhost:5050/empLogin", requestOptions).then((response) => response.json()).then((data) =>
          {
               console.log(data);
               //redirect to the appropriate page to view books! note: this is not secure
               document.cookie = `emp_username=${data.user_id};path=/`;
              window.location.href = (`http://localhost:3000/user/${data.user_id}`)

          }).catch((error) =>
          {
               setError(error.message);
          });
     };

     const handleUserName = (e) =>
     {
          setUsername(e.target.value);
     };
     
     const handlePassword = (e) =>
     {
          setPassword(e.target.value);
     }

     return <div className={"text-center"}>
          
                    <h1>Employee Login Page</h1>
                    <form name="search" onSubmit={handleLogin}>
                         User Name:
                         <input id="username" name="username" onChange={handleUserName} size="20" maxLength="200"></input>
                         <br></br>
                         Password:
                         <input id="password" name="password" onChange={handlePassword} size="20" maxLength="200"></input>
                         <br></br>
                         <input type="submit" value="Login"></input>
                    </form>
                    <text>{error == null ? "" : error}</text>
     </div>;
}

export default EmpLogin;
