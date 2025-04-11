'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';

declare module 'react' {
  interface CSSProperties {
    '--zoom-x'?: string;
    '--zoom-y'?: string;
  }
}

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const product = {
    id: params.id,
    title: 'Premium Wireless Headphones',
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Black', 'White', 'Blue'],
    sizes: ['S', 'M', 'L'],
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    specifications: {
      'Brand': 'AudioPro',
      'Model': 'AP-WH100',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Active',
      'Weight': '250g'
    },
    rating: 4.5,
    reviews: 124
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    if (!selectedColor) {
      setValidationError('Please select a color');
      return;
    }
    if (!selectedSize) {
      setValidationError('Please select a size');
      return;
    }
    
    setValidationError('');
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 2000);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.productGrid}>
        {/* Image Gallery */}
        <div>
          <div 
            className={`${styles.imageGallery} ${isZoomed ? 'zoomed' : ''}`}
            onMouseEnter={() => !isMobile && setIsZoomed(true)}
            onMouseLeave={() => !isMobile && setIsZoomed(false)}
            onMouseMove={!isMobile ? handleMouseMove : undefined}
            onClick={isMobile ? () => setIsZoomed(!isZoomed) : undefined}
          >
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentImageIndex === 0}
              style={{
                transform: isZoomed 
                  ? isMobile
                    ? 'scale(1.5)'
                    : `scale(2) translate(-${zoomPosition.x}%, -${zoomPosition.y}%)` 
                  : 'scale(1)',
                transformOrigin: isMobile ? 'center center' : `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
            />
            
            {isZoomed && !isMobile && (
              <div 
                className={styles.zoomOverlay}
                style={{
                  '--zoom-x': `${zoomPosition.x}%`,
                  '--zoom-y': `${zoomPosition.y}%`
                }}
              />
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className={styles.thumbnailGrid}>
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${styles.thumbnailButton} ${currentImageIndex === index ? styles.active : ''}`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className={styles.productTitle}>{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          
          <div className={styles.priceContainer}>
            <div className="flex items-center gap-2">
              <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>${product.originalPrice?.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className={styles.discountBadge}>
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <span className={styles.optionTitle}>Color</span>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <span className={styles.optionTitle}>Size</span>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <span className={styles.optionTitle}>Quantity</span>
            <div className={styles.quantitySelector}>
              <button 
                onClick={decrementQuantity}
                className={styles.quantityButton}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className={styles.quantityButton}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-6">
            {validationError && (
              <div className="text-red-500 mb-2">{validationError}</div>
            )}
            <button 
              className={`${styles.addToCart} ${!selectedColor || !selectedSize ? styles.disabled : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
            >
              {!selectedColor || !selectedSize 
                ? 'Select Color & Size First' 
                : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
            </button>
          </div>
          
          {/* Specifications */}
          <div className={styles.specifications}>
            <h3 className="text-lg font-medium mb-4">Specifications</h3>
            <div className={styles.specsGrid}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className={styles.specItem}>
                  <span className={styles.specLabel}>{key}:</span> <span className={styles.specValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCartAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md animate-bounce z-50">
          Added to Cart!
        </div>
      )}
    </div>
  );
}