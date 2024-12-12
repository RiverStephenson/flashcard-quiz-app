import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_UNIQUE_CATEGORY } from '../../utils/queries';

const CategoryButton = () => {
    const { data, loading, error } = useQuery(QUERY_UNIQUE_CATEGORY);
    const navigate = useNavigate();

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error fetching categories!</p>;

    // Check if data and uniqueCategories exist
    if (!data || !data.uniqueCategories) return <p>No categories found</p>;

    return (
        <div>
            <h1>Select a Category</h1>
            <div>
                {data.uniqueCategories.map((category: string) => (
                    <button
                        key={category}
                        onClick={() => navigate(`/quiz/${category}`)}
                        style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryButton;
