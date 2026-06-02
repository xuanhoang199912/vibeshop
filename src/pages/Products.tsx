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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
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

            <div>
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
              {currentCategory && (
                <div className="flex items-center gap-3 mb-1">
                  <Link to="/products" className="text-sm text-gray-400 hover:text-primary-500">Sản Phẩm</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-sm font-medium text-primary-500">{currentCategory.name}</span>
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {searchQuery
                  ? `Kết quả tìm kiếm: "${searchQuery}"`
                  : currentCategory
                  ? currentCategory.name
                  : "Tất Cả Sản Phẩm"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{filtered.length} sản phẩm</p>
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
  );
}
