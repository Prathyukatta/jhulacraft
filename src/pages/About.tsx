// src/pages/About.tsx
import React from "react";
import { Header } from "../components/layout/Header";
import { motion, Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const About: React.FC = () => {
  const cardVariants: Variants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
    hover: { scale: 1.05 },
  };

  return (
    <>
      {/* ✅ SEO for About Page */}
      <Helmet>
        <title>About Us | JhulaCraft</title>
        <meta
          name="description"
          content="Learn about JhulaCraft – our mission, vision, and story behind crafting premium handcrafted swings and furniture that bring comfort, joy, and style."
        />
        <meta
          name="keywords"
          content="about JhulaCraft, handcrafted swings, swing makers, wooden swings, luxury furniture"
        />
        <meta name="author" content="JhulaCraft" />

        {/* Open Graph (Social Media Preview) */}
        <meta property="og:title" content="About Us | JhulaCraft" />
        <meta
          property="og:description"
          content="Discover the story, mission, and vision of JhulaCraft – creators of handcrafted swings and furniture."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="https://yourdomain.com/og-about.jpg" />
      </Helmet>

      {/* Header */}
      <Header />

      {/* About Section */}
      <section className="py-16 bg-gray-50 mt-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            About Jhula House
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12">
            At Jhula House, we are passionate about swings and dedicated to
            bringing you the best in swing designs and experiences. Whether
            you’re a swing enthusiast, a parent looking for the perfect
            addition to your backyard, or someone seeking relaxation and joy,
            we are your one-stop destination for all things swing-related.
          </p>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The seeds of Jhula House were sown when a group of like-minded
              individuals came together, bound by their shared appreciation
              for the simple pleasure of swinging. With backgrounds in design,
              wellness, craftsmanship, and outdoor living, we realized that
              swings have the power to transform spaces into havens of
              serenity and joy. United by this vision, we began our journey to
              curate a platform that celebrates swings and empowers others to
              experience their transformative magic.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <motion.div
              className="p-6 rounded-xl shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="leading-relaxed">
                We are committed to showcasing a wide variety of swing styles,
                designs, and applications. By highlighting the versatility and
                beauty of swings, we inspire individuals to reimagine their
                living spaces and create retreats that reflect their unique
                lifestyle. Our goal is to provide accessible resources that
                empower our audience to make informed decisions about
                selecting, installing, and maintaining swings.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="p-6 rounded-xl shadow-lg cursor-pointer bg-gradient-to-r from-teal-400 to-blue-600 text-white"
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="leading-relaxed">
                Our vision at Jhula House is to become the premier destination
                and global hub for swing enthusiasts, where imagination takes
                flight and swings embody comfort, creativity, and connection.
                We aspire to transform outdoor spaces into living works of
                art, inspiring a worldwide community to embrace the serenity
                and beauty of swings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
