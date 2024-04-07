import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BookSearch = () => {
    useEffect(() => {
        console.log('getting stuff from db here');
    });
    let params = useParams();

    return <div>
        <table cellSpacing="0" border="0" width="100%" height="100%">
            <caption>
                <h1>Book Search Page</h1>
                <text>Your search: {params.bookname}</text>
            </caption>
        </table>
    </div>;
}

export default BookSearch;