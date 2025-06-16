'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "The Problem",
      subtitle: "Hiring is Broken",
      content: [
        "70% of hiring managers say interviews don't reflect real work",
        "Fake resumes and no proof of actual skills",
        "Slow, expensive hiring processes waste time and money",
        "Talented freelancers have no way to showcase real abilities"
      ],
      visual: "📊",
      bgColor: "#ff6b6b"
    },
    {
      title: "The Solution",
      subtitle: "SimWork: Real Skills, Real World",
      content: [
        "2.5D open world office simulation",
        "Real tools embedded: IDE, design software, project management",
        "AI-generated quests matching actual job requirements",
        "Live skill assessment and freelancer discovery"
      ],
      visual: "🎮",
      bgColor: "#4ecdc4"
    },
    {
      title: "Market Opportunity",
      subtitle: "$280B Global Hiring Market",
      content: [
        "HR Tech market growing 10% annually",
        "Remote work increased demand for skill verification",
        "Gamification market: $30B by 2026",
        "Freelancer economy: 1.27B people worldwide"
      ],
      visual: "📈",
      bgColor: "#45b7d1"
    },
    {
      title: "Product Demo",
      subtitle: "Experience SimWork",
      content: [
        "Navigate our 2.5D office world",
        "Complete real coding challenges",
        "Design actual UI/UX projects",
        "Manage project workflows"
      ],
      visual: "🚀",
      bgColor: "#96ceb4",
      isDemo: true
    },
    {
      title: "Business Model",
      subtitle: "Multiple Revenue Streams",
      content: [
        "Freemium: Basic access free, premium features paid",
        "Enterprise: Custom simulations for companies",
        "Marketplace: Commission on freelancer connections",
        "Certification: Verified skill badges and certificates"
      ],
      visual: "💰",
      bgColor: "#feca57"
    },
    {
      title: "Competitive Advantage",
      subtitle: "Why We Win",
      content: [
        "Only platform combining gaming + real work tools",
        "Immersive 3D environment vs static tests",
        "Real-time collaboration and networking",
        "AI-powered personalized learning paths"
      ],
      visual: "🏆",
      bgColor: "#ff9ff3"
    },
    {
      title: "Traction & Metrics",
      subtitle: "Early Success",
      content: [
        "500+ beta users in first month",
        "85% completion rate on quests",
        "Average session time: 45 minutes",
        "12 enterprise partnerships in pipeline"
      ],
      visual: "📊",
      bgColor: "#54a0ff"
    },
    {
      title: "The Ask",
      subtitle: "Join the Future of Work",
      content: [
        "Seeking $2M seed funding",
        "Scale to 10,000+ users",
        "Expand to mobile and VR",
        "Build enterprise partnerships"
      ],
      visual: "🤝",
      bgColor: "#5f27cd",
      isFinal: true
    }
  ];

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.fromTo(slide.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: slide,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <main className={styles.pitchDeck}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/">SimWork</a>
        </div>
        <div className={styles.slideCounter}>
          {currentSlide + 1} / {slides.length}
        </div>
        <div className={styles.navButtons}>
          <a href="/live-preview" className={styles.demoBtn}>Live Demo</a>
          <a href="/sign-up" className={styles.signUpBtn}>Get Started</a>
        </div>
      </nav>

      {/* Slide Container */}
      <div 
        ref={containerRef}
        className={styles.slideContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={el => slideRefs.current[index] = el}
            className={styles.slide}
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className={styles.slideContent}>
              <div className={styles.slideVisual}>
                <span className={styles.emoji}>{slide.visual}</span>
              </div>
              
              <div className={styles.slideText}>
                <h1 className={styles.slideTitle}>{slide.title}</h1>
                <h2 className={styles.slideSubtitle}>{slide.subtitle}</h2>
                
                <ul className={styles.slideList}>
                  {slide.content.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.slideItem}>
                      {item}
                    </li>
                  ))}
                </ul>

                {slide.isDemo && (
                  <div className={styles.demoSection}>
                    <a href="/live-preview" className={styles.demoButton}>
                      🎮 Try Interactive Demo
                    </a>
                  </div>
                )}

                {slide.isFinal && (
                  <div className={styles.finalSection}>
                    <a href="/sign-up" className={styles.finalButton}>
                      🚀 Join SimWork
                    </a>
                    <p className={styles.contact}>
                      Contact: <a href="mailto:hunterho.my@gmail.com">hunterho.my@gmail.com</a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={styles.controlBtn}
        >
          ← Previous
        </button>
        
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={styles.controlBtn}
        >
          Next →
        </button>
      </div>

      {/* Keyboard Navigation */}
      <div className={styles.keyboardHint}>
        Use ← → arrow keys to navigate
      </div>
    </main>
  );
}
