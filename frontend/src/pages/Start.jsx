import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, Truck, BarChart2, Globe, Shield, Menu, X } from 'lucide-react';

const Start = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Truck size={32} className="text-green-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Brocomotive</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-green-400 transition-colors">Solutions</a>
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-green-400 transition-colors">Contact</a>
            <div className="flex items-center space-x-4 ml-8">
              <Link
                to="/login"
                className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-gray-900 transition-all text-center"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-gray-900 rounded-md hover:bg-green-600 transition-all text-center"
              >
                Sign Up
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 p-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="hover:text-green-400 transition-colors p-2" onClick={toggleMobileMenu}>Features</a>
              <a href="#solutions" className="hover:text-green-400 transition-colors p-2" onClick={toggleMobileMenu}>Solutions</a>
              <a href="#about" className="hover:text-green-400 transition-colors p-2" onClick={toggleMobileMenu}>About</a>
              <a href="#contact" className="hover:text-green-400 transition-colors p-2" onClick={toggleMobileMenu}>Contact</a>
              <div className="flex flex-col gap-3 w-full max-w-sm mx-auto mt-10">
                <a
                  href="/login"
                  className="w-full p-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-gray-900 transition-all text-center"
                >
                  Log In
                </a>

                <a
                  href="/signup"
                  className="w-full p-2 bg-green-500 text-gray-900 rounded-md hover:bg-green-600 transition-all text-center"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Revolutionizing <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Logistics</span> with Smart Technology</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Connect with trusted carriers, optimize routes, and reduce emissions with our AI-powered truck booking platform.</p>
          <div className="flex justify-center mt-10">
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-green-500 text-gray-900 rounded-md hover:bg-green-600 transition-all font-bold flex items-center justify-center"
                aria-label="Go to login"
              >
                Get Started <ArrowRight size={20} className="ml-2" />
              </Link>

              <Link
                to="/about"
                className="px-8 py-3 border border-gray-400 text-gray-100 rounded-md hover:bg-gray-700 transition-all flex items-center justify-center"
                aria-label="Learn more about us"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="mt-16 bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Book a Truck in Minutes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Pickup Location" 
                className="p-3 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none"
              />
              <input 
                type="text" 
                placeholder="Destination" 
                className="p-3 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none"
              />
              <Link
                to="/signup"
                className="p-3 bg-green-500 text-gray-900 rounded hover:bg-green-600 font-bold transition-all text-center"
              >
                Find Carriers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Solving <span className="text-green-500">Logistics Challenges</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-green-900/20 hover:translate-y-[-5px] transition-all">
              <div className="bg-green-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe size={28} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Transportation</h3>
              <p className="text-gray-400">Reduce carbon emissions with optimized routes and eco-friendly carrier options. Track and offset your carbon footprint.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-green-900/20 hover:translate-y-[-5px] transition-all">
              <div className="bg-green-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BarChart2 size={28} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Efficient Operations</h3>
              <p className="text-gray-400">AI-powered route optimization, real-time tracking, and smart inventory management to reduce costs and delays.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-green-900/20 hover:translate-y-[-5px] transition-all">
              <div className="bg-green-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield size={28} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Resilient Supply Chain</h3>
              <p className="text-gray-400">Built-in contingency planning and risk assessment to adapt to disruptions and ensure business continuity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How Brocomotive Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Register</h3>
              <p className="text-gray-400">Create your account in minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Book</h3>
              <p className="text-gray-400">Find and book the right carrier</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Track</h3>
              <p className="text-gray-400">Monitor your shipment in real-time</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Complete</h3>
              <p className="text-gray-400">Delivery confirmation and feedback</p>
            </div>
          </div>
          <div className="mt-16 text-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-green-500 text-gray-900 rounded-md hover:bg-green-600 transition-all font-bold inline-flex items-center"
          >
            Get Started Now <ArrowRight size={20} className="ml-2" />
          </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Logistics?</h2>
            <p className="text-gray-300 mb-8">Join thousands of businesses already optimizing their supply chain with Brocomotive.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-green-500 text-gray-900 rounded-md hover:bg-green-600 transition-all font-bold text-center"
            >
              Sign Up Free
            </Link>
            <Link
              to="/home"
              className="px-8 py-3 border border-gray-400 text-gray-100 rounded-md hover:bg-gray-700 transition-all text-center"
            >
              Schedule Demo
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Truck size={32} className="text-green-500" />
            <span className="ml-2 text-xl font-bold">Brocomotive</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">For Shippers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">For Carriers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">For 3PLs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Brocomotive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Start;