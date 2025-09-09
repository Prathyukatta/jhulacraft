import { Star, Heart, Volume2, VolumeX, Play, Pause } from "lucide-react";
import acrylicSwing from "@/assets/acrylic-swing.jpg";
import carvedSwing from "@/assets/carved-swing.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";

// Replace with your available sample video files
import sample4 from "@/assets/sample-4.mp4";
import sample5 from "@/assets/sample-5.mp4";

import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "MACHHU TEAK WOOD",
    image: acrylicSwing,
    video: sample4, // ✅ replaced
    rating: 4.5,
    description:
      "Beautiful handcrafted swing made from premium teak wood with intricate traditional patterns. Perfect for modern homes.",
  },
  {
    id: 2,
    name: "MACHHU TEAK WOOD",
    image: carvedSwing,
    video: sample5, // ✅ replaced
    rating: 4.5,
    description:
      "Elegant carved design with comfortable seating. Handmade by expert craftsmen using sustainable materials.",
  },
  {
    id: 3,
    name: "MACHHU TEAK WOOD",
    image: outdoorSwing,
    video: sample4, // ✅ duplicated sample-4 for third product
    rating: 4.5,
    description:
      "Weather-resistant outdoor swing perfect for gardens and patios. Combines durability with aesthetic appeal.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={star <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))}
    <span className="text-sm text-gray-600 ml-2">{rating}</span>
  </div>
);

export const BestSellersSection = () => {
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const [isMuted, setIsMuted] = useState<{ [key: number]: boolean }>({});
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const togglePlay = (id: number) => {
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      if (isPlaying[id]) {
        videoEl.pause();
      } else {
        videoEl.play();
      }
      setIsPlaying((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const toggleMute = (id: number) => {
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      videoEl.muted = !videoEl.muted;
      setIsMuted((prev) => ({ ...prev, [id]: videoEl.muted }));
    }
  };

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Best-Sellers of the season</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card rounded-2xl shadow-lg overflow-hidden bg-white flex flex-col"
            >
              <div className="relative group w-full h-64">
                <video
                  ref={(el) => (videoRefs.current[product.id] = el)}
                  src={product.video}
                  poster={product.image}
                  className="w-full h-full object-cover"
                  muted={isMuted[product.id] ?? false}
                />

                {/* Buttons top-right */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  {/* Mute/Unmute */}
                  <button
                    onClick={() => toggleMute(product.id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    {isMuted[product.id] ? (
                      <VolumeX size={18} className="text-gray-500" />
                    ) : (
                      <Volume2 size={18} className="text-green-600" />
                    )}
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={() => togglePlay(product.id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    {isPlaying[product.id] ? (
                      <Pause size={18} className="text-blue-600" />
                    ) : (
                      <Play size={18} className="text-gray-500" />
                    )}
                  </button>

                  {/* Like */}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <Heart
                      size={18}
                      className={likes[product.id] ? "fill-red-500 text-red-500" : "text-gray-500"}
                    />
                  </button>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <StarRating rating={product.rating} />
                <h3 className="text-lg font-bold text-gray-800 mt-3 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
