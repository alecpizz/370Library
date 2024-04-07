const Login = () => {
    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>Login Page</h1>
                <form name="search" action="LOGIN HERE">
                    User Name:
                    <input id="username" name="username" size="20" maxLength="200"></input>
                    <br></br>
                    Password:
                    <input id="password" name="password" size="20" maxLength="200"></input>
                    <br></br>
                    <input type="submit" value="Login"></input>
                </form>
            </caption>
        </table>
    </div>;
}

export default Login;