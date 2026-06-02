# AGENTS.md — vibe_code2

## Dev commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Typecheck + production build |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build locally |
| `npx tsc -b` | Typecheck only (no bundle) |

## Tech stack

- **Framework:** React 18 + TypeScript, Vite 5 bundler
- **Styling:** Tailwind CSS 3 with custom `primary` (red) and `gold` palettes
- **Routing:** react-router-dom v6
- **State:** React Context for auth and cart (localStorage-backed)

## Project structure

```
src/
├── types/index.ts        — Product, User, CartItem, Order, Category
├── data/products.ts      — Product catalog (15 items, 6 categories, Vietnamese)
├── data/categories.ts    — 6 categories
├── utils/format.ts       — formatPrice (VND), formatDate, classNames, truncate
├── context/
│   ├── AuthContext.tsx    — useAuth(): login, register, logout, updateProfile
│   └── CartContext.tsx    — useCart(): items, addItem, removeItem, updateQuantity
├── components/
│   ├── layout/           — Header (search, nav, cart badge, user menu), Footer, Layout
│   └── ui/ProductCard.tsx— Reusable card with wishlist/add-to-cart
└── pages/
    ├── Home.tsx           — Hero, categories, featured, new arrivals, trust badges
    ├── Products.tsx       — Filters (category, price), sorting, search results
    ├── ProductDetail.tsx  — Image gallery, quantity picker, related products
    ├── Login.tsx / Register.tsx — Auth forms
    ├── Cart.tsx           — Quantity controls, summary, discount logic
    ├── Checkout.tsx       — Address, payment method (COD/bank/MoMo), order review
    └── Profile.tsx        — Update profile, order history (sample)
```

## Key conventions

- **Language:** Vietnamese (UI text, slugs, product data)
- **Currency:** VND — always use `formatPrice()` from `utils/format.ts`
- **Colors:** Primary red (`#DC2626`), Gold accent (`#D97706`), glass header with backdrop-blur
- **Routing:** Products use slugs (`/products/:slug`), categories use query param (`?category=thoi-trang`)
- **Data:** Product data is static (in-memory from `data/products.ts`). Auth and cart persist to localStorage
- **Styling:** Tailwind utility classes only. Global `.btn-primary`, `.btn-outline`, `.card`, `.input-field`, `.glass` in `index.css`
- **Discount:** Cart applies 50,000₫ discount when subtotal >= 500,000₫
