// src/pages/Products.tsx
import { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ added for SEO
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, LayoutGrid, Columns, Eye } from "lucide-react";
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

/**
 * Categories
 */
const categories = [
  "Acrylic swing",
  "Carving Swing",
  "Outdoor Swing",
  "Single Seater Swing",
  "Single swing",
  "Stainless steel swing",
  "Swing with stand",
  "Wicker Swing",
  "Wooden Swing",
] as const;

/**
 * Product dataset (mock)
 * NOTE: keep IDs unique across all categories so preview page routing works.
 */
const categoryProducts: Record<(typeof categories)[number], Array<{
  id: number;
  name: string;
  image: string;
  description: string;
}>> = {
  "Acrylic swing": Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `ACRYLIC SWING ${i + 1}`,
    image: [acrylicSwing, carvedSwing, outdoorSwing][i % 3],
    description: "Premium swing for comfort and style.",
  })),
  "Carving Swing": Array.from({ length: 10 }, (_, i) => ({
    id: 11 + i,
    name: `CARVING SWING ${i + 1}`,
    image: [carvedSwing, acrylicSwing, outdoorSwing][i % 3],
    description: "Luxury traditional carved swing.",
  })),
  "Outdoor Swing": Array.from({ length: 10 }, (_, i) => ({
    id: 21 + i,
    name: `OUTDOOR SWING ${i + 1}`,
    image: [outdoorSwing, singleSwing, acrylicSwing][i % 3],
    description: "Durable outdoor swing.",
  })),
  "Single Seater Swing": Array.from({ length: 10 }, (_, i) => ({
    id: 31 + i,
    name: `SINGLE SEATER SWING ${i + 1}`,
    image: [singleSwing, acrylicSwing, carvedSwing][i % 3],
    description: "Compact single seater swing.",
  })),
  "Single swing": Array.from({ length: 10 }, (_, i) => ({
    id: 41 + i,
    name: `SINGLE SWING ${i + 1}`,
    image: [singleSwing, carvedSwing, outdoorSwing][i % 3],
    description: "Elegant single swing.",
  })),
  "Stainless steel swing": Array.from({ length: 10 }, (_, i) => ({
    id: 51 + i,
    name: `STAINLESS SWING ${i + 1}`,
    image: [acrylicSwing, carvedSwing, outdoorSwing][i % 3],
    description: "Durable stainless steel swing.",
  })),
  "Swing with stand": Array.from({ length: 10 }, (_, i) => ({
    id: 61 + i,
    name: `SWING WITH STAND ${i + 1}`,
    image: [acrylicSwing, carvedSwing, singleSwing][i % 3],
    description: "Swing with stand for your garden.",
  })),
  "Wicker Swing": Array.from({ length: 10 }, (_, i) => ({
    id: 71 + i,
    name: `WICKER SWING ${i + 1}`,
    image: [acrylicSwing, carvedSwing, outdoorSwing][i % 3],
    description: "Comfortable wicker swing.",
  })),
  "Wooden Swing": Array.from({ length: 10 }, (_, i) => ({
    id: 81 + i,
    name: `WOODEN SWING ${i + 1}`,
    image: [acrylicSwing, carvedSwing, outdoorSwing][i % 3],
    description: "Classic wooden swing.",
  })),
};

/**
 * Helper to create a shareable link that targets the product preview page.
 * We build a URL like: https://yourdomain.com/product/ID
 */
const buildShareLinks = (id: number, name: string, image?: string) => {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://example.com";
  const productUrl = `${origin}/product/${id}`;
  const u = encodeURIComponent(productUrl);
  const text = encodeURIComponent(`Check out ${name}`);
  const media = encodeURIComponent(image || productUrl);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${text}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${u}&media=${media}&description=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
};

const Products = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromUrl = (params.get("category") || "acrylic swing").toLowerCase();

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.toLowerCase(), c])),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryMap[categoryFromUrl] || "Acrylic swing"
  );
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [sortOption, setSortOption] = useState<"default" | "name-asc" | "name-desc">("default");
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Modal state controlled by the eye icon
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // When category in URL changes, reset paging & modal
  useEffect(() => {
    setSelectedCategory((categoryMap[categoryFromUrl] as string) || "Acrylic swing");
    setShowAllProducts(false);
    setSelectedProductIndex(null);
    setCurrentPage(1);
  }, [categoryFromUrl, categoryMap]);

  // Active category products
  let currentProducts =
    categoryProducts[selectedCategory as keyof typeof categoryProducts] || [];

  // sort
  if (sortOption === "name-asc") {
    currentProducts = [...currentProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    currentProducts = [...currentProducts].sort((a, b) => b.name.localeCompare(a.name));
  }

  // pagination slice
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = showAllProducts
    ? currentProducts
    : currentProducts.slice(startIndex, endIndex);

  // modal helpers
  const openProduct = (index: number) => setSelectedProductIndex(index);
  const closeProduct = () => setSelectedProductIndex(null);

  const selectedProduct =
    selectedProductIndex !== null ? currentProducts[selectedProductIndex] : null;

  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const gridColsClass = gridCols === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  /* ------------------------------- SEO variables ------------------------------- */
  const origin =
    typeof window !== "undefined" && window.location?.origin ? window.location.origin : "https://example.com";
  const seoTitle = `${selectedCategory} | Premium Swings Collection`;
  const seoDescription = `Explore our ${selectedCategory} selection — stylish, durable, and customizable swings. Buy online or via WhatsApp today!`;
  const seoUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${location.pathname}${location.search}`
      : "https://example.com/products";
  const seoImage = displayedProducts[0]?.image || acrylicSwing;

  /* ---------------------------------- RENDER ---------------------------------- */

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* SEO */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={seoUrl} />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:image:alt" content={seoTitle} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        <meta name="twitter:image:alt" content={seoTitle} />

        {/* JSON-LD: Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${origin}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${origin}/products`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: selectedCategory,
                item: `${origin}/products?category=${encodeURIComponent(selectedCategory.toLowerCase())}`,
              },
            ],
          })}
        </script>

        {/* JSON-LD: ItemList of products currently shown in the grid */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${selectedCategory} - Product List`,
            itemListOrder: "http://schema.org/ItemListOrderAscending",
            numberOfItems: displayedProducts.length,
            itemListElement: displayedProducts.map((p, i) => ({
              "@type": "ListItem",
              position: startIndex + i + 1,
              url: productUrlFromId ? `${origin}/product/${p.id}` : `https://example.com/product/${p.id}`,
              name: p.name,
              image: p.image,
            })),
          })}
        </script>
      </Helmet>

      {/* Fixed header + spacer so hero isn’t overlapped */}
      <Header />
      <div className="h-[8px]" />

      {/* Hero / Title bar */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center text-white">
          <Link to="/" className="mr-4 hover:opacity-80 transition-opacity" aria-label="Back">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-bold">{selectedCategory}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ----------------------------- Sidebar ----------------------------- */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800">PRODUCT CATEGORIES</h3>

              {/* 
                FIX: consistent height + line-height + padding for every item
                Active item uses background + color, not margins. 
              */}
              <ul className="flex flex-col gap-1">
                {categories.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <li key={category}>
                      <Link
                        to={`/products?category=${encodeURIComponent(category.toLowerCase())}`}
                        className={[
                          "block rounded-md px-3",
                          "py-2 leading-6 text-sm transition-colors",
                          active
                            ? "bg-rose-50 text-[#B80735] font-semibold ring-1 ring-[#B80735]/20"
                            : "text-gray-700 hover:text-[#B80735] hover:bg-gray-50",
                        ].join(" ")}
                        aria-current={active ? "page" : undefined}
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* ------------------------------ Main ------------------------------- */}
          <main className="lg:w-3/4 relative">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setGridCols(3)}
                  className={gridCols === 3 ? "bg-gray-200" : ""}
                  aria-label="3 columns"
                >
                  <Columns size={20} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGridCols(4)}
                  className={gridCols === 4 ? "bg-gray-200" : ""}
                  aria-label="4 columns"
                >
                  <LayoutGrid size={20} />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <label className="sr-only" htmlFor="sort-products">
                  Sort products
                </label>
                <select
                  id="sort-products"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="default">Default sorting</option>
                  <option value="name-asc">Sort by name: A–Z</option>
                  <option value="name-desc">Sort by name: Z–A</option>
                </select>

                <Button
                  variant="outline"
                  onClick={() => setShowAllProducts((s) => !s)}
                  className="ml-1"
                >
                  {showAllProducts ? "Show paginated" : "Show all"}
                </Button>
              </div>
            </div>

            {/* Grid */}
            <div className={`mb-8 grid gap-6 grid-cols-1 sm:grid-cols-2 ${gridColsClass}`}>
              {displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="relative bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition group"
                >
                  <Link to={`/product/${product.id}`} className="block" aria-label={product.name}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </Link>

                  {/* Eye / Quick preview */}
                  <button
                    type="button"
                    onClick={() => openProduct(startIndex + index)}
                    className="absolute top-2 right-2 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition shadow-sm hover:shadow"
                    aria-label="Preview Product"
                  >
                    <Eye size={20} className="text-gray-700" />
                  </button>

                  <div className="p-4 text-center flex flex-col gap-2">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                      onClick={() => {
                        const message = `Hello, I want to purchase:\n\n${product.name}`;
                        window.open(
                          `https://wa.me/918106815081?text=${encodeURIComponent(message)}`,
                          "_blank"
                        );
                      }}
                    >
                      <FaWhatsapp size={16} /> Buy via WhatsApp
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {!showAllProducts && currentProducts.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? "bg-primary text-white font-bold"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* --------------------------- Quick View Modal -------------------------- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative p-6 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[85vh]">
            {/* Close */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeProduct}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
              <p className="text-gray-600">{selectedProduct.description}</p>

              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin,
                  augue in feugiat feugiat, elit mauris dapibus purus.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Comes with 10 years warranty period, 400kg weight capacity.</li>
                  <li>All customization (size, color, rope height) available as per requirement.</li>
                </ul>
                <p>
                  Contact nearest <span className="font-semibold">SHOWROOM</span> or customer
                  care for assistance and custom orders.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
                  onClick={() => {
                    const message = `Hello, I want to purchase:\n\n${selectedProduct.name}`;
                    window.open(
                      `https://wa.me/918106815081?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  <FaWhatsapp size={18} /> Buy via WhatsApp
                </Button>

                <Link
                  to={`/product/${selectedProduct.id}`}
                  className="px-6 py-2 rounded-md border bg-white hover:bg-gray-50 text-gray-800 font-medium"
                  onClick={closeProduct}
                >
                  View Details Page
                </Link>
              </div>

              {/* Category + Share */}
              <div className="pt-4 mt-2 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-700 font-semibold">Category:</span>
                  <span className="text-gray-700">{selectedCategory}</span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-gray-700 font-semibold">Share:</span>
                  {(() => {
                    const links = buildShareLinks(
                      selectedProduct.id,
                      selectedProduct.name,
                      selectedProduct.image
                    );
                    return (
                      <>
                        <a
                          href={links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Facebook"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:opacity-90 transition"
                        >
                          <FaFacebookF size={18} />
                        </a>
                        <a
                          href={links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Twitter"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:opacity-90 transition"
                        >
                          <FaTwitter size={18} />
                        </a>
                        <a
                          href={links.pinterest}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Pinterest"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:opacity-90 transition"
                        >
                          <FaPinterestP size={18} />
                        </a>
                        <a
                          href={links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on LinkedIn"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:opacity-90 transition"
                        >
                          <FaLinkedinIn size={18} />
                        </a>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

/* -------------------------------- Helpers used in JSON-LD above ------------------------------- */

function productUrlFromId(id: number) {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://example.com";
  return `${origin}/product/${id}`;
}