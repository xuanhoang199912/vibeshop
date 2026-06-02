import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice, generateId } from "../utils/format";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState(false);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập để thanh toán</h1>
        <Link to="/login" className="btn-primary">Đăng Nhập</Link>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
        <Link to="/products" className="btn-primary">Mua Sắm Ngay</Link>
      </div>
    );
  }

  const total = subtotal >= 500000 ? subtotal - 50000 : subtotal;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    const orderId = generateId().toUpperCase();
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt Hàng Thành Công!</h1>
        <p className="text-gray-500 mb-2">Mã đơn hàng: <span className="font-bold text-primary-500">{orderId}</span></p>
        <p className="text-gray-400 text-sm mb-8">Chúng tôi sẽ gọi xác nhận đơn hàng trong ít phút nữa.</p>
        <Link to="/products" className="btn-primary">Tiếp Tục Mua Sắm</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Thanh Toán</h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Thông Tin Giao Hàng</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input type="text" value={user.name} className="input-field bg-gray-50" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={user.email} className="input-field bg-gray-50" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="0912 345 678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (không bắt buộc)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input-field"
                  rows={2}
                  placeholder="Ghi chú cho người giao hàng..."
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Phương Thức Thanh Toán</h2>
            <div className="space-y-3">
              {[
                { value: "cod", label: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt khi nhận được hàng" },
                { value: "bank", label: "Chuyển khoản ngân hàng", desc: "Chuyển khoản qua tài khoản ngân hàng" },
                { value: "momo", label: "Ví MoMo", desc: "Thanh toán qua ví điện tử MoMo" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === method.value ? "border-primary-500 bg-primary-50" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 text-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-500">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24 space-y-4">
            <h2 className="font-bold text-lg text-gray-900">Đơn Hàng</h2>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 py-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-gray-400 mt-1">SL: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              {subtotal >= 500000 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá đơn đầu</span>
                  <span>-{formatPrice(50000)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Tổng</span>
                <span className="text-primary-500">{formatPrice(total)}</span>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Đặt Hàng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
