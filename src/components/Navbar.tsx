import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-glow animate-glow' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-gradient cursor-pointer">
            ayasya's portfolio
          </h1>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                {item}
              </a>
            ))}

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-pink-500/20"
            >
              {isDark ? (
                <Sun className="text-pink-400" />
              ) : (
                <Moon className="text-pink-400" />
              )}
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex gap-2">
            <button onClick={toggleTheme}>
              {isDark ? <Sun /> : <Moon />}
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden navbar-glow"
          >
            <div className="p-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-pink-500"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}