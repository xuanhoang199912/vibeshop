import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice, formatDate } from "../utils/format";
import { Order } from "../types";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { items } = useCart();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", address: user?.address || "" });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h1>
        <Link to="/login" className="btn-primary">Đăng Nhập</Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sampleOrders: Order[] = [
    {
      id: "ORD20241015",
      items: items.slice(0, 2),
      total: items.length > 0 ? items.slice(0, 2).reduce((s, i) => s + i.product.price * i.quantity, 0) : 450000,
      status: "delivered",
      createdAt: "2024-10-15",
      shippingAddress: user.address || "123 Nguyễn Huệ, Q.1, TP.HCM",
      paymentMethod: "COD",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Tài Khoản Của Tôi</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-500">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="font-bold text-lg text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">Thông Tin Cá Nhân</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="text-sm text-primary-500 font-semibold hover:underline"
              >
                {editing ? "Hủy" : "Chỉnh sửa"}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input type="text" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <textarea value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} className="input-field" rows={3} />
                </div>
                <button type="submit" className="btn-primary">
                  {saved ? "✓ Đã lưu" : "Lưu thay đổi"}
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Số điện thoại</span>
                  <span className="font-medium">{user.phone || "Chưa cập nhật"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Địa chỉ</span>
                  <span className="font-medium text-right max-w-[200px]">{user.address || "Chưa cập nhật"}</span>
                </div>
              </div>
            )}
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Đơn Hàng Gần Đây</h2>
            {sampleOrders.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">Chưa có đơn hàng nào.</p>
            ) : (
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-semibold text-sm text-gray-900">Mã: {order.id}</span>
                        <span className="ml-4 text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        order.status === "delivered" ? "bg-green-50 text-green-600" :
                        order.status === "shipped" ? "bg-blue-50 text-blue-600" :
                        "bg-gold-50 text-gold-600"
                      }`}>
                        {order.status === "delivered" ? "Đã giao" : order.status === "shipped" ? "Đang giao" : "Chờ xử lý"}
                      </span>
                    </div>
                    {order.items.length > 0 && (
                      <div className="flex items-center gap-3 mb-3">
                        {order.items.slice(0, 3).map((item) => (
                          <img key={item.product.id} src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{order.items.length} sản phẩm</span>
                      <span className="font-bold text-primary-500">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
