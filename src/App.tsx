/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import NexusAI from './components/NexusAI';
import RegistrationModal from './components/RegistrationModal';
import { Features, Projects, SubmitProject, About, Contact, Footer, Testimonials } from './components/Sections';
import { Project } from './types';
import { Header } from '@/components/ui/header-1';
import { HeroSection, LogosSection } from '@/components/ui/hero-1';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'NeuroFlux ViT',
    author: 'Dr. Aria Chen',
    category: 'CV',
    description: 'A sparse vision transformer that achieves SOTA on ImageNet-22k with 3× fewer parameters using dynamic token pruning.',
    stars: '2.4k',
    forks: '318',
    date: '2026-03-12',
    status: 'Active'
  },
  {
    id: '2',
    name: 'LinguaCore-8B',
    author: 'OpenMind Labs',
    category: 'NLP',
    description: 'An 8B parameter multilingual model supporting 112 languages, fine-tuned on scientific literature for domain-specific RAG.',
    stars: '1.9k',
    forks: '241',
    date: '2026-02-28',
    status: 'Active'
  }
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isNexusOpen, setIsNexusOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Custom Cursor State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Show popup after delay
    const timer = setTimeout(() => setShowPopup(true), 1500);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Smooth scroll global style
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addProject = (project: Project) => {
    setProjects([project, ...projects]);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-cyan-400 selection:text-black">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400/30 pointer-events-none z-[9999] hidden lg:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
      />

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
              
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                id="close-popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-cyan-400">
                  <Info className="w-6 h-6" />
                </div>
                <div className="space-y-2 text-left w-full">
                  <h2 className="text-xl font-bold text-white uppercase tracking-widest text-[10px]">Disclaimer Notice</h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    This Webpage is design for <span className="text-white font-bold">Only Demo Purpose</span>. No data is verified by authorized organization, there may have misleading information.
                  </p>
                </div>
                <div className="pt-4 w-full">
                  <div className="bg-gradient-to-r from-zinc-900 to-zinc-900 via-zinc-800 p-4 rounded-2xl text-left">
                    <p className="text-xs font-bold text-zinc-500 mb-1">Designed By</p>
                    <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Moinul Islam
                    </span>
                  </div>
                </div>
                <Button onClick={() => setShowPopup(false)} className="w-full bg-white text-zinc-950 font-bold h-12 mt-4 hover:bg-zinc-200" id="enter-platform">
                  Enter Platform
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Header 
        onOpenNexus={() => setIsNexusOpen(true)} 
        onOpenRegister={() => setIsRegisterOpen(true)} 
      />

      <main 
        onMouseEnter={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)}
      >
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />
        <LogosSection />
        <Features />
        <Projects projects={projects} />
        <Testimonials />
        <SubmitProject onProjectAdd={addProject} />
        <About />
        <Contact />
      </main>

      <Footer onOpenNexus={() => setIsNexusOpen(true)} />

      <NexusAI 
        isOpen={isNexusOpen} 
        onClose={() => setIsNexusOpen(false)} 
      />
      
      <RegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
      />
    </div>
  );
}
