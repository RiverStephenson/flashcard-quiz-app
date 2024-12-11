
import CardList from "../components/CardList/CardList.js";
import NavBar from "../components/NavBar/Navbar.js";
import { QUERY_CARDS } from "../utils/queries.js";
import { useQuery } from "@apollo/client";

const Categories = () => {
  const { loading, error, data } = useQuery(QUERY_CARDS);
  const cards = data?.cards || [];

  return (
    <main className="categories-page">
     <NavBar></NavBar>

      <section className="cards-section">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading cards.</div>
        ) : (
          <CardList cards={cards} />
        )}
      </section>

      <footer>
        <div className="categories-footer">Categories</div>
      </footer>
    </main>
  );
};

export default Categories;
