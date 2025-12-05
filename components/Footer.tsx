
import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onBlogClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollTo, onBlogClick }) => {
  const year = new Date().getFullYear();

  const QuickLink: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
    <li>
      <button onClick={() => onScrollTo(id)} className="text-blue-200/80 hover:text-white transition-colors">{children}</button>
    </li>
  );

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div className="lg:col-span-2">
            <button onClick={() => onScrollTo('top')} className="text-white mb-3">
              <Logo size="sm" />
            </button>
            <p className="text-blue-200/80 pr-10">
              A Miami, FL roofing contractor providing premium roof repair, replacement, and maintenance services for homes and businesses across South Florida.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <div className="space-y-2 text-blue-200/80">
              <p>1234 Biscayne Blvd<br />Miami, FL 33132</p>
              <p>
                Phone: <a href="tel:+13059287663" className="hover:text-white">(305) 928-7663</a><br/>
                Email: <a href="mailto:info@whitegloveroofing.com" className="hover:text-white">info@whitegloveroofing.com</a>
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <QuickLink id="services">Roofing Services</QuickLink>
              <QuickLink id="roof-types">Roof Types</QuickLink>
              <QuickLink id="gallery">Our Work</QuickLink>
              <QuickLink id="areas">Service Areas</QuickLink>
              <QuickLink id="testimonials">Customer Reviews</QuickLink>
              <li>
                <button onClick={() => onBlogClick?.()} className="text-blue-200/80 hover:text-white transition-colors">Blog</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-blue-200/20 flex flex-wrap justify-between items-center gap-4 text-xs text-blue-200/60">
          <span>© {year} White Glove Roofing. All rights reserved.</span>
          <span>Miami, FL • Licensed & Insured Roofing Contractor</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
