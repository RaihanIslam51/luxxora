import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentProfiling, setConsentProfiling] = useState(false);

  return (
    <footer className="bg-white text-black font-sans text-sm mt-16 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="uppercase font-bold tracking-widest text-base mb-2">Join the Luxxora Community</h3>
          <p className="text-neutral-600">
            Enjoy <b className="text-black">10% off</b> your first order.<br />
            Stay updated with new arrivals & events.
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-neutral-300 bg-white text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex flex-wrap gap-2">
              {["Womenswear", "Menswear", "Kids"].map((label, i) => (
                <button key={i} type="button" className="bg-white text-black border border-black px-4 py-2 rounded font-medium text-xs uppercase hover:bg-neutral-100 hover:shadow transition">{label}</button>
              ))}
            </div>
            <label className="flex items-start gap-2 text-xs text-neutral-600">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={e => setConsentMarketing(e.target.checked)}
                className="mt-1 accent-black"
              />
              <span>
                *I agree to the <a href="#" className="underline hover:text-black hover:border-b border-black">Privacy Policy</a> and marketing use
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-neutral-600">
              <input
                type="checkbox"
                checked={consentProfiling}
                onChange={e => setConsentProfiling(e.target.checked)}
                className="mt-1 accent-black"
              />
              <span>I consent to data profiling for personalization</span>
            </label>
          </form>
        </div>

        {/* Help + Legal + Info */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Help */}
          <div>
            <h4 className="uppercase font-bold tracking-widest text-xs mb-4">Help</h4>
            <ul className="space-y-2 text-neutral-600">
              {["Customer Care", "Shipping & Delivery", "Returns & Refunds", "Contact Us", "Order Tracking", "Store Locator"].map((item, i) => (
                <li key={i}><a href="#" className="hover:text-black hover:border-b border-black transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="uppercase font-bold tracking-widest text-xs mb-4">Legal Area</h4>
            <ul className="space-y-2 text-neutral-600">
              {["Terms and Conditions", "Privacy Policy", "Cookie Policy", "Accessibility", "Sitemap"].map((item, i) => (
                <li key={i}><a href="#" className="hover:text-black hover:border-b border-black transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="uppercase font-bold tracking-widest text-xs mb-4">Info</h4>
            <ul className="space-y-2 text-neutral-600">
              <li><span className="font-semibold text-neutral-900">Country:</span> Bangladesh</li>
              <li><span className="font-semibold text-neutral-900">Language:</span> English</li>
              <li className="mt-4">
                <span className="font-semibold text-neutral-900">Follow us on:</span>
                <div className="flex gap-4 mt-2 text-xl">
                  {/* Replace # with actual links */}
                  {["Instagram", "Facebook", "Twitter", "YouTube"].map((label, i) => (
                    <a key={i} href="#" aria-label={label} className="hover:text-neutral-800 transition">
                      <i className={`ri-${label.toLowerCase()}-fill`} />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="border-t border-neutral-200 py-6 text-neutral-500 text-xs text-center space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:items-center max-w-7xl mx-auto px-4 sm:px-6">
        <div>© 2025 Luxxora</div>
        <div>Licensee: Progetto 17 S.r.l, Piazza Arcole, Dhaka, Bangladesh</div>
        <div>Managed by The Level S.r.l</div>
      </div>
    </footer>
  );
};

export default Footer;
