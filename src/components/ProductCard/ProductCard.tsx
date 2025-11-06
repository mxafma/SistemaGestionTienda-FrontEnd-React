import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import type { Product } from '../../shared/types/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
      <ProductImage src={product.image} alt={product.name} />
      <div className="card-body">
        <ProductTitle title={product.name} id={product.id} />
        <p className="card-text">{product.description}</p>
        <p className="card-text fw-bold">${product.price}</p>
        <a href="#" className="btn btn-primary">Agregar al carrito</a>
      </div>
    </div>
  );
};

export default ProductCard;