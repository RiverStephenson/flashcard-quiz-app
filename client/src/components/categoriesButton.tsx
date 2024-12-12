import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_UNIQUE_CATEGORY } from '../utils/queries';

interface CategoriesButtonProps {
  onCategorySelect: (category: string) => void;
}

const CategoriesButton: React.FC<CategoriesButtonProps> = ({ onCategorySelect }) => {
  const { loading, error, data } = useQuery(QUERY_UNIQUE_CATEGORY);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories!</div>;

  // The query returns an array of unique categories
  const categories = data?.uniqueCategories || [];

  return (
    <div className="categories-container">
      {categories.map((category: string) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className="category-button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoriesButton;
