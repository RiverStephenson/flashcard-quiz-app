
import CardList from "../components/CardList/CardList.js";
import NavBar from "../components/NavBar/Navbar.js";
import { QUERY_CARDS } from "../utils/queries.js";
import { useQuery } from "@apollo/client";
import './categories.css'

const Categories = () => {
  const { loading, error, data } = useQuery(QUERY_CARDS);
  const cards = data?.cards || [];

  return (
    <main className="categories-page">
      <NavBar></NavBar>
      <div className="categories-grid">
        <aside className="sidebar">
          <h2>Categories</h2>
          {/* Replace the below list with dynamic category data */}
          <ul>
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
          </ul>
        </aside>
        <section className="cards-section">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading cards.</div>
          ) : (
            <CardList cards={cards} />
          )}
        </section>
      </div>
      <footer>
        <div className="categories-footer">Categories</div>
      </footer>
    </main>
  );
};

export default Categories;
