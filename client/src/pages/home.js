import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `login`;
        navigate(path);
    }

    const searchRoute = (searchPhrase) => {
     if(searchPhrase == "") return;
     navigate(`search/${searchPhrase}`);
    }

    const [bookSearch, setBookSearch] = useState('');

    const handleSearch = async (e) =>
    {
          e.preventDefault();
          searchRoute(bookSearch);
    }

    const handleBook = (e) =>
    {
          setBookSearch(e.target.value);
    }
    
    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>The Dewey Decimator Library System</h1>
                <form name="search" onSubmit={handleSearch}>
                    <input id="searchform" name="req" size="60" maxLength="200" onChange={handleBook}></input>
                    <input type="submit" value="Book Search"></input>
                </form>
                <button onClick={routeChange}>User Login Page</button>
            </caption>
        </table>
    </div>;
}

export default Home;
