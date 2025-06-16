'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" }
      );
    }

    // Section animations
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const advantages = [
    {
      icon: "🎮",
      title: "Only True Gamified Work Platform",
      description: "We're the first to combine real work tools with immersive 3D gaming environments. Not just tests - actual work simulation.",
      stats: "90% higher engagement than traditional platforms"
    },
    {
      icon: "🛠️",
      title: "Real Tools, Real Skills",
      description: "Embedded VS Code, design software, and project management tools. Candidates prove skills with actual work, not theoretical questions.",
      stats: "85% accuracy in skill assessment vs 45% for traditional interviews"
    },
    {
      icon: "🌍",
      title: "Open World Networking",
      description: "The only platform where professionals can naturally discover each other, collaborate, and build relationships in a virtual workspace.",
      stats: "3x more meaningful connections than LinkedIn"
    },
    {
      icon: "🤖",
      title: "AI-Powered Personalization",
      description: "Our AI generates custom quests, adapts difficulty, and creates personalized learning paths based on real performance data.",
      stats: "70% faster skill development"
    }
  ];

  const comparisons = [
    {
      feature: "Real Work Simulation",
      us: "✅ Full 3D office with real tools",
      competitors: "❌ Static coding tests only"
    },
    {
      feature: "Social Networking",
      us: "✅ Natural in-world interactions",
      competitors: "❌ Basic profile browsing"
    },
    {
      feature: "Skill Verification",
      us: "✅ Live work demonstration",
      competitors: "❌ Multiple choice questions"
    },
    {
      feature: "Learning Experience",
      us: "✅ Immersive gamified quests",
      competitors: "❌ Boring video tutorials"
    },
    {
      feature: "Freelancer Discovery",
      us: "✅ Real-time skill showcase",
      competitors: "❌ Resume-based matching"
    }
  ];

  const team = [
    {
      name: "Hunter Ho",
      role: "Founder & CEO",
      bio: "Full-stack developer with 5+ years experience building immersive web applications. Previously led development teams at tech startups.",
      avatar: "👨‍💻",
      links: {
        github: "https://github.com/HunterHo07",
        portfolio: "https://hunterho07.github.io/Portfolio_1/"
      }
    }
  ];

  return (
    <main className={styles.whyUs}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/">SimWork</a>
        </div>
        <div className={styles.navLinks}>
          <a href="/live-preview">Demo</a>
          <a href="/pitch-deck">Pitch</a>
          <a href="/roadmap">Roadmap</a>
          <a href="/sign-up" className={styles.ctaBtn}>Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Why SimWork Will Win</h1>
          <p>We're not just another hiring platform. We're revolutionizing how the world discovers, develops, and deploys talent through immersive technology.</p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>500+</strong>
              <span>Beta Users</span>
            </div>
            <div className={styles.stat}>
              <strong>85%</strong>
              <span>Quest Completion</span>
            </div>
            <div className={styles.stat}>
              <strong>45min</strong>
              <span>Avg Session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section ref={el => sectionsRef.current[0] = el} className={styles.advantages}>
        <div className={styles.container}>
          <h2>Our Competitive Advantages</h2>
          <div className={styles.advantagesGrid}>
            {advantages.map((advantage, index) => (
              <div key={index} className={styles.advantageCard}>
                <div className={styles.advantageIcon}>{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
                <div className={styles.advantageStat}>{advantage.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={el => sectionsRef.current[1] = el} className={styles.comparison}>
        <div className={styles.container}>
          <h2>SimWork vs Traditional Platforms</h2>
          <div className={styles.comparisonTable}>
            <div className={styles.tableHeader}>
              <div>Feature</div>
              <div>SimWork</div>
              <div>Competitors</div>
            </div>
            {comparisons.map((comp, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.feature}>{comp.feature}</div>
                <div className={styles.us}>{comp.us}</div>
                <div className={styles.competitors}>{comp.competitors}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={el => sectionsRef.current[2] = el} className={styles.team}>
        <div className={styles.container}>
          <h2>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.avatar}>{member.avatar}</div>
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
                <div className={styles.teamLinks}>
                  <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href={member.links.portfolio} target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={el => sectionsRef.current[3] = el} className={styles.vision}>
        <div className={styles.container}>
          <h2>Our Vision</h2>
          <div className={styles.visionContent}>
            <div className={styles.visionText}>
              <h3>Transforming Global Talent Discovery</h3>
              <p>
                We envision a world where talent is discovered through action, not assumptions. 
                Where skills are proven in realistic environments, not theoretical tests. 
                Where professionals can showcase their abilities in immersive, collaborative spaces.
              </p>
              <p>
                SimWork is building the infrastructure for the future of work - a place where 
                remote collaboration feels natural, where learning is engaging, and where 
                the best talent rises to the top through demonstrated excellence.
              </p>
              <div className={styles.visionCta}>
                <a href="/live-preview" className={styles.demoBtn}>Experience Our Vision</a>
                <a href="/sign-up" className={styles.joinBtn}>Join the Revolution</a>
              </div>
            </div>
            <div className={styles.visionVisual}>
              <div className={styles.futureWorld}>
                <div className={styles.building}>🏢</div>
                <div className={styles.people}>👥</div>
                <div className={styles.connections}>🔗</div>
                <div className={styles.growth}>📈</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>SimWork</h4>
              <p>The future of work simulation</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Product</h4>
              <a href="/live-preview">Live Demo</a>
              <a href="/pitch-deck">Pitch Deck</a>
              <a href="/roadmap">Roadmap</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Company</h4>
              <a href="/why-us">Why Us</a>
              <a href="/sign-up">Get Started</a>
              <a href="mailto:hunterho.my@gmail.com">Contact</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 SimWork. All rights reserved.</p>
            <p>Built with ❤️ for the future of work</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
