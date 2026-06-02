import { Product } from "../types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Áo Sơ Mi Trắng Cao Cấp",
    slug: "ao-so-mi-trang-cao-cap",
    description: "Áo sơ mi trắng chất liệu cotton cao cấp, thoáng mát, thấm hút mồ hôi tốt. Thiết kế ôm nhẹ, tôn dáng người mặc. Phù hợp cho cả môi trường công sở và dạo phố.",
    price: 450000,
    originalPrice: 650000,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    ],
    category: "thoi-trang",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    featured: true,
    createdAt: "2024-10-01",
  },
  {
    id: "p2",
    name: "Điện Thoại Thông Minh XYZ Pro",
    slug: "dien-thoai-thong-minh-xyz-pro",
    description: "Điện thoại thông minh thế hệ mới với camera 108MP, pin 5000mAh, sạc nhanh 65W. Màn hình AMOLED 6.7 inch 120Hz. Chip xử lý mạnh mẽ nhất thị trường.",
    price: 15990000,
    originalPrice: 18990000,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600",
    ],
    category: "dien-tu",
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    featured: true,
    createdAt: "2024-09-15",
  },
  {
    id: "p3",
    name: "Máy Lọc Không Khí SmartAir 3000",
    slug: "may-loc-khong-khi-smartair-3000",
    description: "Máy lọc không khí thông minh với công nghệ HEPA 13, loại bỏ 99.97% bụi mịn PM2.5. Kết nối WiFi, điều khiển qua app. Diện tích phù hợp 30-50m².",
    price: 5490000,
    originalPrice: 6990000,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
    ],
    category: "gia-dung",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true,
    createdAt: "2024-10-10",
  },
  {
    id: "p4",
    name: "Son Kem Lì Velvet Mịn",
    slug: "son-kem-li-velvet-min",
    description: "Son kem lì với chất son mịn như nhung, lên màu chuẩn, bền màu suốt 12 giờ. Dưỡng ẩm từ dầu jojoba và vitamin E, không làm khô môi.",
    price: 189000,
    originalPrice: 259000,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600",
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600",
    ],
    category: "sac-dep",
    rating: 4.4,
    reviewCount: 312,
    inStock: true,
    featured: true,
    createdAt: "2024-10-05",
  },
  {
    id: "p5",
    name: "Giày Chạy Bộ UltraBoost 5.0",
    slug: "giay-chay-bo-ultraboost-5.0",
    description: "Giày chạy bộ công nghệ UltraBoost mới nhất. Đệm Boost toàn bộ đế, tạo cảm giác êm ái khi chạy. Phần upper dệt kim Primeknit thoáng khí.",
    price: 3290000,
    originalPrice: 4290000,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
    ],
    category: "the-thao",
    rating: 4.7,
    reviewCount: 167,
    inStock: true,
    featured: true,
    createdAt: "2024-09-20",
  },
  {
    id: "p6",
    name: "Sách 'Đắc Nhân Tâm' Bản Đặc Biệt",
    slug: "sach-dac-nhan-tam-ban-dac-biet",
    description: "Cuốn sách self-help nổi tiếng nhất mọi thời đại của Dale Carnegie. Bản đặc biệt với bìa cứng, giấy chất lượng cao, kèm bookmark đồng.",
    price: 99000,
    originalPrice: 150000,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
    ],
    category: "sach-vpp",
    rating: 4.9,
    reviewCount: 1024,
    inStock: true,
    featured: true,
    createdAt: "2024-08-01",
  },
  {
    id: "p7",
    name: "Váy Đầm Xuân Hè Hoa Nhí",
    slug: "vay-dam-xuan-he-hoa-nhi",
    description: "Váy đầm hoa nhí chất vải linen mát nhẹ. Thiết kế chữ A tôn dáng, phù hợp cho những ngày hè năng động. Có túi hai bên tiện lợi.",
    price: 390000,
    originalPrice: 520000,
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
    ],
    category: "thoi-trang",
    rating: 4.3,
    reviewCount: 76,
    inStock: true,
    featured: false,
    createdAt: "2024-10-12",
  },
  {
    id: "p8",
    name: "Tai Nghe Bluetooth ProSound",
    slug: "tai-nghe-bluetooth-prosound",
    description: "Tai nghe không dây chống ồn chủ động ANC 40dB. Âm thanh Hi-Res, pin 40 giờ. Gập gọn, kèm hộp sạc không dây.",
    price: 2490000,
    originalPrice: 3490000,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
    ],
    category: "dien-tu",
    rating: 4.5,
    reviewCount: 198,
    inStock: true,
    featured: false,
    createdAt: "2024-09-28",
  },
  {
    id: "p9",
    name: "Nồi Chiên Không Dầu 5.5L",
    slug: "noi-chien-khong-dau-5.5l",
    description: "Nồi chiên không dầu dung tích 5.5 lít, công suất 1500W. Công nghệ Rapid Air rán vàng giòn mà không cần dầu. Kèm 6 chế độ nấu tự động.",
    price: 1590000,
    originalPrice: 2190000,
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    ],
    category: "gia-dung",
    rating: 4.4,
    reviewCount: 534,
    inStock: true,
    featured: false,
    createdAt: "2024-10-08",
  },
  {
    id: "p10",
    name: "Set Dưỡng Da 3 Bước Cơ Bản",
    slug: "set-duong-da-3-buoc-co-ban",
    description: "Set dưỡng da gồm: sữa rửa mặt, toner, kem dưỡng ẩm. Chiết xuất trà xanh và rau má, dịu nhẹ cho mọi loại da, kể cả da nhạy cảm.",
    price: 590000,
    originalPrice: 890000,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600",
    ],
    category: "sac-dep",
    rating: 4.6,
    reviewCount: 445,
    inStock: true,
    featured: false,
    createdAt: "2024-10-03",
  },
  {
    id: "p11",
    name: "Balo Laptop Chống Sốc 15.6\"",
    slug: "balo-laptop-chong-soc-15.6",
    description: "Balo chống sốc cao cấp cho laptop đến 15.6 inch. Chất liệu vải dù chống thấm nước. Nhiều ngăn tiện lợi, có cổng sạc USB ngoài.",
    price: 450000,
    originalPrice: 650000,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600",
    ],
    category: "the-thao",
    rating: 4.3,
    reviewCount: 134,
    inStock: true,
    featured: false,
    createdAt: "2024-09-25",
  },
  {
    id: "p12",
    name: "Bút Máy Cao Cấp Mực Xanh",
    slug: "but-may-cao-cap-muc-xanh",
    description: "Bút máy cao cấp với ngòi vàng 18K, thân bút làm từ nhựa resin Ý. Bộ sản phẩm gồm bút, lọ mực xanh và hộp đựng sang trọng.",
    price: 890000,
    originalPrice: 1290000,
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    ],
    category: "sach-vpp",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    featured: false,
    createdAt: "2024-10-15",
  },
  {
    id: "p13",
    name: "Đồng Hồ Thông Minh Watch Ultra",
    slug: "dong-ho-thong-minh-watch-ultra",
    description: "Đồng hồ thông minh cao cấp với màn hình OLED luôn sáng. Theo dõi sức khỏe toàn diện: nhịp tim, SPO2, giấc ngủ, stress. Chống nước 10ATM.",
    price: 8990000,
    originalPrice: 11990000,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600",
    ],
    category: "dien-tu",
    rating: 4.6,
    reviewCount: 223,
    inStock: true,
    featured: false,
    createdAt: "2024-10-20",
  },
  {
    id: "p14",
    name: "Áo Khoác Bomber Da Lộn",
    slug: "ao-khoac-bomber-da-lon",
    description: "Áo khoác bomber chất liệu da lộn cao cấp, lót trong bằng lông cừu ấm áp. Phong cách streetwear hiện đại, phù hợp thu đông.",
    price: 1290000,
    originalPrice: 1790000,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    ],
    category: "thoi-trang",
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    featured: false,
    createdAt: "2024-10-18",
  },
  {
    id: "p15",
    name: "Máy Ảnh Kỹ Thuật Số Mirrorless Z7",
    slug: "may-anh-ky-thuat-so-mirrorless-z7",
    description: "Máy ảnh mirrorless full-frame 45.7MP. Chống rung 5 trục, quay video 4K 60fps. Màn hình cảm ứng xoay lật, kính ngắm điện tử OLED.",
    price: 32990000,
    originalPrice: 38990000,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    ],
    category: "dien-tu",
    rating: 4.9,
    reviewCount: 78,
    inStock: false,
    featured: false,
    createdAt: "2024-10-22",
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured && p.inStock);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category && p.inStock);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
};

export const getRelatedProducts = (product: Product): Product[] =>
  products.filter(
    (p) => p.category === product.category && p.id !== product.id && p.inStock
  );
