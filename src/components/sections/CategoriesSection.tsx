import { Link } from "react-router-dom";
import acrylicSwing from "@/assets/acrylic-swing.jpg";
import carvedSwing from "@/assets/carved-swing.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";
import singleSwing from "@/assets/single-swing.jpg";

const categories = [
  { name: "ACRYLIC SWING", image: acrylicSwing },
  { name: "CARVING SWING", image: carvedSwing },
  { name: "OUTDOOR SWING", image: outdoorSwing },
  { name: "SINGLE SEATER SWING", image: singleSwing },
  { name: "SINGLE SWING", image: acrylicSwing },
  { name: "STAINLESS STEEL SWING", image: carvedSwing },
  { name: "SWING WITH STAND", image: outdoorSwing },
  { name: "WICKER SWING", image: singleSwing },
];

export const CategoriesSection = () => {
  return (
    <section className="py-16 bg-white font-poppins">
      <div className="container-custom">
        <h2 className="section-title text-3xl font-bold mb-8">
          Our Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-card group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="text-white px-3 py-1 rounded text-sm font-bold text-center shadow-md"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #B80735, #EC6788)",
                    }}
                  >
                    {category.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
