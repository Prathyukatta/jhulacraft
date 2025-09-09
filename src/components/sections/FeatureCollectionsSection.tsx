import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import acrylicSwing from "@/assets/acrylic-swing.jpg";
import carvedSwing from "@/assets/carved-swing.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";
import singleSwing from "@/assets/single-swing.jpg";

const collections = [
  { name: "MACHHU TEAK WOOD", image: acrylicSwing, badge: "NEW" },
  { name: "MACHHU TEAK WOOD", image: carvedSwing, badge: "NEW" },
  { name: "MACHHU TEAK WOOD", image: outdoorSwing, badge: "NEW" },
  { name: "MACHHU TEAK WOOD", image: singleSwing, badge: "NEW" },
];

export const FeatureCollectionsSection = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products"); // Redirect to Products page
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">Feature Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="product-card group relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* New Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {collection.badge}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    className="bg-gradient-to-r from-[#B80735] to-[#EC6788] hover:opacity-90 text-white"
                    onClick={goToProducts}
                  >
                    View Collection
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 text-center">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            className="bg-gradient-to-r from-[#B80735] to-[#EC6788] hover:opacity-90 text-white px-8 py-3"
            onClick={goToProducts}
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
};
