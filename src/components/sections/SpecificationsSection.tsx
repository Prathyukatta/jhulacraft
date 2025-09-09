import swing from "@/assets/acrylic-swing.jpg";
import swingHardware from "@/assets/swing-hardware.jpg";
import outdoorSwing from "@/assets/outdoor-swing.jpg";

export const SpecificationsSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container-custom max-w-6xl">
        <h2 className="section-title text-center mb-6 text-xxl">
          The specifications
        </h2>

        {/* Flexbox with small gap */}
        <div className="flex flex-col md:flex-row gap-2 items-stretch">
          {/* Left big image */}
          <div className="flex-1">
            <img
              src={swing}
              alt="Swing"
              className="w-full h-[300px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right images grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
            <img
              src={swingHardware}
              alt="Swing Hardware 1"
              className="w-full h-[145px] object-cover rounded-lg shadow-md"
            />
            <img
              src={outdoorSwing}
              alt="Swing Hardware 2"
              className="w-full h-[145px] object-cover rounded-lg shadow-md"
            />
            <img
              src={swingHardware}
              alt="Swing Hardware 3"
              className="w-full h-[145px] object-cover rounded-lg shadow-md"
            />
            <img
              src={outdoorSwing}
              alt="Swing Hardware 4"
              className="w-full h-[145px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
