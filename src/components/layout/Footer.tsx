import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Why People Like Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Why People Like Us</h3>
            <p className="text-gray-300 mb-4">
              At The Jhula Craft, we're dedicated to preserving and sharing the intricate art
              of swing-making. Our board of experienced craftsmen is here to guide
              you through every step of your swing-buying journey.
            </p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-[#B80735] to-[#EC6788] hover:opacity-90 text-white px-6 py-2 rounded font-medium transition-colors inline-block"
            >
              Order Now
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 list-none">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Our Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Products</h3>
            <ul className="space-y-3 list-none">
              <li><Link to="/products#acrylic-swing" className="text-gray-300 hover:text-white transition-colors">Acrylic Swing</Link></li>
              <li><Link to="/products#stainless-steel-swing" className="text-gray-300 hover:text-white transition-colors">Stainless Steel Swing</Link></li>
              <li><Link to="/products#wicker-swing" className="text-gray-300 hover:text-white transition-colors">Wicker Swing</Link></li>
              <li><Link to="/products#outdoor-swing" className="text-gray-300 hover:text-white transition-colors">Outdoor Swing</Link></li>
              <li><Link to="/products#single-swing" className="text-gray-300 hover:text-white transition-colors">Single Swing</Link></li>
              <li><Link to="/products#swing-with-stand" className="text-gray-300 hover:text-white transition-colors">Swing with Stand</Link></li>
              <li><Link to="/products#carving-swing" className="text-gray-300 hover:text-white transition-colors">Carving Swing</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 mt-1" size={16} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-300 text-sm">
                    The Jhula Craft, Madhapur,
                    Hyderabad, Telangana,
                    500081, India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <div>
                  <p className="font-semibold">Mail</p>
                  <p className="text-gray-300 text-sm">thejhulacraft@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-300 text-sm">+91 8106815081</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 The Jhula Craft | DEVELOPED BY ADVANCE TECHNOLOGIES
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                className="h-8 w-auto object-contain bg-white p-1 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-8 w-auto object-contain bg-white p-1 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                alt="Amex"
                className="h-8 w-auto object-contain bg-white p-1 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
