
import CardList from "../components/CardList/CardList.js";
import NavBar from "../components/NavBar/Navbar.js";
import { QUERY_CARDS } from "../utils/queries.js";
import { useQuery } from "@apollo/client";
import './categories.css'
import CategoryButton from "../components/categoriesButton/categoriesButton.js";

const Categories = () => {
  const { loading, error, data } = useQuery(QUERY_CARDS);
  const cards = data?.cards || [];


  if (loading) return <p>Loading categories...</p>;
if (error) return <p>Error fetching categories!</p>;

  return (
    <main className="categories-page">
      <NavBar></NavBar>
      <h1>Categories</h1>
      <div className="categories-grid">
        <aside className="sidebar">
          {/* Replace the below list with dynamic category data */}
         <CategoryButton/>
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
