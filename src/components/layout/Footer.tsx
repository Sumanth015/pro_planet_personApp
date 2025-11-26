import { Leaf, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg">PRO PLANET PERSON</span>
            </div>
            <p className="text-primary-light text-sm mb-4">
              Join our community of environmental champions working together to create a sustainable future.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-light">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/map" className="hover:text-primary-foreground transition-colors">Recycling Map</Link></li>
              <li><Link to="/tasks" className="hover:text-primary-foreground transition-colors">Eco Tasks</Link></li>
              <li><Link to="/videos" className="hover:text-primary-foreground transition-colors">Videos</Link></li>
              <li><Link to="/articles" className="hover:text-primary-foreground transition-colors">Articles</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-light">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Recycling Guide</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Carbon Calculator</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Eco Tips</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Community Events</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Partner With Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-light">
              <li>Bengaluru, Karnataka, India</li>
              <li>support@proplanetperson.com</li>
              <li>+91 80 1234 5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-light">© 2025 PRO PLANET PERSON. All rights reserved.</p>
          <p className="text-sm text-primary-light mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-destructive fill-destructive" /> for a greener planet
          </p>
        </div>
      </div>
    </footer>
  );
};
