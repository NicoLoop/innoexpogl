import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, Rocket, Globe, Shield, Terminal, Zap, Star, GitFork, 
  Mail, Facebook, Instagram, Twitter, Phone, ArrowUpRight,
  GraduationCap, Users, Trophy, Brain, Network, Lightbulb,
  Check, CircleCheck, ExternalLink, Loader2, Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project, Category } from '@/types';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { WordmarkIcon } from '@/components/ui/header-1';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Marquee } from '@/components/ui/3d-testimonials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/** HERO SECTION */
export function Hero({ onOpenNexus, onOpenRegister }: { onOpenNexus: () => void, onOpenRegister: () => void }) {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
        >
          <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Innovation Platform 2026</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-6xl md:text-8xl tracking-tight leading-[0.9] text-white"
        >
          Discover Your <br />
          Potential in <br />
          <span className="text-zinc-500 italic">Science</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed"
        >
          We help students explore, learn, and grow through mentorship, hands-on sessions, and real opportunities to showcase their ideas.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Button onClick={() => document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="px-8 h-14 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-all border-none">
            ✦ Show Us your Talent
          </Button>
          <Button onClick={onOpenNexus} size="lg" variant="outline" className="px-8 h-14 bg-zinc-900 text-white font-medium rounded-xl border border-white/5 hover:bg-zinc-800 transition-all flex items-center gap-2">
            <Bot className="w-5 h-5 text-zinc-400" />
            Talk to AI
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onOpenRegister}
          className="mt-16 group cursor-pointer inline-block z-20 relative"
        >
          <div className="bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 border border-cyan-400/30 rounded-2xl p-6 md:px-10 flex flex-col md:flex-row items-center gap-8 group-hover:border-cyan-400 transition-all shadow-[0_0_40px_rgba(34,211,238,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center text-3xl">🎟️</div>
              <div className="text-left">
                <h3 className="font-display font-bold text-lg text-white">Register Free — Open Access</h3>
                <p className="text-xs text-gray-500 mt-1">Join 12,000+ young innovators across the country</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-black px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 group-hover:scale-105 transition-all">
              Join the Network <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

/** FEATURES SECTION */
export function Features() {
  const cards = [
    { icon: <GraduationCap size={24} />, title: 'School Sessions', desc: 'Interactive science classes in local schools to spark curiosity.', color: 'cyan' },
    { icon: <Users size={24} />, title: 'Mentorship', desc: 'Guidance from experienced mentors to help students grow with direction.', color: 'indigo' },
    { icon: <Trophy size={24} />, title: 'Science Fairs', desc: 'Opportunities to showcase ideas through fairs and exhibitions.', color: 'green' },
    { icon: <Brain size={24} />, title: 'Quiz Training', desc: 'Practice sessions to build strong knowledge for competitions.', color: 'cyan' },
    { icon: <Network size={24} />, title: 'IoT Learning', desc: 'Hands-on experience with modern tech and real-world applications.', color: 'indigo' },
    { icon: <Lightbulb size={24} />, title: 'Innovation Workshops', desc: 'Build, experiment, and learn through practical projects.', color: 'green' },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-left block">Our Programs</span>
          <h2 className="mt-2 font-display font-black text-4xl md:text-5xl text-white tracking-tight text-left">Empowering Tomorrow.</h2>
          <p className="mt-4 text-zinc-500 max-w-lg font-medium leading-relaxed text-left">Comprehensive initiatives designed to foster scientific curiosity and technical excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <SpotlightCard 
              key={i}
              className="p-8 bg-zinc-950 border border-white/5 rounded-3xl group hover:border-white/20 transition-all shadow-lg"
              spotlightColor={card.color === 'cyan' ? 'rgba(34, 211, 238, 0.15)' : card.color === 'indigo' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(34, 197, 94, 0.15)'}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-zinc-400 mb-6",
                "bg-zinc-900 border border-white/5 group-hover:text-white transition-colors"
              )}>
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 text-left">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed text-left">{card.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/** PROJECTS SECTION */
export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left font-display">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Innovation Gallery</span>
            <h2 className="mt-2 font-black text-4xl md:text-5xl text-white tracking-tight">Featured Projects</h2>
          </div>
          <Button onClick={() => document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="px-5 py-2.5 bg-white/5 text-xs font-bold text-white uppercase rounded-xl border border-white/10 hover:border-white transition-all">
            + Submit your project
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <SpotlightCard 
              key={p.id}
              className="p-8 bg-zinc-950 border border-white/5 rounded-3xl flex flex-col group hover:border-white/20 transition-all h-full shadow-lg"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <div className="flex items-center justify-between mb-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase",
                  "bg-zinc-900 text-zinc-300 border border-white/5"
                )}>
                  {p.category}
                </span>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {p.status}
                </div>
              </div>
              
              <h3 className="font-display font-black text-xl text-white mb-2 text-left">{p.name}</h3>
              <p className="text-zinc-500 text-sm mb-8 flex-1 text-left">{p.description}</p>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                  <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px]">👤</div>
                  {p.author}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600">
                    <Star className="w-3 h-3" /> {p.stars}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600">
                    <GitFork className="w-3 h-3" /> {p.forks}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const highlights = [
  { id: 1, feature: "Mentorship from science experts" },
  { id: 2, feature: "National level project visibility" },
  { id: 3, feature: "Collaborate with talented peers" },
];

/** SUBMIT SECTION */
export function SubmitProject({ onProjectAdd }: { onProjectAdd: (p: Project) => void }) {
  const [formData, setFormData] = useState({ name: '', author: '', category: 'Science' as Category, description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      stars: '0',
      forks: '0',
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review'
    };
    
    onProjectAdd(newProject);
    setFormData({ name: '', author: '', category: 'Science', description: '' });
    setIsSubmitting(false);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="submit" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Innovation Lab</span>
            <h2 className="mt-2 font-display font-black text-4xl md:text-5xl text-white tracking-tight">Submit Your Project.</h2>
            <p className="mt-4 text-zinc-500 font-medium leading-relaxed max-w-2xl">
              Tell us about your breakthrough. We provide the mentorship and platform to scale your ideas into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-zinc-400">Lead Researcher Name</Label>
                      <Input 
                        id="author" 
                        required 
                        placeholder="e.g. Sayeid Mahmud" 
                        className="bg-zinc-900 border-white/10 text-white" 
                        value={formData.author}
                        onChange={e => setFormData({...formData, author: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-zinc-400">Innovation Category</Label>
                      <Select defaultValue="Science" onValueChange={(v) => setFormData({...formData, category: v as Category})}>
                        <SelectTrigger className="bg-zinc-900 border-white/10 text-white">
                          <SelectValue placeholder="Select Domain" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="IoT">Internet of Things</SelectItem>
                          <SelectItem value="AI">Artificial Intelligence</SelectItem>
                          <SelectItem value="Environment">Environmental Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-zinc-400">Project Title</Label>
                    <Input 
                      id="projectName" 
                      required 
                      placeholder="e.g. Solar Track Smart Irrigation System" 
                      className="bg-zinc-900 border-white/10 text-white"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="description" className="text-zinc-400">Detailed Abstract</Label>
                    <Textarea 
                      id="description" 
                      required 
                      rows={5} 
                      placeholder="Describe the problem your project solves and your methodology..." 
                      className="bg-zinc-900 border-white/10 text-white resize-none"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                 </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-zinc-900 border-white/5 rounded-3xl p-8 sticky top-32">
                 <h4 className="font-display font-bold text-lg text-white mb-4">Submission Benefits</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                   All accepted projects receive feedback from our national mentor panel and indexed in our discovery engine for 12 months.
                 </p>
                 <ul className="space-y-4 mb-8">
                   {highlights.map((h) => (
                     <li key={h.id} className="flex items-center gap-3 text-sm text-zinc-300">
                       <CircleCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                       {h.feature}
                     </li>
                   ))}
                 </ul>
                 <Separator className="bg-white/5 my-8" />
                 <div className="flex flex-col gap-3">
                   <Button disabled={isSubmitting} size="lg" className="w-full h-12 bg-white text-zinc-950 font-bold hover:bg-zinc-200">
                     {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> PROCESSING...</> : '✦ SUBMIT RESEARCH'}
                   </Button>
                   <Button variant="ghost" className="text-zinc-500 text-xs font-bold uppercase tracking-widest" onClick={() => setFormData({ name: '', author: '', category: 'Science', description: '' })}>
                     Discard Draft
                   </Button>
                 </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/** TESTIMONIALS SECTION */
const testimonials = [
  {
    name: 'Dr. Shahadat Hossain',
    username: 'BUET Professor',
    body: 'InnoExpoGL is doing a fantastic job bridging the gap between local secondary students and high-end technical mentorship.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    country: '🇧🇩 Bangladesh',
  },
  {
    name: 'Ayesha Siddiqa',
    username: 'Secondary Student',
    body: 'I never thought I could build an IoT device until I attended their school workshop. Now I am working on my second project!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇧🇩 Bangladesh',
  },
  {
    name: 'Faisal Ahmed',
    username: 'Regional Mentor',
    body: 'The curiosity in these young minds is limitless. InnoExpoGL provides them the right path to shine nationally.',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇧🇩 Bangladesh',
  },
  {
    name: 'Nusrat Jahan',
    username: 'Innovation Lead',
    body: 'A truly inspiring platform. The science fairs are organized with such professional depth, it truly empowers these students.',
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    country: '🇧🇩 Bangladesh',
  },
  {
    name: 'Kamrul Hasan',
    username: 'IoT Researcher',
    body: 'It’s more than just a website; it’s a movement to make science accessible for everyone in Bangladesh.',
    img: 'https://randomuser.me/api/portraits/men/33.jpg',
    country: '🇧🇩 Bangladesh',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-72 bg-zinc-900 border-white/5 p-6 hover:border-cyan-400/30 transition-all rounded-3xl">
      <CardContent className="p-0">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-white/10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {name} <span className="text-xs opacity-70">{country}</span>
            </div>
            <p className="text-xs font-medium text-zinc-500 tracking-tight">{username}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          <Quote className="w-4 h-4 text-cyan-400/40 rotate-180" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light italic text-left">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-left">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Feedback</span>
        <h2 className="mt-2 font-display font-black text-4xl md:text-5xl text-white tracking-tight">Community Voice.</h2>
      </div>

      <div className="flex flex-col gap-6 mask-fade-edges">
        <Marquee pauseOnHover className="[--duration:30s] gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:35s] gap-6">
          {testimonials.concat(testimonials).reverse().map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </Marquee>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
}

/** ABOUT SECTION */
export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left font-display">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Our Mission</span>
            <h2 className="mt-2 font-black text-4xl md:text-5xl text-white tracking-tight">Accelerating Science.</h2>
            <p className="mt-8 text-zinc-400 text-lg font-light leading-relaxed">
              InnoExpoGL was founded on the belief that transformative science education should be accessible, hands-on, and connected.
            </p>
            <p className="mt-4 text-zinc-500 font-medium leading-relaxed">
              We partner with local schools and experts to create a ground where curiosity turns into innovation.
            </p>
            <div className="mt-10 flex gap-4">
              <Button className="px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl text-sm border-none hover:bg-zinc-200 transition-all">Our Vision</Button>
              <Button variant="outline" className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl border border-white/5 text-sm hover:bg-zinc-800 transition-all">Meet the Team</Button>
            </div>
          </div>

          <SpotlightCard className="p-10 bg-zinc-950 border border-white/5 rounded-[40px] shadow-2xl relative z-10" spotlightColor="rgba(255,255,255,0.05)">
            <div className="flex items-center gap-2 text-zinc-400 mb-6 font-bold text-[10px] uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Network Status: Active
            </div>
            <div className="space-y-6 text-sm text-zinc-500 leading-relaxed font-light text-left">
              <p>We are establishing a network of science enthusiasts and mentors to ensure that scientific literacy and tech skills reach every corner of Bangladesh.</p>
              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-8 font-bold text-[10px] tracking-widest uppercase text-zinc-600">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500">Mentors</span>
                  <span className="text-white">Active</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500">Reach</span>
                  <span className="text-white">National</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

/** CONTACT SECTION */
export function Contact() {
  const contacts = [
    { icon: <Mail />, label: 'Email Connection', val: 'innoexpogl@gmail.com', desc: 'Secure research inquiries & partnerships' },
    { icon: <Facebook />, label: 'Social Hub', val: 'InnoExpoGL Official', desc: 'Follow for mission updates & highlights' },
    { icon: <Phone />, label: 'Direct Audio', val: '+880 1847725507', desc: 'Active Sun–Thu, 10am–6pm BST' },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 font-display">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Connect With Us</span>
          <h2 className="mt-2 font-black text-4xl md:text-5xl text-white tracking-tight leading-none leading-none">Get In Touch.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((c, i) => (
            <SpotlightCard 
              key={i} 
              className="p-8 bg-zinc-950 border border-white/5 rounded-[32px] hover:border-white/20 transition-all text-center md:text-left group shadow-lg"
              spotlightColor="rgba(21, 94, 117, 0.2)"
            >
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0">
                  {React.cloneElement(c.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                </div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{c.label}</div>
                <div className="font-bold text-lg text-white mb-2">{c.val}</div>
                <p className="text-xs text-zinc-600 font-medium">{c.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
                  Contact Us <ArrowUpRight size={14} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/** FOOTER SECTION */
export function Footer({ onOpenNexus }: { onOpenNexus: () => void }) {
  return (
    <footer className="py-16 border-t border-white/5 bg-[#030712] font-display">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-16 px-4">
          <div className="text-left">
            <div className="flex items-center gap-3">
              <WordmarkIcon className="h-10 w-auto text-white" />
              <span className="font-bold text-2xl text-white tracking-tight italic">Expo<span className="text-zinc-500 not-italic">GL</span></span>
            </div>
            <p className="mt-6 text-sm text-zinc-500 max-w-sm leading-relaxed font-light">
              Providing platform for science research, mentorship, and breakthrough project showcase.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 text-xs font-semibold text-zinc-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#projects" className="hover:text-white">Projects</a></li>
                <li><a href="#submit" className="hover:text-white">Submission</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenNexus(); }} className="hover:text-white">Chat with AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4 text-xs font-semibold text-zinc-400">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">X / Twitter</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-xs font-semibold text-zinc-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 px-4 text-[10px] text-zinc-600 font-medium tracking-tight">
          <div>© 2026 INNOEXPOGL. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
