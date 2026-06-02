import { Link } from "react-router-dom";
import { products, getFeaturedProducts } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ui/ProductCard";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500 rounded-full blur-[120px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🎉 Giảm đến 50% cho đơn đầu tiên
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Mua Sắm{" "}
              <span className="text-gold-400">Thông Minh</span>
              <br />
              Sống{" "}
              <span className="text-gold-400">Chất Lượng</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Khám phá hàng ngàn sản phẩm chất lượng cao với giá tốt nhất tại Việt Nam. Miễn phí giao hàng cho đơn từ 500.000₫.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-gold text-lg px-8 py-4 shadow-lg shadow-gold-500/25">
                Mua Ngay
              </Link>
              <Link to="/products?category=thoi-trang" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                Khám Phá
              </Link>
            </div>
            <div className="flex gap-8 mt-12">
              <div>
                <span className="text-3xl font-bold text-gold-400">50K+</span>
                <p className="text-sm text-gray-400 mt-1">Sản phẩm</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gold-400">10K+</span>
                <p className="text-sm text-gray-400 mt-1">Khách hàng</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gold-400">99%</span>
                <p className="text-sm text-gray-400 mt-1">Hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Danh Mục</span>
            <h2 className="section-title mt-2">Mua Sắm Theo Danh Mục</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Khám phá các danh mục sản phẩm đa dạng của chúng tôi</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base">{cat.name}</h3>
                  <p className="text-gray-300 text-xs mt-1">{cat.productCount} sản phẩm</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="animate-slide-up">
              <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Nổi Bật</span>
              <h2 className="section-title mt-2">Sản Phẩm Nổi Bật</h2>
              <p className="text-gray-500 mt-3">Những sản phẩm được yêu thích nhất</p>
            </div>
            <Link to="/products" className="btn-outline mt-4 md:mt-0">
              Xem Tất Cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 animate-fade-in">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Miễn Phí Vận Chuyển</h3>
              <p className="text-white/80 text-sm">Cho đơn hàng từ 500.000₫ trong phạm vi toàn quốc</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Bảo Hành Chính Hãng</h3>
              <p className="text-white/80 text-sm">Cam kết sản phẩm chính hãng 100%, bảo hành 12 tháng</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Thanh Toán An Toàn</h3>
              <p className="text-white/80 text-sm">Hỗ trợ nhiều phương thức thanh toán bảo mật</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Sản Phẩm Mới</span>
            <h2 className="section-title mt-2">Hàng Mới Về</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.slice(6, 14).map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
