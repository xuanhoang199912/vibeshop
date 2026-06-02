import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ui/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy, priceRange]);

  const currentCategory = categories.find((c) => c.slug === categoryFilter);
  const pageTitle = searchQuery
    ? `Kết quả tìm kiếm: "${searchQuery}"`
    : currentCategory
    ? currentCategory.name
    : "Tất Cả Sản Phẩm";
  const pageDescription = searchQuery
    ? "Các sản phẩm phù hợp với từ khóa bạn đang tìm."
    : currentCategory
    ? `Bộ sưu tập ${currentCategory.name.toLowerCase()} đang có ưu đãi và còn hàng.`
    : "Khám phá toàn bộ catalog VibeShop với nhiều mức giá và danh mục.";
  const heroImage = currentCategory?.image || categories[1].image;

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-6 items-center">
            <div>
              {currentCategory && (
                <div className="flex items-center gap-3 mb-2">
                  <Link to="/products" className="text-sm text-gray-400 hover:text-primary-500">Sản Phẩm</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-sm font-medium text-primary-500">{currentCategory.name}</span>
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-950">{pageTitle}</h1>
              <p className="text-gray-600 mt-3 max-w-2xl">{pageDescription}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="bg-primary-50 text-primary-600 rounded px-3 py-1.5 text-sm font-semibold">
                  {filtered.length} sản phẩm
                </span>
                <span className="bg-gray-100 text-gray-700 rounded px-3 py-1.5 text-sm font-semibold">
                  Freeship từ 500.000₫
                </span>
                <span className="bg-emerald-50 text-emerald-700 rounded px-3 py-1.5 text-sm font-semibold">
                  Đổi trả 7 ngày
                </span>
              </div>
            </div>
            <div className="hidden md:block rounded-lg overflow-hidden aspect-[16/9] bg-gray-100">
              <img src={heroImage} alt={pageTitle} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-32 space-y-4">
            <div className="bg-white border border-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Danh Mục</h3>
              <div className="space-y-2">
                <Link
                  to="/products"
                  className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                    !categoryFilter ? "bg-primary-50 text-primary-500 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Tất Cả
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                      categoryFilter === cat.slug ? "bg-primary-50 text-primary-500 font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                    <span className="text-gray-400 ml-1">({cat.productCount})</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Khoảng Giá</h3>
              <div className="space-y-2">
                {[
                  { label: "Tất cả", value: [0, 100000000] as [number, number] },
                  { label: "Dưới 200.000₫", value: [0, 200000] as [number, number] },
                  { label: "200.000₫ - 500.000₫", value: [200000, 500000] as [number, number] },
                  { label: "500.000₫ - 2.000.000₫", value: [500000, 2000000] as [number, number] },
                  { label: "2.000.000₫ - 5.000.000₫", value: [2000000, 5000000] as [number, number] },
                  { label: "Trên 5.000.000₫", value: [5000000, 100000000] as [number, number] },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(range.value)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                        ? "bg-primary-50 text-primary-500 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sản phẩm phù hợp</h2>
              <p className="text-sm text-gray-500 mt-1">Sắp xếp theo giá, đánh giá hoặc hàng mới.</p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto text-sm"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-400 mt-1">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
