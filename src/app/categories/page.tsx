'use client';

import Link from 'next/link';

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  // More categories...
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="bg-white rounded-lg p-4 text-center border border-gray-100"
          >
            <h2 className="font-medium capitalize text-gray-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}