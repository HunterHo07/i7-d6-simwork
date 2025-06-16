'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!hero || !title || !subtitle || !cta) return;

    // Initial animation on load
    const tl = gsap.timeline();
    
    tl.fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(cta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Parallax effect on scroll
    gsap.to(hero, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.layer1}></div>
        <div className={styles.layer2}></div>
        <div className={styles.layer3}></div>
      </div>
      
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}>
          The Future of Work
          <span className={styles.highlight}>Simulation</span>
        </h1>
        
        <p ref={subtitleRef} className={styles.heroSubtitle}>
          Step into a 2.5D open world where skills are proven through action, 
          not just words. Experience the revolutionary platform that's changing 
          how we hire, learn, and showcase talent.
        </p>
        
        <div ref={ctaRef} className={styles.heroCta}>
          <a href="/live-preview" className={styles.primaryBtn}>
            Enter SimWork World
          </a>
          <button className={styles.secondaryBtn}>
            Watch Demo
          </button>
        </div>
      </div>

      <div className={styles.heroDemo}>
        <div className={styles.miniWorld}>
          <div className={styles.building}></div>
          <div className={styles.character}></div>
          <div className={styles.questMarker}></div>
        </div>
      </div>
    </section>
  );
}
