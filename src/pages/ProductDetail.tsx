import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import ProductCard from "../components/ui/ProductCard";

const categoryLabels: Record<string, string> = {
  "thoi-trang": "Thời Trang",
  "dien-tu": "Điện Tử",
  "gia-dung": "Gia Dụng",
  "sac-dep": "Sắc Đẹp",
  "the-thao": "Thể Thao",
  "sach-vpp": "Sách & VPP",
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sản phẩm không tồn tại</h1>
        <Link to="/products" className="btn-primary inline-block mt-4">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/cart");
  };

  const discount = Math.max(
    0,
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  );

  return (
    <div className="bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary-500">Trang chủ</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary-500">Sản phẩm</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="animate-fade-in">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-100 mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-primary-500 text-white rounded px-3 py-1.5 text-sm font-bold">
                Giảm {discount}%
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === i ? "border-primary-500" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="animate-slide-up bg-white border border-gray-100 rounded-lg p-5 md:p-6">
          <p className="text-sm text-primary-500 font-semibold uppercase tracking-wider mb-2">
            {categoryLabels[product.category]}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-gold-500" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-2">({product.reviewCount} đánh giá)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-primary-500">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-lg">
                  Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {product.originalPrice > product.price && (
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <div className="border border-primary-100 bg-primary-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-primary-700">Ưu đãi sản phẩm</p>
                <p className="text-sm text-primary-600 mt-1">Giảm trực tiếp {discount}% so với giá niêm yết</p>
              </div>
              <div className="border border-gold-100 bg-gold-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-gold-700">Ưu đãi giỏ hàng</p>
                <p className="text-sm text-gold-700 mt-1">Đơn từ 500.000₫ giảm thêm 50.000₫</p>
              </div>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-5">
            <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>

          {product.inStock && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button onClick={handleAddToCart} className="btn-primary flex-1 text-lg py-4">
                  {addedToCart ? "✓ Đã thêm vào giỏ" : "Thêm Vào Giỏ Hàng"}
                </button>
                <button onClick={handleBuyNow} className="btn-gold text-lg py-4">
                  Mua Ngay
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {[
                  ["Kiểm tra hàng", "Trước khi thanh toán"],
                  ["Bảo hành rõ ràng", "Theo từng sản phẩm"],
                  ["Hỗ trợ đổi trả", "Trong 7 ngày"],
                ].map(([title, description]) => (
                  <div key={title} className="border border-gray-100 rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="section-title mb-8">Sản Phẩm Liên Quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
    </div>
  );
}
