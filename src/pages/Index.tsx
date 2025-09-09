import { Helmet } from "react-helmet-async";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { BestSellersSection } from '@/components/sections/BestSellersSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { SpecificationsSection } from '@/components/sections/SpecificationsSection';
import { OnDemandSection } from '@/components/sections/OnDemandSection';
import { FeatureCollectionsSection } from '@/components/sections/FeatureCollectionsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ✅ SEO Tags */}
      <Helmet>
        <title>JhulaCraft | Handcrafted Wooden Swings & Furniture</title>
        <meta
          name="description"
          content="Discover handcrafted wooden swings, outdoor swings, and custom furniture from JhulaCraft. Elegant designs, premium quality, delivered worldwide."
        />
        <meta name="keywords" content="jhula, wooden swings, handcrafted furniture, outdoor swings, JhulaCraft" />
        <meta name="author" content="JhulaCraft" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="JhulaCraft | Handcrafted Wooden Swings & Furniture" />
        <meta property="og:description" content="Elegant handcrafted swings & furniture from JhulaCraft." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JhulaCraft",
              "url": "https://yourdomain.com",
              "logo": "https://yourdomain.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/jhulacraft",
                "https://www.instagram.com/jhulacraft"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* ✅ Page Layout */}
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <BestSellersSection />
        <PromoSection />
        <SpecificationsSection />
        <OnDemandSection />
        <FeatureCollectionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
