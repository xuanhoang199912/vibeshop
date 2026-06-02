import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { searchProducts } from "../../data/products";
import { formatPrice } from "../../utils/format";

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const suggestions = searchQuery
    ? searchProducts(searchQuery).slice(0, 4)
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="hidden sm:block bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between text-xs">
          <span>Freeship từ 500.000₫ · Đổi trả trong 7 ngày</span>
          <div className="flex items-center gap-4 text-gray-300">
            <span>Hotline 1900 1234 56</span>
            <Link to="/products" className="text-gold-300 hover:text-white transition-colors">
              Ưu đãi hôm nay
            </Link>
          </div>
        </div>
      </div>

      <div className="glass border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-between h-16 md:h-20 gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label="VibeShop trang chủ">
            <span className="text-xl sm:text-2xl md:text-3xl font-display text-primary-500">Vibe</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-display text-gold-500">Shop</span>
            <span className="hidden lg:inline-flex text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded px-2 py-1">
              VN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
              Trang Chủ
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
              Sản Phẩm
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
              Ưu Đãi
            </Link>
            <Link to="/products?category=thoi-trang" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
              Thời Trang
            </Link>
            <Link to="/products?category=dien-tu" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
              Điện Tử
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3 ml-2 sm:ml-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:block p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mở tìm kiếm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link to="/cart" className="hidden sm:block relative p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Giỏ hàng">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                  <Link to="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-t-xl">
                    Tài Khoản Của Tôi
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-b-xl">
                    Đăng Xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:inline-flex btn-primary text-sm py-2 px-4">
                Đăng Nhập
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Mở menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 bg-white animate-slide-down">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="input-field pl-10"
                autoFocus
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-lg mt-1 shadow-lg">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        navigate(`/products/${p.slug}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-primary-500 font-semibold">{formatPrice(p.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Trang Chủ</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Sản Phẩm</Link>
            <Link to="/products?category=thoi-trang" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Thời Trang</Link>
            <Link to="/products?category=dien-tu" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Điện Tử</Link>
            <Link to="/products?category=gia-dung" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Gia Dụng</Link>
            {user ? (
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-primary-500 font-medium">Tài Khoản</Link>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-primary-500 font-semibold">Đăng Nhập</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
