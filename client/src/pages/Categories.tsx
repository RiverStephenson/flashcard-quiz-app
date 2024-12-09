import NavBar from "../components/NavBar";
import CardForm from "../components/CardForm/index.jsx";
import CardList from "../components/CardList/index.jsx";

import { QUERY_CARDS } from "../utils/queries.js";
import { useQuery } from "@apollo/client";


const Categories = () => {
    const { loading, data } = useQuery(QUERY_CARDS);
    const cards = data?.cards || [];
    return (
    <main>
        <div>
            <div>
                <NavBar />
            </div>

            <div>
                <CardForm />
            </div>

            <div>
                {loading ? (
                <div>Loading...</div>
            ) : (
                <CardList
                cards={cards}
                />
            )}
            </div>
            Categories
        </div>
    </main>
    );
};

export default Categories;