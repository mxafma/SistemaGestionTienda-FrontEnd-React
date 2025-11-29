import type { ProductoDTO } from './productosApi';
import type { ProductType } from '../types/types';
import productosData from '../../data/products.json';

// Local products.json used only as a fallback for images/descriptions
const localProducts: Partial<ProductType>[] = productosData as Partial<ProductType>[];
const localById = new Map<number, Partial<ProductType>>(localProducts.map((p) => [p.id as number, p]));

export function mapProductoToProduct(dto: ProductoDTO): ProductType {
  const local = localById.get(dto.id);

  return {
    id: dto.id,
    name: dto.nombre ?? local?.name ?? '',
    price: typeof dto.precioVenta === 'number' ? dto.precioVenta : (local?.price ?? 0),
    description: dto.descripcion ?? local?.description ?? '',
    image: (local?.image as string) ?? '/img/default-product.jpg',
    images: (local?.images as string[] ) ?? undefined,
    active: typeof dto.activo === 'boolean' ? dto.activo : true,
  };
}

export function mapProductosToProducts(dtos: ProductoDTO[]): ProductType[] {
  return dtos.map(mapProductoToProduct);
}

export default mapProductoToProduct;
