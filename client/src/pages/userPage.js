import { useParams } from "react-router-dom";

const UserPage = () => {
    let params = useParams();
    //get the db entry from the user name, don't worry about security right now
    // ex: username/id was Alec, so make a query of all of alec's loaned books.
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
