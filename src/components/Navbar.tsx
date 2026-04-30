import { useEffect, useState } from 'react';
import { Bot, Menu, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenNexus: () => void;
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenNexus, onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
        isScrolled 
          ? "bg-[#030712]/90 backdrop-blur-md border-cyan-500/10 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            <span className="text-black font-bold text-lg leading-none">⬡</span>
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white">
            Inno<span className="text-cyan-400 font-extrabold group-hover:text-cyan-300 transition-colors">ExpoGL</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Projects', 'Submit', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onOpenNexus}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 border border-white/10 px-4 py-2 rounded-lg hover:border-cyan-500 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            EXPOGL AI
          </button>
          <button 
            onClick={onOpenRegister}
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-black text-xs font-bold px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-0.5 transition-all"
          >
            REGISTER
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-gray-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-[#0f172a] border-b border-cyan-500/10 overflow-hidden transition-all duration-300",
        isMobileMenuOpen ? "max-height-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="px-6 space-y-4">
          {['Features', 'Projects', 'Submit', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-400 hover:text-cyan-400"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => { onOpenNexus(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-400 border border-white/10 py-3 rounded-lg"
            >
              <Bot className="w-4 h-4" />
              EXPOGL AI
            </button>
            <button 
              onClick={() => { onOpenRegister(); setIsMobileMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-black py-3 rounded-lg font-bold"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
