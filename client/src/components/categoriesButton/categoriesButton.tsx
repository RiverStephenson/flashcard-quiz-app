import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_UNIQUE_CATEGORY } from '../../utils/queries';
import './categoriesButton.css';

const CategoryButton = () => {
    const { data, loading, error } = useQuery(QUERY_UNIQUE_CATEGORY);
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        // Save the selected category to localStorage
        localStorage.setItem('lastSelectedCategory', category);
        navigate(`/quiz/${category}`);
    };

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error fetching categories!</p>;

    // Check if data and uniqueCategories exist
    if (!data || !data.uniqueCategories) return <p>No categories found</p>;

    return (
        <div className="category-container">
            <h1 className="category-title">Select a Category:</h1>
            <div className="category-grid">
                {data.uniqueCategories.map((category: string) => (
                    <div key={category} className="category-card">
                        <h3 className="category-name">
                            <p className='category'>Category:</p>
                            {category}
                        </h3>
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className="quiz-button"
                        >
                            Take Quiz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryButton;