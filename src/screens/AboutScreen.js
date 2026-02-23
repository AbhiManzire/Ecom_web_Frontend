import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaLightbulb, FaHeart, FaTshirt, FaRocket, FaUsers } from 'react-icons/fa';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const AboutScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1539109132314-34a9c6689711?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Meta title="About Us - YOUTH CIRCLE" />

      {/* Editorial Header Section */}
      <div className="relative pt-12 pb-24 bg-white overflow-hidden border-b border-slate-dark/5">
        {/* Background Decorative Watermark */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.07] select-none pointer-events-none overflow-hidden">
          <h2 className="text-[100px] sm:text-[160px] md:text-[200px] lg:text-[250px] font-black text-slate-dark tracking-tighter leading-none italic">MISSION</h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark"></div>
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">Evolving Style</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-dark leading-[0.85] tracking-tighter uppercase">
              DEFINING <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #30364F' }}>YOUTH.</span>
            </h1>
            <p className="text-xl text-slate-dark/60 font-medium max-w-lg leading-relaxed">
              YOUTH CIRCLE is more than a boutique; it's a movement towards intentional style and uncompromised quality for the modern pioneer.
            </p>
          </div>

          <div className="hidden lg:block relative group">
            <div className="absolute inset-0 bg-slate-dark/5 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 scale-95"></div>
            <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-dark/5 aspect-[4/5] p-6">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-dark/5">
                {slides.map((url, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                  >
                    <img
                      src={url}
                      alt={`Fashion Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-dark/80 to-transparent"></div>
                  </div>
                ))}

                <div className="absolute inset-x-8 bottom-8 z-20 flex justify-between items-end">
                  <div className="space-y-1 text-left">
                    <p className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">Est. 2024</p>
                    <p className="font-black text-2xl uppercase tracking-tighter text-white">Premium Collection</p>
                  </div>
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-6' : 'bg-white/20'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-slate-dark uppercase tracking-tighter">The Genesis</h2>
                <div className="w-20 h-[4px] bg-slate-dark"></div>
              </div>
              <div className="space-y-8 text-xl font-medium text-slate-dark/70 leading-relaxed italic">
                <p>
                  "YOUTH CIRCLE was born from a singular vision: to bridge the gap between high-fashion editorial aesthetics and accessible premium quality."
                </p>
                <p className="not-italic text-base text-slate-dark/60">
                  Every thread we weave and every silhouette we curate is a testament to our commitment to excellence. We don't just sell clothes; we architect confidence for the modern professional.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-off-white-warm p-10 rounded-3xl border border-slate-dark/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-14 h-14 bg-slate-dark text-white flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FaRocket size={20} />
                </div>
                <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-4">Innovation</h3>
                <p className="text-[13px] text-slate-dark/50 leading-relaxed font-bold">Continuously evolving designs for the contemporary silhouette.</p>
              </div>
              <div className="bg-slate-dark p-10 rounded-3xl text-white shadow-2xl -translate-y-4 group">
                <div className="w-14 h-14 bg-white/10 text-white flex items-center justify-center rounded-2xl mb-6 group-hover:bg-white group-hover:text-slate-dark transition-all duration-500">
                  <FaShieldAlt size={20} />
                </div>
                <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-4 opacity-100">Integrity</h3>
                <p className="text-[13px] text-white/40 leading-relaxed font-bold group-hover:text-white/60 transition-colors">Obsessive quality control from textile selection to final stitch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Essential Values Section */}
      <div className="bg-[#FAF9F6] py-24 border-y border-slate-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <span className="text-[10px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Core Philosophy</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-dark tracking-tighter uppercase">THE THREE PILLARS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <FaShieldAlt />, title: "Quality First", desc: "No compromises. Every piece is precision-crafted to withstand the test of time and trend." },
              { icon: <FaLightbulb />, title: "Visionary Design", desc: "Staying ahead of the curve with avant-garde silhouettes and timeless essentials." },
              { icon: <FaHeart />, title: "Human Centric", desc: "Your experience is our priority. Exclusive support from discovery to unboxing." }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                <div className="w-20 h-20 bg-white border border-slate-dark/5 flex items-center justify-center rounded-[2.5rem] shadow-sm group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 transition-all duration-500">
                  <div className="text-2xl text-slate-dark transition-transform duration-500 group-hover:scale-125">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-dark uppercase tracking-widest">{value.title}</h3>
                <p className="text-sm text-slate-dark/50 leading-relaxed font-medium max-w-[280px]">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-slate-dark/20"></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">The Architects</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
                Leadership <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #30364F' }}>Collective.</span>
              </h2>
            </div>
            <div className="flex items-center gap-6 pb-2">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-dark/5 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-slate-dark/10"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-[12px] text-slate-dark uppercase tracking-wider">Circle of 12</span>
                <span className="text-[10px] font-bold text-slate-dark/30 uppercase tracking-[0.2em]">Founding Partners</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Alex Johnson", role: "FOUNDER & CEO", desc: "Redefining the boundaries of retail through intentional leadership and architectural vision.", number: "01" },
              { name: "Sarah Chen", role: "HEAD OF DESIGN", desc: "Translating global trends into timeless urban silhouettes for the modern pioneer.", number: "02" },
              { name: "Mike Rodriguez", role: "TECH LEAD", desc: "Architecting a seamless digital bridge between luxury fashion and global commerce.", number: "03" }
            ].map((member, i) => (
              <div key={i} className="group relative">
                <div className="absolute -top-10 -left-4 text-8xl font-black text-slate-dark/5 group-hover:text-slate-dark/10 transition-colors duration-700 pointer-events-none">
                  {member.number}
                </div>
                <div className="relative z-10 p-10 bg-[#FAF9F6] rounded-[2.5rem] border border-slate-dark/5 group-hover:bg-slate-dark group-hover:shadow-[0_40px_80px_-20px_rgba(48,54,79,0.25)] transition-all duration-700 group-hover:-translate-y-4">
                  <div className="w-16 h-16 bg-white rounded-2xl mb-10 flex items-center justify-center shadow-sm group-hover:bg-white/10 group-hover:rotate-[15deg] transition-all duration-700">
                    <div className="w-3 h-3 rounded-full bg-slate-dark group-hover:bg-white transition-colors"></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-dark group-hover:text-white uppercase tracking-tighter mb-3 transition-colors duration-500">{member.name}</h3>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-[1px] bg-slate-dark/20 group-hover:bg-white/20"></div>
                    <p className="text-[10px] font-black text-slate-dark/40 group-hover:text-white/40 tracking-[0.3em] transition-colors duration-500">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-dark/60 group-hover:text-white/70 leading-relaxed font-bold transition-colors duration-500">
                    {member.desc}
                  </p>

                  <div className="mt-10 pt-8 border-t border-slate-dark/5 group-hover:border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">View Portfolio</span>
                    <div className="w-8 h-8 rounded-full bg-white text-slate-dark flex items-center justify-center text-xs">→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-slate-dark rounded-[3rem] p-16 md:p-24 overflow-hidden text-center group shadow-[0_50px_100px_-20px_rgba(48,54,79,0.3)]">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-dark via-slate-dark/90 to-blue-grey-muted opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              READY TO ENTER<br />
              <span>THE CIRCLE?</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">
              Join our exclusive collective and redefine your personal style with pieces designed for the future.
            </p>
            <div className="pt-6">
              <Link
                to="/"
                className="inline-flex items-center px-12 py-6 bg-white text-slate-dark rounded-full font-black uppercase text-xs tracking-[0.4em] shadow-2xl hover:scale-110 hover:shadow-white/10 transition-all duration-500"
              >
                Enter Store
              </Link>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 translate-y-1/2 -translate-x-1/2 rounded-full blur-2xl"></div>
        </div>
      </div>
    </>
  );
};

export default AboutScreen;
