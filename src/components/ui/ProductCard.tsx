import { Link } from "react-router-dom";
import { Product } from "../../types";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group card overflow-hidden animate-fade-in">
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg">
            Hết hàng
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </Link>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {product.category === "thoi-trang" && "Thời Trang"}
          {product.category === "dien-tu" && "Điện Tử"}
          {product.category === "gia-dung" && "Gia Dụng"}
          {product.category === "sac-dep" && "Sắc Đẹp"}
          {product.category === "the-thao" && "Thể Thao"}
          {product.category === "sach-vpp" && "Sách & VPP"}
        </p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary-500">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="p-2.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
