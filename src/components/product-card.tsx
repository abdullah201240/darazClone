'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount?: number; // Made optional
  image: string;
  isFlashSale?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const hasReviews = product.reviewCount && product.reviewCount > 0;
  const roundedRating = Math.round(product.rating * 10) / 10;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Sale Badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          {product.discount}% OFF
        </div>
      )}
      
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={product.isFlashSale}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-red-500">
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1" aria-label={`Rating: ${roundedRating} out of 5`}>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
          {hasReviews ? (
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          ) : (
            <span className="text-xs text-gray-500">
              No reviews
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          className="mt-3 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}