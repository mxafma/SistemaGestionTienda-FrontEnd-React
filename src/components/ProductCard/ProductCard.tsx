import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import ProductButton from './ProductButton';
import type { Product } from '../../shared/types/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="card h-100 shadow-sm">
      <ProductImage src={product.image} alt={product.name} />
      <div className="card-body d-flex flex-column">
        <ProductTitle title={product.name} id={product.id} />
        <ProductPrice price={product.price} />
        <ProductButton 
          productId={product.id} 
          product={product}
          onAddToCart={onAddToCart} 
        />
      </div>
    </div>
  );
};

export default ProductCard;