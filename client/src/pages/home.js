import { useNavigate } from 'react-router-dom';
const Home = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `login`;
        navigate(path);
    }
    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>The Dewey Decimator Library System</h1>
                <form name="search" action="SERVER SEARCH HERE">
                    <input id="searchform" name="req" size="60" maxLength="200"></input>
                    <input type="submit" value="Book Search"></input>
                </form>
                <button onClick={routeChange}>User Login Page</button>
            </caption>
        </table>
    </div>;
}

export default Home;