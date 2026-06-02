import { Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ui/ProductCard";
import { formatPrice } from "../utils/format";

const discountOf = (price: number, originalPrice: number) =>
  Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

export default function Home() {
  const availableProducts = products.filter((product) => product.inStock);
  const heroProduct = products.find((product) => product.id === "p1") || availableProducts[0];
  const miniDeals = availableProducts.filter((product) => product.id === "p4" || product.id === "p8");
  const bestDeals = [...availableProducts]
    .sort((a, b) => discountOf(b.price, b.originalPrice) - discountOf(a.price, a.originalPrice))
    .slice(0, 6);
  const topRated = [...availableProducts]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);
  const newArrivals = [...availableProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center">
            <div className="min-w-0 w-full max-w-[22rem] sm:max-w-none animate-slide-up">
              <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 text-sm font-semibold px-3 py-1.5 rounded">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Sale chọn lọc trong ngày
              </span>
              <h1 className="mt-5 max-w-[22rem] sm:max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-950">
                <span className="block lg:inline">Olive Young picks</span>
                <span className="block lg:inline"> cho routine K beauty</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-[22rem] sm:max-w-2xl">
                Tuyển chọn các sản phẩm đang nổi bật trên Olive Young Global: kem chống nắng, serum, mặt nạ, trang điểm và chăm sóc tóc.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-[22rem] sm:max-w-full">
                <Link to="/products" className="btn-primary text-center w-full sm:w-auto">
                  Mua sắm ngay
                </Link>
                <Link to="/products?category=chong-nang" className="btn-outline text-center w-full sm:w-auto">
                  Xem chống nắng
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 w-full max-w-[22rem] sm:max-w-xl">
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <span className="block text-2xl font-bold text-gray-950">15</span>
                  <span className="text-sm text-gray-500">Olive picks</span>
                </div>
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <span className="block text-2xl font-bold text-gray-950">6</span>
                  <span className="text-sm text-gray-500">Nhóm K beauty</span>
                </div>
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <span className="block text-2xl font-bold text-gray-950">4.7/5</span>
                  <span className="text-sm text-gray-500">Điểm trung bình</span>
                </div>
              </div>
            </div>

            <div className="min-w-0 w-full max-w-[22rem] sm:max-w-none animate-fade-in">
              <Link
                to={`/products/${heroProduct.slug}`}
                className="group block relative w-full overflow-hidden rounded-lg bg-gray-950 min-h-[420px]"
              >
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-transparent" />
                <div className="absolute top-5 left-5 bg-white text-primary-600 rounded px-3 py-1.5 text-sm font-bold">
                  -{discountOf(heroProduct.price, heroProduct.originalPrice)}%
                </div>
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <p className="text-sm text-white/75 uppercase tracking-widest">Deal nổi bật</p>
                  <h2 className="mt-2 text-xl md:text-3xl font-bold line-clamp-2">{heroProduct.name}</h2>
                  <div className="flex flex-wrap items-end gap-3 mt-4">
                    <span className="text-2xl md:text-3xl font-bold text-gold-300">{formatPrice(heroProduct.price)}</span>
                    <span className="text-white/60 line-through">{formatPrice(heroProduct.originalPrice)}</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 bg-white text-gray-950 rounded-lg px-4 py-3 font-semibold">
                    Xem sản phẩm
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {miniDeals.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="group min-w-0 bg-white border border-gray-100 rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded object-cover bg-gray-100" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-primary-500">Gợi ý nhanh</p>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-gray-950 mt-1">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Freeship từ 500.000₫", "Áp dụng toàn quốc"],
              ["Đổi trả 7 ngày", "Kiểm tra hàng khi nhận"],
              ["Thanh toán linh hoạt", "COD, ngân hàng, MoMo"],
              ["Tư vấn routine", "Chọn sản phẩm theo nhu cầu da"],
            ].map(([title, description]) => (
              <div key={title} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gold-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-white/60">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Danh mục</span>
              <h2 className="section-title mt-2">Lối tắt đến đúng nhu cầu</h2>
            </div>
            <Link to="/products" className="btn-outline w-fit">
              Xem toàn bộ
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/5] bg-gray-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/25 to-transparent" />
                <div className="absolute left-3 right-3 bottom-3">
                  <h3 className="text-white font-semibold">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{cat.productCount} sản phẩm</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Giá tốt</span>
              <h2 className="section-title mt-2">Ưu đãi đáng mua hôm nay</h2>
              <p className="text-gray-500 mt-2">Sản phẩm Olive Young-style còn hàng, giảm rõ ràng, dễ chốt đơn.</p>
            </div>
            <Link to="/products" className="btn-primary w-fit">
              Vào cửa hàng
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {bestDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-10">
            <div className="bg-gray-950 rounded-lg p-6 md:p-8 text-white">
              <span className="text-gold-300 font-semibold text-sm tracking-widest uppercase">Bán chạy</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-3">Khách đang đánh giá cao</h2>
              <p className="text-white/70 mt-3">
                Những món K beauty có điểm sao nổi bật và nhiều lượt đánh giá trong catalog hiện tại.
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-white text-gray-950 rounded-lg px-5 py-3 font-semibold hover:bg-gold-100 transition-colors">
                Khám phá thêm
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {topRated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-primary-500 font-semibold text-sm tracking-widest uppercase">Mới về</span>
            <h2 className="section-title mt-2">Hàng mới vừa lên kệ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Đơn từ 500.000₫ được giảm 50.000₫</h2>
            <p className="text-white/80 mt-2">Ưu đãi tự áp dụng trong giỏ hàng, không cần nhập mã.</p>
          </div>
          <Link to="/products" className="bg-white text-primary-600 rounded-lg px-6 py-3 font-semibold hover:bg-gold-100 transition-colors text-center">
            Chọn sản phẩm
          </Link>
        </div>
      </section>
    </div>
  );
}
