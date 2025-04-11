import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  discount?: number;
  rating: number;
  reviewCount?: number;
  isFlashSale?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasReviews = product.reviewCount && product.reviewCount > 0;
  const roundedRating = Math.round(product.rating * 10) / 10;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    const alert = document.createElement('div');
    alert.className = 'fixed bottom-4 right-4 bg-green-500 text-white text-sm px-3 py-2 rounded-md shadow-lg';
    alert.textContent = `${product.name} added to cart`;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
  };

  return (
    <div className="relative block">
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
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
              className="object-cover w-full h-full"
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
            <div className="flex items-center gap-1 mb-3" aria-label={`Rating: ${roundedRating} out of 5`}>
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
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 bg-[#FF6D2E] text-white hover:bg-[#FF6D2E]/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}