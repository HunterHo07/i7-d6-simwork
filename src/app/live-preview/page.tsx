'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import QuestSystem from '@/components/quest/QuestSystem';
import styles from './page.module.css';

// Dynamic import for 3D world to avoid SSR issues
const SimWorldScene = dynamic(() => import('@/components/world/SimWorldScene'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <h2>Loading SimWork World...</h2>
      <p>Preparing your immersive work simulation experience</p>
    </div>
  )
});

export default function LivePreviewPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showQuests, setShowQuests] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Auto-hide instructions after 10 seconds
      setTimeout(() => setShowInstructions(false), 10000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.livePreview}>
      {/* Header UI */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>SimWork</h1>
          <span>Live Demo</span>
        </div>
        
        <nav className={styles.nav}>
          <button className={styles.navBtn}>🏠 Home</button>
          <button className={styles.navBtn}>📊 Dashboard</button>
          <button className={styles.navBtn}>👤 Profile</button>
          <button className={styles.navBtn}>⚙️ Settings</button>
        </nav>
      </header>

      {/* Instructions overlay */}
      {showInstructions && (
        <div className={styles.instructions}>
          <div className={styles.instructionsContent}>
            <button 
              className={styles.closeBtn}
              onClick={() => setShowInstructions(false)}
            >
              ×
            </button>
            
            <h3>🎮 Welcome to SimWork!</h3>
            <div className={styles.instructionsList}>
              <div className={styles.instruction}>
                <span className={styles.icon}>🖱️</span>
                <div>
                  <strong>Camera Controls</strong>
                  <p>Drag to rotate • Scroll to zoom • Right-click to pan</p>
                </div>
              </div>
              
              <div className={styles.instruction}>
                <span className={styles.icon}>🏢</span>
                <div>
                  <strong>Buildings</strong>
                  <p>Hover over buildings to highlight • Each has different tools</p>
                </div>
              </div>
              
              <div className={styles.instruction}>
                <span className={styles.icon}>⭐</span>
                <div>
                  <strong>Quest Markers</strong>
                  <p>Yellow = Main quests • Green = Side quests • Red = Urgent</p>
                </div>
              </div>
              
              <div className={styles.instruction}>
                <span className={styles.icon}>☕</span>
                <div>
                  <strong>Social Spaces</strong>
                  <p>Coffee shops for networking and collaboration</p>
                </div>
              </div>
            </div>
            
            <p className={styles.note}>
              This is a live demo of our 2.5D work simulation platform. 
              In the full version, you can enter buildings, complete real tasks, and interact with other users!
            </p>
          </div>
        </div>
      )}

      {/* Side panel with world info */}
      <aside className={styles.sidePanel}>
        <div className={styles.panelSection}>
          <h4>🌍 World Status</h4>
          <div className={styles.statusItem}>
            <span className={styles.statusDot} style={{backgroundColor: '#00ff00'}}></span>
            <span>Online Players: 247</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusDot} style={{backgroundColor: '#ffff00'}}></span>
            <span>Active Quests: 156</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusDot} style={{backgroundColor: '#00d4ff'}}></span>
            <span>Completed Today: 89</span>
          </div>
        </div>

        <div className={styles.panelSection}>
          <h4>🎯 Available Areas</h4>
          <div className={styles.areaList}>
            <div className={styles.areaItem}>
              <span className={styles.areaIcon}>💻</span>
              <div>
                <strong>Tech Tower</strong>
                <p>Coding challenges, debugging tasks</p>
              </div>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaIcon}>🎨</span>
              <div>
                <strong>Design Studio</strong>
                <p>UI/UX design, creative projects</p>
              </div>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaIcon}>📈</span>
              <div>
                <strong>Business Center</strong>
                <p>Project management, analytics</p>
              </div>
            </div>
            <div className={styles.areaItem}>
              <span className={styles.areaIcon}>☕</span>
              <div>
                <strong>SimCafé</strong>
                <p>Networking, team collaboration</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panelSection}>
          <h4>🏆 Your Progress</h4>
          <div className={styles.progressItem}>
            <span>Level: 5</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{width: '60%'}}></div>
            </div>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <strong>12</strong>
              <span>Quests Done</span>
            </div>
            <div className={styles.stat}>
              <strong>3</strong>
              <span>Badges</span>
            </div>
            <div className={styles.stat}>
              <strong>1,250</strong>
              <span>XP Points</span>
            </div>
            <div className={styles.stat}>
              <strong>8.5h</strong>
              <span>Time Played</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main 3D world */}
      <div className={styles.worldWrapper}>
        {isLoaded && <SimWorldScene />}
      </div>

      {/* Bottom action bar */}
      <div className={styles.actionBar}>
        <button className={styles.actionBtn}>
          <span>🎮</span>
          Enter Full Experience
        </button>
        <button
          className={styles.actionBtn}
          onClick={() => setShowQuests(!showQuests)}
        >
          <span>📝</span>
          {showQuests ? 'Hide Quests' : 'Start Quest'}
        </button>
        <button className={styles.actionBtn}>
          <span>👥</span>
          Find Players
        </button>
        <button className={styles.actionBtn}>
          <span>💼</span>
          View Jobs
        </button>
      </div>

      {/* Quest System Overlay */}
      {showQuests && (
        <div className={styles.questOverlay}>
          <div className={styles.questContainer}>
            <button
              className={styles.closeQuestBtn}
              onClick={() => setShowQuests(false)}
            >
              ×
            </button>
            <QuestSystem />
          </div>
        </div>
      )}
    </main>
  );
}
