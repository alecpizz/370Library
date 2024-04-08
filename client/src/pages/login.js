import { useState } from "react";

const Login = () =>
{
     //following a login, redirect the user to their checked out books.

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState(null);



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
          fetch("http://localhost:5050/login", requestOptions).then((response) => response.json()).then((data) =>
          {
               console.log(data);
               //redirect to the appropriate page to view books! note: this is not secure
               window.location.href = (`http://localhost:3000/user/${data.userID}`)

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

     return <div>
          <table cellSpacing="0" border="0" width="100%" height="100%">
               <caption>
                    <h1>Login Page</h1>
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
               </caption>
          </table>
     </div>;
}

export default Login;
