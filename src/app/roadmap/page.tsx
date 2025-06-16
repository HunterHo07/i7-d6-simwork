'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<(HTMLDivElement | null)[]>([]);

  const phases = [
    {
      phase: "Phase 1",
      title: "MVP Launch",
      timeline: "Q1 2024 - CURRENT",
      status: "In Progress",
      progress: 75,
      features: [
        "✅ 2.5D Open World Navigation",
        "✅ Basic Office Buildings & Zones",
        "✅ Player Character System",
        "✅ Interactive 3D World Demo",
        "🔄 Embedded VS Code Integration",
        "🔄 Quest System Foundation",
        "📋 User Profiles & Authentication",
        "📋 Basic Freelancer Discovery"
      ],
      goals: [
        "500+ active beta users",
        "Core 3D world fully functional",
        "Basic skill assessment working",
        "User feedback integration"
      ],
      investment: "$50K Bootstrap",
      team: "1 Developer"
    },
    {
      phase: "Phase 2", 
      title: "Platform Expansion",
      timeline: "Q2-Q3 2024",
      status: "Planned",
      progress: 0,
      features: [
        "🎨 Advanced Design Studio Tools",
        "📊 Project Management Workstation",
        "🤖 AI Quest Generation System",
        "👥 Real-time Multiplayer Interactions",
        "🏆 Achievement & Badge System",
        "📱 Mobile App (React Native)",
        "🔗 API for Third-party Integrations"
      ],
      goals: [
        "5,000+ registered users",
        "10+ enterprise pilot programs",
        "Mobile app launch",
        "Revenue generation start"
      ],
      investment: "$500K Seed Round",
      team: "3-5 Developers"
    },
    {
      phase: "Phase 3",
      title: "Enterprise & Scale",
      timeline: "Q4 2024 - Q1 2025", 
      status: "Future",
      progress: 0,
      features: [
        "🏢 Custom Company Workspaces",
        "📈 Advanced Analytics Dashboard",
        "🔐 Enterprise Security & Compliance",
        "🌐 Multi-language Support",
        "🎯 Advanced AI Skill Matching",
        "💼 Job Board Integration",
        "🎓 Certification Programs"
      ],
      goals: [
        "25,000+ active users",
        "100+ enterprise customers",
        "International expansion",
        "Break-even point reached"
      ],
      investment: "$2M Series A",
      team: "10-15 Team Members"
    },
    {
      phase: "Phase 4",
      title: "Future Innovation",
      timeline: "2025+",
      status: "Vision",
      progress: 0,
      features: [
        "🥽 VR/AR Office Environments",
        "🧠 Advanced AI Coaching",
        "🌍 Global Talent Marketplace",
        "🤝 Team Formation AI",
        "📚 University Partnerships",
        "🚀 Startup Incubator Integration",
        "🔮 Predictive Career Pathing"
      ],
      goals: [
        "1M+ global users",
        "Market leader position",
        "IPO consideration",
        "Industry standard platform"
      ],
      investment: "$10M+ Series B",
      team: "50+ Global Team"
    }
  ];

  useEffect(() => {
    // Animate timeline on scroll
    phasesRef.current.forEach((phase, index) => {
      if (phase) {
        gsap.fromTo(phase,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: phase,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              onEnter: () => setActivePhase(index)
            }
          }
        );
      }
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return '#00d4ff';
      case 'Planned': return '#feca57';
      case 'Future': return '#ff6b6b';
      case 'Vision': return '#a55eea';
      default: return '#666';
    }
  };

  return (
    <main className={styles.roadmap}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/">SimWork</a>
        </div>
        <div className={styles.navLinks}>
          <a href="/live-preview">Demo</a>
          <a href="/pitch-deck">Pitch</a>
          <a href="/why-us">Why Us</a>
          <a href="/sign-up" className={styles.ctaBtn}>Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SimWork Roadmap</h1>
          <p>Our journey to revolutionize the future of work, one milestone at a time</p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>4</strong>
              <span>Development Phases</span>
            </div>
            <div className={styles.stat}>
              <strong>2024-2025</strong>
              <span>Timeline</span>
            </div>
            <div className={styles.stat}>
              <strong>$12M+</strong>
              <span>Total Investment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className={styles.container}>
          <div className={styles.timelineHeader}>
            <h2>Development Timeline</h2>
            <p>From MVP to global platform - here's how we're building the future</p>
          </div>

          <div ref={timelineRef} className={styles.timelineContainer}>
            <div className={styles.timelineLine}></div>
            
            {phases.map((phase, index) => (
              <div
                key={index}
                ref={el => phasesRef.current[index] = el}
                className={`${styles.phaseCard} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.phaseMarker} style={{ backgroundColor: getStatusColor(phase.status) }}>
                  {index + 1}
                </div>
                
                <div className={styles.phaseContent}>
                  <div className={styles.phaseHeader}>
                    <div className={styles.phaseTitle}>
                      <h3>{phase.phase}: {phase.title}</h3>
                      <span className={styles.phaseTimeline}>{phase.timeline}</span>
                    </div>
                    <div className={styles.phaseStatus} style={{ color: getStatusColor(phase.status) }}>
                      {phase.status}
                    </div>
                  </div>

                  {phase.progress > 0 && (
                    <div className={styles.progressSection}>
                      <div className={styles.progressLabel}>Progress: {phase.progress}%</div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ 
                            width: `${phase.progress}%`,
                            backgroundColor: getStatusColor(phase.status)
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className={styles.phaseSection}>
                    <h4>🚀 Key Features</h4>
                    <ul className={styles.featureList}>
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className={styles.feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.phaseSection}>
                    <h4>🎯 Goals</h4>
                    <ul className={styles.goalList}>
                      {phase.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className={styles.goal}>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.phaseFooter}>
                    <div className={styles.investment}>
                      <strong>Investment:</strong> {phase.investment}
                    </div>
                    <div className={styles.team}>
                      <strong>Team:</strong> {phase.team}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className={styles.currentFocus}>
        <div className={styles.container}>
          <h2>Current Focus: Phase 1 MVP</h2>
          <div className={styles.focusContent}>
            <div className={styles.focusText}>
              <h3>What We're Building Right Now</h3>
              <p>
                We're currently in Phase 1, building the core MVP that will demonstrate 
                the power of immersive work simulation. Our focus is on creating a 
                solid foundation with the essential features that prove our concept.
              </p>
              <div className={styles.currentTasks}>
                <div className={styles.task}>
                  <span className={styles.taskStatus}>🔄</span>
                  <div>
                    <strong>VS Code Integration</strong>
                    <p>Embedding real development tools in the 3D world</p>
                  </div>
                </div>
                <div className={styles.task}>
                  <span className={styles.taskStatus}>🔄</span>
                  <div>
                    <strong>Quest System</strong>
                    <p>AI-generated coding and design challenges</p>
                  </div>
                </div>
                <div className={styles.task}>
                  <span className={styles.taskStatus}>📋</span>
                  <div>
                    <strong>User Authentication</strong>
                    <p>Secure login and profile management</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.focusVisual}>
              <div className={styles.progressCircle}>
                <div className={styles.progressText}>
                  <strong>75%</strong>
                  <span>Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className={styles.getInvolved}>
        <div className={styles.container}>
          <h2>Get Involved</h2>
          <div className={styles.involvedGrid}>
            <div className={styles.involvedCard}>
              <div className={styles.involvedIcon}>🧪</div>
              <h3>Beta Tester</h3>
              <p>Try our platform early and help shape the future of work simulation</p>
              <a href="/sign-up" className={styles.involvedBtn}>Join Beta</a>
            </div>
            <div className={styles.involvedCard}>
              <div className={styles.involvedIcon}>💰</div>
              <h3>Investor</h3>
              <p>Be part of the revolution and invest in the future of talent discovery</p>
              <a href="mailto:hunterho.my@gmail.com" className={styles.involvedBtn}>Contact Us</a>
            </div>
            <div className={styles.involvedCard}>
              <div className={styles.involvedIcon}>🤝</div>
              <h3>Partner</h3>
              <p>Integrate SimWork into your hiring process or educational program</p>
              <a href="mailto:hunterho.my@gmail.com" className={styles.involvedBtn}>Partner With Us</a>
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
              <p>Building the future of work simulation</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Product</h4>
              <a href="/live-preview">Live Demo</a>
              <a href="/pitch-deck">Pitch Deck</a>
              <a href="/why-us">Why Us</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Company</h4>
              <a href="/roadmap">Roadmap</a>
              <a href="/sign-up">Get Started</a>
              <a href="mailto:hunterho.my@gmail.com">Contact</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 SimWork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
