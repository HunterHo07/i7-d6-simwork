'use client';

import { useState, useEffect } from 'react';
import styles from './QuestSystem.module.css';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'design' | 'management' | 'data';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  timeEstimate: string;
  requirements: string[];
  tasks: QuestTask[];
  completed: boolean;
}

interface QuestTask {
  id: string;
  description: string;
  type: 'code' | 'design' | 'form' | 'quiz';
  completed: boolean;
  data?: any;
}

export default function QuestSystem() {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showQuestModal, setShowQuestModal] = useState(false);

  // Sample quests data
  const sampleQuests: Quest[] = [
    {
      id: 'quest_1',
      title: 'Debug the Login System',
      description: 'Fix authentication issues in a React application. Users are reporting login failures.',
      type: 'coding',
      difficulty: 'intermediate',
      xp: 150,
      timeEstimate: '30-45 minutes',
      requirements: ['JavaScript', 'React', 'Debugging'],
      tasks: [
        {
          id: 'task_1',
          description: 'Identify the bug in the authentication flow',
          type: 'code',
          completed: false
        },
        {
          id: 'task_2', 
          description: 'Fix the login validation logic',
          type: 'code',
          completed: false
        },
        {
          id: 'task_3',
          description: 'Test the fix with different user scenarios',
          type: 'quiz',
          completed: false
        }
      ],
      completed: false
    },
    {
      id: 'quest_2',
      title: 'Design a Mobile App Interface',
      description: 'Create a modern, user-friendly interface for a fitness tracking mobile application.',
      type: 'design',
      difficulty: 'beginner',
      xp: 100,
      timeEstimate: '45-60 minutes',
      requirements: ['UI/UX Design', 'Mobile Design', 'Figma'],
      tasks: [
        {
          id: 'task_1',
          description: 'Create wireframes for main screens',
          type: 'design',
          completed: false
        },
        {
          id: 'task_2',
          description: 'Design the visual interface',
          type: 'design', 
          completed: false
        },
        {
          id: 'task_3',
          description: 'Create a clickable prototype',
          type: 'design',
          completed: false
        }
      ],
      completed: false
    },
    {
      id: 'quest_3',
      title: 'Plan a Product Launch',
      description: 'Coordinate a cross-functional team to launch a new software product within budget and timeline.',
      type: 'management',
      difficulty: 'advanced',
      xp: 200,
      timeEstimate: '60-90 minutes',
      requirements: ['Project Management', 'Team Leadership', 'Strategic Planning'],
      tasks: [
        {
          id: 'task_1',
          description: 'Create project timeline and milestones',
          type: 'form',
          completed: false
        },
        {
          id: 'task_2',
          description: 'Allocate resources and assign team roles',
          type: 'form',
          completed: false
        },
        {
          id: 'task_3',
          description: 'Develop risk mitigation strategies',
          type: 'quiz',
          completed: false
        }
      ],
      completed: false
    },
    {
      id: 'quest_4',
      title: 'Analyze User Behavior Data',
      description: 'Extract insights from user analytics data to improve product engagement and retention.',
      type: 'data',
      difficulty: 'intermediate',
      xp: 175,
      timeEstimate: '45-60 minutes',
      requirements: ['Data Analysis', 'SQL', 'Statistics'],
      tasks: [
        {
          id: 'task_1',
          description: 'Query user engagement metrics',
          type: 'code',
          completed: false
        },
        {
          id: 'task_2',
          description: 'Identify patterns and trends',
          type: 'quiz',
          completed: false
        },
        {
          id: 'task_3',
          description: 'Create actionable recommendations',
          type: 'form',
          completed: false
        }
      ],
      completed: false
    }
  ];

  useEffect(() => {
    // Load quests from localStorage or use sample data
    const savedQuests = localStorage.getItem('simwork_quests');
    if (savedQuests) {
      const parsed = JSON.parse(savedQuests);
      setAvailableQuests(parsed.available || sampleQuests);
      setActiveQuests(parsed.active || []);
    } else {
      setAvailableQuests(sampleQuests);
    }
  }, [sampleQuests]);

  const startQuest = (quest: Quest) => {
    const updatedAvailable = availableQuests.filter(q => q.id !== quest.id);
    const updatedActive = [...activeQuests, quest];
    
    setAvailableQuests(updatedAvailable);
    setActiveQuests(updatedActive);
    setShowQuestModal(false);
    
    // Save to localStorage
    localStorage.setItem('simwork_quests', JSON.stringify({
      available: updatedAvailable,
      active: updatedActive
    }));
  };

  const completeTask = (questId: string, taskId: string) => {
    const updatedActive = activeQuests.map(quest => {
      if (quest.id === questId) {
        const updatedTasks = quest.tasks.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        );
        const allTasksCompleted = updatedTasks.every(task => task.completed);
        return { 
          ...quest, 
          tasks: updatedTasks, 
          completed: allTasksCompleted 
        };
      }
      return quest;
    });
    
    setActiveQuests(updatedActive);
    
    // Save to localStorage
    localStorage.setItem('simwork_quests', JSON.stringify({
      available: availableQuests,
      active: updatedActive
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coding': return '💻';
      case 'design': return '🎨';
      case 'management': return '📊';
      case 'data': return '📈';
      default: return '📋';
    }
  };

  return (
    <div className={styles.questSystem}>
      {/* Quest Header */}
      <div className={styles.questHeader}>
        <h2>🎯 Quest System</h2>
        <button 
          className={styles.browseBtn}
          onClick={() => setShowQuestModal(true)}
        >
          Browse Available Quests
        </button>
      </div>

      {/* Active Quests */}
      <div className={styles.activeQuests}>
        <h3>Active Quests ({activeQuests.length})</h3>
        {activeQuests.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No active quests. Start a new quest to begin your journey!</p>
          </div>
        ) : (
          <div className={styles.questGrid}>
            {activeQuests.map(quest => (
              <div key={quest.id} className={styles.questCard}>
                <div className={styles.questCardHeader}>
                  <span className={styles.questIcon}>{getTypeIcon(quest.type)}</span>
                  <div className={styles.questInfo}>
                    <h4>{quest.title}</h4>
                    <span 
                      className={styles.difficulty}
                      style={{ color: getDifficultyColor(quest.difficulty) }}
                    >
                      {quest.difficulty}
                    </span>
                  </div>
                  <div className={styles.questXp}>+{quest.xp} XP</div>
                </div>
                
                <p className={styles.questDescription}>{quest.description}</p>
                
                <div className={styles.questProgress}>
                  <div className={styles.progressHeader}>
                    <span>Progress</span>
                    <span>{quest.tasks.filter(t => t.completed).length}/{quest.tasks.length}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${(quest.tasks.filter(t => t.completed).length / quest.tasks.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className={styles.questTasks}>
                  {quest.tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`${styles.task} ${task.completed ? styles.completed : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => completeTask(quest.id, task.id)}
                      />
                      <span>{task.description}</span>
                    </div>
                  ))}
                </div>

                {quest.completed && (
                  <div className={styles.questCompleted}>
                    🎉 Quest Completed! +{quest.xp} XP earned
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quest Browser Modal */}
      {showQuestModal && (
        <div className={styles.questModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Available Quests</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowQuestModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.questList}>
              {availableQuests.map(quest => (
                <div key={quest.id} className={styles.questListItem}>
                  <div className={styles.questListHeader}>
                    <span className={styles.questIcon}>{getTypeIcon(quest.type)}</span>
                    <div className={styles.questInfo}>
                      <h4>{quest.title}</h4>
                      <div className={styles.questMeta}>
                        <span 
                          className={styles.difficulty}
                          style={{ color: getDifficultyColor(quest.difficulty) }}
                        >
                          {quest.difficulty}
                        </span>
                        <span className={styles.timeEstimate}>⏱️ {quest.timeEstimate}</span>
                        <span className={styles.questXp}>+{quest.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={styles.questDescription}>{quest.description}</p>
                  
                  <div className={styles.requirements}>
                    <strong>Requirements:</strong>
                    <div className={styles.requirementTags}>
                      {quest.requirements.map((req, index) => (
                        <span key={index} className={styles.requirementTag}>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className={styles.startQuestBtn}
                    onClick={() => startQuest(quest)}
                  >
                    Start Quest
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
