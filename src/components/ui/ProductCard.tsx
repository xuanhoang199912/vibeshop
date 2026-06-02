import { Link } from "react-router-dom";
import { Product } from "../../types";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/CartContext";

interface Props {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  "thoi-trang": "Thời Trang",
  "dien-tu": "Điện Tử",
  "gia-dung": "Gia Dụng",
  "sac-dep": "Sắc Đẹp",
  "the-thao": "Thể Thao",
  "sach-vpp": "Sách & VPP",
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const discount = Math.max(0, Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  ));

  return (
    <div className="group card h-full overflow-hidden animate-fade-in flex flex-col">
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            Hết hàng
          </span>
        )}
        {product.featured && product.inStock && (
          <span className="absolute bottom-3 left-3 bg-white/95 text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-sm">
            Bán chạy
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </Link>

      <div className="p-3 md:p-4 flex flex-1 flex-col">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
          {categoryLabels[product.category]}
        </p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="min-h-[2.75rem] font-semibold text-sm md:text-base text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2 text-sm">
          <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="min-h-[3rem]">
            <span className="block text-base md:text-lg font-bold text-primary-500">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-primary-600 transition-colors active:scale-95"
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Thêm giỏ</span>
            </button>
          )}
          {!product.inStock && (
            <Link
              to={`/products/${product.slug}`}
              className="mt-3 w-full flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg px-3 py-2.5 text-sm font-semibold hover:border-primary-200 hover:text-primary-500 transition-colors"
            >
              Xem chi tiết
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
