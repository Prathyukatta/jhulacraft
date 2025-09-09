import { Button } from "@/components/ui/button";
import heroSwing from "@/assets/hero-swing.jpg";
import { Link } from "react-router-dom"; // ✅ Import Link

export const PromoSection = () => {
  return (
    <section className="py-8 bg-white font-poppins">
      <div className="container-custom">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Full Background Image */}
          <img
            src={heroSwing}
            alt="JhulaCraft Premium Swing"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start justify-center p-8 lg:p-16 h-full text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-snug">
              DEAL THAT MAKE <br />
              <span className="text-white text-4xl lg:text-5xl font-extrabold">
                YOU DROOL !
              </span>
            </h2>

            {/* SHOP NOW Button with redirect */}
            <Link to="/products">
              <Button
                className="px-8 py-3 text-lg font-bold rounded-lg text-white shadow-md"
                style={{
                  backgroundImage: "linear-gradient(90deg, #B80735, #EC6788)",
                }}
              >
                SHOP NOW
              </Button>
            </Link>
          </div>

          {/* Logo/Brand */}
          <div className="absolute top-8 right-8 text-white z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-[#B80735] to-[#EC6788] rounded transform rotate-45"></div>
              <span className="text-2xl font-bold">JhulaCraft</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
