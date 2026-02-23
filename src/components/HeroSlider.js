import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&auto=format&fit=crop',
    tagline: 'New Collection 2024',
    title: 'STEP INTO',
    subtitle: 'THE CIRCLE.',
    description: 'Experience the pinnacle of footwear craftsmanship. Minimalist design meets uncompromising comfort.',
    cta: 'Shop Sneakers',
    link: '/category/sneakers',
    overlay: 'dark'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80&auto=format&fit=crop',
    tagline: 'Just Dropped',
    title: 'NEW ARRIVALS',
    subtitle: '2024 COLLECTION.',
    description: 'Discover premium streetwear and timeless essentials. Curated for the modern lifestyle.',
    cta: 'Explore Now',
    link: '/',
    overlay: 'dark'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1920&auto=format&fit=crop',
    tagline: 'Curated Picks',
    title: 'PREMIUM',
    subtitle: 'ESSENTIALS.',
    description: 'Handpicked pieces that represent the intersection of luxury and street culture.',
    cta: 'Shop Collection',
    link: '/category/tshirt',
    overlay: 'light'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&auto=format&fit=crop',
    tagline: 'Women',
    title: 'TIMELESS',
    subtitle: 'ELEGANCE.',
    description: 'Curated pieces for the bold and sophisticated. Explore the latest in feminine fashion.',
    cta: 'Ladies Collection',
    link: '/category/ladies-tshirt',
    overlay: 'light'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1920&auto=format&fit=crop',
    tagline: 'Trusted Quality',
    title: '100%',
    subtitle: 'AUTHENTIC.',
    description: 'Trusted quality. Every product verified. Shop with confidence.',
    cta: 'Our Story',
    link: '/about',
    overlay: 'dark'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];
  const isDarkOverlay = currentSlide.overlay === 'dark';

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] overflow-hidden bg-slate-dark">
      {/* Image Slider */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -100 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.image}
            alt={`${currentSlide.title} ${currentSlide.subtitle}`}
            className="w-full h-full object-cover object-center min-h-full min-w-full"
          />
          {/* Gradient Overlay - stronger for text readability */}
          <div
            className={`absolute inset-0 ${
              isDarkOverlay
                ? 'bg-gradient-to-r from-slate-dark/95 via-slate-dark/70 to-slate-dark/25'
                : 'bg-gradient-to-r from-white/95 via-white/75 to-white/30'
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto pl-16 pr-4 sm:pl-6 sm:pr-6 lg:px-8 h-full min-h-[85vh] sm:min-h-[90vh] flex items-center">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <span
                className={`inline-block font-bold tracking-[0.2em] text-xs sm:text-[10px] uppercase ${
                  isDarkOverlay ? 'text-white/80' : 'text-slate-dark/60'
                }`}
              >
                {currentSlide.tagline}
              </span>
              <h1
                className={`text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tighter ${
                  isDarkOverlay ? 'text-white' : 'text-slate-dark'
                }`}
              >
                {currentSlide.title}
                <br />
                <span className={isDarkOverlay ? 'text-white/90' : 'text-slate-dark/90'}>
                  {currentSlide.subtitle}
                </span>
              </h1>
              <p
                className={`text-base sm:text-sm md:text-base max-w-md leading-relaxed font-medium ${
                  isDarkOverlay ? 'text-white/80' : 'text-slate-dark/70'
                }`}
              >
                {currentSlide.description}
              </p>
              <div className="pt-2">
                <Link
                  to={currentSlide.link}
                  className={`inline-block px-8 py-4 text-sm sm:px-6 sm:py-3 sm:text-xs rounded-full font-bold uppercase tracking-widest transition-all duration-500 transform hover:-translate-y-0.5 ${
                    isDarkOverlay
                      ? 'bg-white text-slate-dark hover:bg-slate-dark hover:text-white border-2 border-white'
                      : 'bg-slate-dark text-white hover:bg-white hover:text-slate-dark border-2 border-slate-dark'
                  }`}
                >
                  {currentSlide.cta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm sm:text-base group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm sm:text-base group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSlider;
