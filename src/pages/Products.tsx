// src/pages/Products.tsx
/**
 * Products.tsx
 *
 * Full page product listing for the Jhulacraft site (mock data).
 * - No SEO / Helmet code included (as requested).
 * - Contains: categories sidebar, grid with 3/4 column toggle, sorting,
 *   pagination, quick preview modal, share links, small utility components,
 *   accessible keyboard interactions, and localStorage persistence for UI prefs.
 *
 * This file is intentionally verbose and self-contained to match the requested
 * length and to provide plenty of realistic UI code you can adapt.
 */

import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, LayoutGrid, Columns, Eye, Search } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

import acrylicSwing from "@/assets/acrylic-swing.jpg";
import carvedSwing from "@/assets/carved-swing.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";
import singleSwing from "@/assets/single-swing.jpg";

/* ============================
   Types & Utilities
   ============================ */

type Category =
  | "Acrylic swing"
  | "Carving Swing"
  | "Outdoor Swing"
  | "Single Seater Swing"
  | "Single swing"
  | "Stainless steel swing"
  | "Swing with stand"
  | "Wicker Swing"
  | "Wooden Swing";

type ProductItem = {
  id: number;
  name: string;
  image: string;
  description: string;
  price?: number;
  rating?: number;
  tags?: string[];
  sku?: string;
};

const ALL_CATEGORIES: Category[] = [
  "Acrylic swing",
  "Carving Swing",
  "Outdoor Swing",
  "Single Seater Swing",
  "Single swing",
  "Stainless steel swing",
  "Swing with stand",
  "Wicker Swing",
  "Wooden Swing",
];

const isBrowser = typeof window !== "undefined";

/* small helper: safe localStorage (no-throw) */
const storage = {
  get: (key: string) => {
    try {
      if (!isBrowser) return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      if (!isBrowser) return;
      window.localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  remove: (key: string) => {
    try {
      if (!isBrowser) return;
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

/* ============================
   Mock dataset (9 categories x 10 products)
   Keep IDs unique so preview routing works.
   ============================ */

const makeProductsFor = (startId: number, title: string, images: string[]): ProductItem[] =>
  Array.from({ length: 10 }, (_, i) => ({
    id: startId + i,
    name: `${title} ${i + 1}`,
    image: images[i % images.length],
    description: `Beautiful ${title.toLowerCase()} ${i + 1} — handcrafted, durable, and elegant. Perfect for homes and gardens.`,
    price: 4999 + i * 250,
    rating: Math.round((4 + (i % 3) * 0.3) * 10) / 10,
    tags: ["handmade", "customizable"],
    sku: `${title.substring(0, 3).toUpperCase()}-${startId + i}`,
  }));

const CATEGORY_PRODUCTS: Record<Category, ProductItem[]> = {
  "Acrylic swing": makeProductsFor(1, "Acrylic Swing", [acrylicSwing, carvedSwing, outdoorSwing, singleSwing]),
  "Carving Swing": makeProductsFor(11, "Carving Swing", [carvedSwing, acrylicSwing, outdoorSwing]),
  "Outdoor Swing": makeProductsFor(21, "Outdoor Swing", [outdoorSwing, singleSwing, acrylicSwing]),
  "Single Seater Swing": makeProductsFor(31, "Single Seater Swing", [singleSwing, acrylicSwing, carvedSwing]),
  "Single swing": makeProductsFor(41, "Single Swing", [singleSwing, carvedSwing, outdoorSwing]),
  "Stainless steel swing": makeProductsFor(51, "Stainless Swing", [acrylicSwing, carvedSwing, outdoorSwing]),
  "Swing with stand": makeProductsFor(61, "Swing With Stand", [acrylicSwing, carvedSwing, singleSwing]),
  "Wicker Swing": makeProductsFor(71, "Wicker Swing", [acrylicSwing, carvedSwing, outdoorSwing]),
  "Wooden Swing": makeProductsFor(81, "Wooden Swing", [acrylicSwing, carvedSwing, outdoorSwing]),
};

/* ============================
   Helpers
   ============================ */

const getOrigin = () =>
  typeof window !== "undefined" && window.location?.origin ? window.location.origin : "https://example.com";

const productUrlFromId = (id: number) => `${getOrigin()}/product/${id}`;

const buildShareLinks = (id: number, name: string, image?: string) => {
  const u = encodeURIComponent(productUrlFromId(id));
  const text = encodeURIComponent(`Check out ${name}`);
  const media = encodeURIComponent(image || productUrlFromId(id));
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${text}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${u}&media=${media}&description=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${name} - ${productUrlFromId(id)}`)}`,
  };
};

/* ============================
   Small presentational components (local)
   ============================ */

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>{children}</span>
);

const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`inline-flex items-center justify-center p-2 rounded-full ${props.className || ""}`} />
);

const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse bg-white rounded-lg border p-4 h-[300px] flex flex-col gap-3">
    <div className="bg-gray-200 w-full h-40 rounded-md" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
    <div className="mt-auto h-10 bg-gray-200 rounded w-full" />
  </div>
);

/* ============================
   Main Component
   ============================ */

const Products: React.FC = () => {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const catFromUrl = (params.get("category") || "acrylic swing").toLowerCase();

  // map canonical categories by lowercase key
  const categoryMap = useMemo(() => Object.fromEntries(ALL_CATEGORIES.map((c) => [c.toLowerCase(), c])), []);

  // UI state with localStorage defaults
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (categoryMap[catFromUrl] as Category) || "Acrylic swing"
  );

  const [gridCols, setGridCols] = useState<3 | 4>(() => {
    const saved = storage.get("jc:gridCols");
    return saved === "4" ? 4 : 3;
  });

  const [sortOption, setSortOption] = useState<"default" | "name-asc" | "name-desc" | "price-asc" | "price-desc">(
    () => (storage.get("jc:sort") as any) || "default"
  );

  const [showAllProducts, setShowAllProducts] = useState<boolean>(() => storage.get("jc:showAll") === "1");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // modal / quick preview
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const p = storage.get("jc:page");
    return p ? Number(p) : 1;
  });
  const itemsPerPage = 9;

  // quick "loading" simulation flag
  const [loading, setLoading] = useState<boolean>(false);

  // search input ref for accessibility focus
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // persist some UI prefs
    storage.set("jc:gridCols", String(gridCols));
    storage.set("jc:sort", sortOption);
    storage.set("jc:showAll", showAllProducts ? "1" : "0");
    storage.set("jc:page", String(currentPage));
  }, [gridCols, sortOption, showAllProducts, currentPage]);

  // when URL category param changes, reset local UI
  useEffect(() => {
    setSelectedCategory((categoryMap[catFromUrl] as Category) || "Acrylic swing");
    setShowAllProducts(false);
    setSelectedProductIndex(null);
    setCurrentPage(1);
    // clear search when category switches
    setSearchTerm("");
  }, [catFromUrl, categoryMap]);

  // derived product list
  let currentProducts = CATEGORY_PRODUCTS[selectedCategory] || [];

  // simple client-side search
  if (searchTerm.trim()) {
    const q = searchTerm.trim().toLowerCase();
    currentProducts = currentProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.tags || []).some((t) => t.includes(q))
    );
  }

  // sorting logic
  if (sortOption === "name-asc") {
    currentProducts = [...currentProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    currentProducts = [...currentProducts].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price-asc") {
    currentProducts = [...currentProducts].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === "price-desc") {
    currentProducts = [...currentProducts].sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  // pagination derived values
  const totalPages = Math.max(1, Math.ceil(currentProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = showAllProducts ? currentProducts : currentProducts.slice(startIndex, endIndex);

  // modal helpers
  const openProduct = (index: number) => {
    setSelectedProductIndex(index);
    // scroll to top of modal or focus management could go here
  };
  const closeProduct = () => setSelectedProductIndex(null);

  const selectedProduct = selectedProductIndex !== null ? currentProducts[selectedProductIndex] : null;

  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // small helper to simulate loading when changing category (UX nicety)
  const handleCategoryChange = (cat: Category) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategory(cat);
      setLoading(false);
      setCurrentPage(1);
      // clear search
      setSearchTerm("");
    }, 250);
  };

  // keyboard: Esc closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeProduct();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ============================
     Rendering - large, intentionally verbose
     ============================ */

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Header />

      {/* Hero / Title */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center text-white px-4 sm:px-8">
          <Link to="/" className="mr-4 hover:opacity-80 transition-opacity" aria-label="Back to home">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{selectedCategory}</h1>
            <p className="text-sm sm:text-base text-gray-200 mt-1 max-w-xl">
              Explore our curated selection of {selectedCategory.toLowerCase()}. Each piece is handcrafted, tested for durability,
              and customizable to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Product Categories</h3>

              <div className="flex gap-2 items-center mb-4">
                <input
                  ref={searchRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search in category..."
                  className="flex-1 border rounded-md px-3 py-2"
                  aria-label="Search products"
                />
                <IconButton
                  onClick={() => {
                    if (searchRef.current) searchRef.current.focus();
                  }}
                  className="bg-primary text-white"
                  aria-label="Focus search"
                >
                  <Search size={16} />
                </IconButton>
              </div>

              <ul className="flex flex-col gap-2">
                {ALL_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left block rounded-md px-3 py-2 transition ${
                          active ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-gray-50"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">Grid columns</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setGridCols(3)} className={gridCols === 3 ? "bg-gray-200" : ""}>
                      3
                    </Button>
                    <Button variant="outline" onClick={() => setGridCols(4)} className={gridCols === 4 ? "bg-gray-200" : ""}>
                      4
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">Show all products</div>
                  <div>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showAllProducts}
                        onChange={(e) => setShowAllProducts(e.target.checked)}
                        className="h-4 w-4"
                        aria-label="Show all products"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Badge>Free delivery options</Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    Shipping calculated at checkout. Contact our sales team for bulk orders.
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: quick contact card */}
            <div className="mt-6 bg-white border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold mb-2">Need help choosing?</h4>
              <p className="text-sm text-gray-600 mb-3">Contact our showroom or message us on WhatsApp for quick assistance.</p>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/918106815081"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
                <Link to="/contact" className="px-3 py-2 rounded-md border hover:bg-gray-50">
                  Contact
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:w-3/4">
            {/* Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700 font-semibold">Sort</div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="border rounded-md px-3 py-2"
                  aria-label="Sort products"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name: A–Z</option>
                  <option value="name-desc">Name: Z–A</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600 mr-2 hidden sm:block">Showing</div>
                <div className="text-sm font-medium text-gray-800">
                  {showAllProducts ? currentProducts.length : displayedProducts.length} of {currentProducts.length}
                </div>
              </div>
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${gridCols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                  {displayedProducts.map((product, idx) => (
                    <article
                      key={product.id}
                      className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition relative focus-within:ring-2 focus-within:ring-primary"
                    >
                      <Link to={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
                        <div className="w-full h-44 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </Link>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => openProduct(startIndex + idx)}
                          title="Quick view"
                          className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50"
                          aria-label={`Quick view ${product.name}`}
                        >
                          <Eye size={18} />
                        </button>
                        <a
                          href={buildShareLinks(product.id, product.name, product.image).facebook}
                          target="_blank"
                          rel="noreferrer"
                          title="Share on Facebook"
                          className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50"
                        >
                          <FaFacebookF size={14} />
                        </a>
                      </div>

                      <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-md font-semibold text-gray-800">
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-gray-800">₹{product.price?.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">incl. taxes</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-700">{product.rating?.toFixed(1)}</Badge>
                            <a
                              href={buildShareLinks(product.id, product.name, product.image).whatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-green-500 text-white px-3 py-1 rounded-md inline-flex items-center gap-2"
                            >
                              <FaWhatsapp size={14} /> Buy
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {!showAllProducts && currentProducts.length > itemsPerPage && (
                  <nav className="flex items-center justify-center gap-3 mt-8" aria-label="Pagination">
                    <Button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-200">
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1 ? "bg-primary text-white font-bold" : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          aria-current={currentPage === i + 1 ? "page" : undefined}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <Button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-200">
                      Next
                    </Button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view of ${selectedProduct.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="flex items-start justify-between p-4 border-b">
              <div>
                <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                <div className="text-sm text-gray-600">SKU: {selectedProduct.sku}</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={buildShareLinks(selectedProduct.id, selectedProduct.name, selectedProduct.image).facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaFacebookF />
                </a>
                <button onClick={closeProduct} className="p-2 rounded hover:bg-gray-100" aria-label="Close quick view">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800 mb-2">₹{selectedProduct.price?.toLocaleString()}</div>
                <div className="text-sm text-gray-700 mb-4">{selectedProduct.description}</div>

                <ul className="list-disc pl-5 mb-4 text-sm text-gray-600">
                  <li>10 years warranty on most models</li>
                  <li>Customization available on color, rope length, and cushioning</li>
                  <li>Free shipping for select pincodes</li>
                </ul>

                <div className="flex gap-3 items-center">
                  <a
                    href={buildShareLinks(selectedProduct.id, selectedProduct.name, selectedProduct.image).whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
                  >
                    <FaWhatsapp /> Buy via WhatsApp
                  </a>

                  <Link to={`/product/${selectedProduct.id}`} onClick={closeProduct} className="px-4 py-2 rounded-md border">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">Need assistance? Call our showroom or chat on WhatsApp.</div>
              <div className="flex items-center gap-2">
                <a href="tel:+911234567890" className="text-sm text-primary hover:underline">
                  +91 12345 67890
                </a>
                <a href="mailto:sales@jhulacraft.com" className="text-sm text-gray-600 hover:underline">
                  sales@jhulacraft.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
