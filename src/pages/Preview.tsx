// src/pages/Preview.tsx
import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Trash2 } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import emailjs from "emailjs-com";

// Mock images
import acrylicSwing from "@/assets/acrylic-swing.jpg";
import carvedSwing from "@/assets/carved-swing.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";
import singleSwing from "@/assets/single-swing.jpg";

/* -----------------------
   EmailJS config
----------------------- */
const SERVICE_ID = "service_74wn06o";
const TEMPLATE_ID = "template_wy47a6o";
const PUBLIC_KEY = "Fkb-s6DgwS9g6QAIV";
const TO_EMAIL_1 = "prathyushakatta810@gmail.com";
const TO_EMAIL_2 = "anandtumma01@gmail.com";

/* -----------------------
   Mock product dataset (9 categories × 10 products)
----------------------- */
type Product = {
  id: number;
  name: string;
  slug?: string;
  images: string[];
  short: string;
  long: string;
  category: string;
};

const categories = [
  "Acrylic Swing",
  "Wooden Swing",
  "Outdoor Swing",
  "Metal Swing",
  "Hanging Chair",
  "Kids Swing",
  "Porch Swing",
  "Garden Swing",
  "Luxury Swing",
];

let PRODUCTS: Product[] = [];
let productId = 1;

categories.forEach((cat) => {
  for (let i = 1; i <= 10; i++) {
    PRODUCTS.push({
      id: productId,
      name: `${cat} Product ${i}`,
      images: [acrylicSwing, carvedSwing, outdoorSwing, singleSwing],
      short: `Short description of ${cat} Product ${i}`,
      long: `Long description of ${cat} Product ${i}. This swing is high quality and durable. It can hold heavy weight and comes with customization options.`,
      category: cat,
    });
    productId++;
  }
});

/* -----------------------
   Helper: Share links
----------------------- */
const buildShareLinks = (productId: number, title: string, media?: string) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const url = `${origin}/product/${productId}`;
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(`Check out ${title}`);
  const mediaEnc = encodeURIComponent(media || url);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${text}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${u}&media=${mediaEnc}&description=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  };
};

/* -----------------------
   Reviews type
----------------------- */
type Review = {
  id: number;
  rating: number;
  name: string;
  email: string;
  comment: string;
  date: string;
};

/* -----------------------
   Component
----------------------- */
const ProductPreview: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const productId = Number(id);
  const product = useMemo(() => PRODUCTS.find((p) => p.id === productId), [productId]);

  const [mainIndex, setMainIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedSample, setSelectedSample] = useState<string>("");
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const sampleComments = ["Good quality.", "Delivered on time.", "Very comfortable and sturdy.", "Excellent finish, looks great."];
  const share = product ? buildShareLinks(product.id, product.name, product.images[0]) : null;

  if (!product) {
    return (
      <>
        <Header />
        <div className="container-custom py-20 text-center">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p className="mt-4">
            The product you requested doesn't exist.{" "}
            <Link to="/products" className="text-primary underline">
              Back to products
            </Link>
          </p>
        </div>
        <Footer />
      </>
    );
  }

  /* -----------------------
     Navigation: Previous / Next
  ----------------------- */
  const categoryProducts = PRODUCTS.filter((p) => p.category === product.category);
  const currentIndex = categoryProducts.findIndex((p) => p.id === product.id);
  const prevProduct = currentIndex > 0 ? categoryProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex < categoryProducts.length - 1 ? categoryProducts[currentIndex + 1] : null;

  const related = useMemo(() => {
    const same = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
    const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...same, ...others].slice(0, 6);
  }, [product]);

  /* -----------------------
     Review submission
  ----------------------- */
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || !comment.trim() || !name.trim() || !email.trim()) return alert("Please fill all required fields and give a rating.");

    setLoading(true);

    const newRev: Review = { id: Date.now(), rating, name, email, comment, date: new Date().toISOString() };
    setReviews((r) => [newRev, ...r]);

    const emailParams = {
      name,
      email,
      message: `Product: ${product.name}\nRating: ${rating}\nReview: ${comment}`,
      time: new Date().toLocaleString(),
      product_name: product.name,
      product_id: product.id,
      to_email_1: TO_EMAIL_1,
      to_email_2: TO_EMAIL_2,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY);
      setPopup({ message: "✅ Review submitted and emailed successfully!", type: "success" });
    } catch {
      setPopup({ message: "❌ Review saved but failed to send email.", type: "error" });
    } finally {
      setRating(0);
      setComment("");
      setName("");
      setEmail("");
      setSelectedSample("");
      setActiveTab("reviews");
      setLoading(false);
      setTimeout(() => setPopup(null), 5000);
    }
  };

  return (
    <>
      <Header />
      {popup && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 ${popup.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {popup.message}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="container-custom pt-6 pb-0">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Link to="/" className="hover:underline flex items-center gap-2"><ArrowLeft size={14} /> Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">Products</Link>
          <span>/</span>
          <span className="font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="container-custom py-10">
        <div className="flex justify-between mb-4">
          {prevProduct && (
            <button
              onClick={() => navigate(`/product/${prevProduct.id}`)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Previous
            </button>
          )}
          {nextProduct && (
            <button
              onClick={() => navigate(`/product/${nextProduct.id}`)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next →
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: thumbnails + main image */}
          <div>
            <div className="flex gap-4">
              <div className="hidden md:flex flex-col gap-3">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setMainIndex(idx)} className={`w-20 h-20 rounded-md overflow-hidden border ${mainIndex === idx ? "ring-2 ring-primary" : "border-gray-200"}`} aria-label={`Thumbnail ${idx + 1}`}>
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-md shadow-sm overflow-hidden border">
                  <img src={product.images[mainIndex]} alt={product.name} className="w-full max-h-[360px] object-contain" />
                </div>

                <div className="flex md:hidden gap-3 mt-3 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button key={idx} onClick={() => setMainIndex(idx)} className={`w-20 h-20 rounded-md overflow-hidden ${mainIndex === idx ? "ring-2 ring-primary" : "border border-gray-200"}`}>
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: title, highlights, CTA, share */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-3">{product.short}</p>
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              <li>• Comes with 10 years warranty period, 400kg weight capacity.</li>
              <li>• All customization (size, colour, rope height) available as per requirement.</li>
              <li>• Kurlon 40 density cushioning, fabric/rexine customisation available.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a href={share?.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"><FaWhatsapp /> Buy via WhatsApp</a>
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50">Contact Us</Link>
            </div>

            <div className="pt-4 mt-2 border-t">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-700 font-semibold">Category:</span>
                <span className="text-gray-700">{product.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-semibold mr-2">Share:</span>
                <a href={share?.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:opacity-90"><FaFacebookF /></a>
                <a href={share?.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:opacity-90"><FaTwitter /></a>
                <a href={share?.pinterest} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:opacity-90"><FaPinterestP /></a>
                <a href={share?.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:opacity-90"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Reviews */}
        <div className="mt-10">
          <div className="border-b">
            <nav className="flex gap-6">
              <button onClick={() => setActiveTab("description")} className={`pb-3 ${activeTab === "description" ? "border-b-2 border-primary font-semibold" : "text-gray-600"}`}>DESCRIPTION</button>
              <button onClick={() => setActiveTab("reviews")} className={`pb-3 ${activeTab === "reviews" ? "border-b-2 border-primary font-semibold" : "text-gray-600"}`}>REVIEWS ({reviews.length})</button>
            </nav>
          </div>

          <div className="pt-6">
            {activeTab === "description" && (
              <div className="text-gray-700 leading-relaxed space-y-4">
                {product.long.split("\n\n").map((para, idx) => (<p key={idx}>{para}</p>))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {reviews.length === 0 ? <p className="text-gray-600">There are no reviews yet.</p> : (
                    <div className="space-y-4">
                      {reviews.map((r) => (
                        <div key={r.id} className="border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</div>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: r.rating }).map((_, i) => (<span key={i}>★</span>))}
                            {Array.from({ length: 5 - r.rating }).map((_, i) => (<span key={i} className="text-gray-300">★</span>))}
                          </div>
                          <p className="mt-2 text-gray-700">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <form onSubmit={submitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your rating *</label>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const val = i + 1;
                          return (
                            <button key={val} type="button" onClick={() => setRating(val)} className={`text-2xl ${rating >= val ? "text-yellow-500" : "text-gray-300"}`} aria-label={`${val} star`}>★</button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your review *</label>
                      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review here..." className="w-full border rounded-md px-3 py-2 min-h-[120px]" required />
                    </div>

                    <div className="flex items-center gap-3">
                      <select value={selectedSample} onChange={(e) => { setSelectedSample(e.target.value); if (e.target.value) setComment((c) => (c ? `${c}\n${e.target.value}` : e.target.value)); }} className="border px-3 py-2 rounded-md">
                        <option value="">Sample comments</option>
                        {sampleComments.map((s, i) => (<option key={i} value={s}>{s}</option>))}
                      </select>
                      <button type="button" onClick={() => setSelectedSample("")} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Clear sample"><Trash2 size={16} /></button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name *</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email *</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded-md px-3 py-2" required />
                    </div>

                    <div className="flex items-center gap-3">
                      <input id="save-info" type="checkbox" />
                      <label htmlFor="save-info" className="text-sm text-gray-600">Save my name, email in this browser for next time I comment.</label>
                    </div>

                    <div>
                      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700" disabled={loading}>{loading ? "Submitting..." : "SUBMIT"}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">RELATED PRODUCTS</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <Link key={r.id} to={`/product/${r.id}`} className="block bg-white rounded-lg border p-3 hover:shadow-md transition">
                <div className="w-full h-36 overflow-hidden rounded-md mb-3">
                  <img src={r.images[0]} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm font-semibold text-gray-800">{r.name}</div>
                <div className="mt-3">
                  <a href={`https://wa.me/?text=${encodeURIComponent(`I'm interested in ${r.name}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded">
                    <FaWhatsapp /> Buy
                  </a>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductPreview;
