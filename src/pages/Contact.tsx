import InquiryForm from "./InquiryForm"; // adjust path if needed
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <>
      {/* ✅ SEO for Contact Page */}
      <Helmet>
        <title>Contact Us | JhulaCraft</title>
        <meta
          name="description"
          content="Reach out to JhulaCraft for inquiries about handcrafted wooden swings, custom furniture, and premium designs."
        />
        <meta
          name="keywords"
          content="JhulaCraft contact, product inquiry, handcrafted swings, wooden furniture inquiry"
        />
        <meta property="og:title" content="Contact Us | JhulaCraft" />
        <meta
          property="og:description"
          content="Get in touch with JhulaCraft for product inquiries, orders, and custom designs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta property="og:image" content="https://yourdomain.com/contact-og.jpg" />
      </Helmet>

      {/* ✅ Reusing your Inquiry Form */}
      <InquiryForm />
    </>
  );
};

export default ContactUs;
