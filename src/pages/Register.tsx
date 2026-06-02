import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    const success = await register(form.name, form.email, form.phone, form.password);
    if (success) {
      navigate("/");
    } else {
      setError("Email này đã được đăng ký");
    }
  };

  const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl font-display text-primary-500">Vibe</span>
            <span className="text-3xl font-display text-gold-500">Shop</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Đăng Ký</h1>
          <p className="text-gray-500 mt-2">Tạo tài khoản để mua sắm dễ dàng hơn</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input type="text" value={form.name} onChange={updateField("name")} className="input-field" placeholder="Nguyễn Văn A" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={updateField("email")} className="input-field" placeholder="your@email.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input type="tel" value={form.phone} onChange={updateField("phone")} className="input-field" placeholder="0912 345 678" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input type="password" value={form.password} onChange={updateField("password")} className="input-field" placeholder="••••••••" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input type="password" value={form.confirmPassword} onChange={updateField("confirmPassword")} className="input-field" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-primary w-full py-3 mt-2">
            Đăng Ký
          </button>

          <p className="text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary-500 font-semibold hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
