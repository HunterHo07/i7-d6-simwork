'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './page.module.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    interests: [] as string[],
    newsletter: true
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const roles = [
    { id: 'developer', label: 'Software Developer', icon: '💻' },
    { id: 'designer', label: 'UI/UX Designer', icon: '🎨' },
    { id: 'manager', label: 'Project Manager', icon: '📊' },
    { id: 'data', label: 'Data Analyst', icon: '📈' },
    { id: 'recruiter', label: 'HR/Recruiter', icon: '👥' },
    { id: 'student', label: 'Student/Learning', icon: '🎓' },
    { id: 'freelancer', label: 'Freelancer', icon: '🚀' },
    { id: 'other', label: 'Other', icon: '🔧' }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner (0-1 years)' },
    { id: 'intermediate', label: 'Intermediate (2-5 years)' },
    { id: 'senior', label: 'Senior (5+ years)' },
    { id: 'expert', label: 'Expert (10+ years)' }
  ];

  const interestOptions = [
    'Skill Assessment', 'Freelancer Discovery', 'Team Building', 
    'Learning & Development', 'Hiring & Recruitment', 'Remote Work',
    'Gaming & Gamification', 'Career Development'
  ];

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'interests') {
        setFormData(prev => ({
          ...prev,
          interests: checked 
            ? [...prev.interests, value]
            : prev.interests.filter(interest => interest !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store in localStorage for demo purposes
    const userData = {
      ...formData,
      id: Date.now(),
      joinedAt: new Date().toISOString(),
      status: 'beta_user'
    };
    
    localStorage.setItem('simwork_user', JSON.stringify(userData));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.role && formData.experience;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (isSuccess) {
    return (
      <main className={styles.signUp}>
        <div className={styles.successContainer}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>🎉</div>
            <h1>Welcome to SimWork!</h1>
            <p>Your account has been created successfully. You're now part of the future of work simulation.</p>
            
            <div className={styles.nextSteps}>
              <h3>What's Next?</h3>
              <div className={styles.stepsList}>
                <div className={styles.step}>
                  <span className={styles.stepIcon}>🎮</span>
                  <div>
                    <strong>Explore the World</strong>
                    <p>Take a tour of our 2.5D office environment</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepIcon}>🎯</span>
                  <div>
                    <strong>Complete Your First Quest</strong>
                    <p>Start with beginner-friendly challenges</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepIcon}>👥</span>
                  <div>
                    <strong>Connect with Others</strong>
                    <p>Discover talented professionals in your field</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.successActions}>
              <a href="/live-preview" className={styles.primaryBtn}>
                🚀 Enter SimWork World
              </a>
              <a href="/" className={styles.secondaryBtn}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.signUp}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/">SimWork</a>
        </div>
        <div className={styles.navLinks}>
          <a href="/live-preview">Demo</a>
          <a href="/pitch-deck">Pitch</a>
          <a href="/why-us">Why Us</a>
          <a href="/roadmap">Roadmap</a>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.formContainer}>
          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressSteps}>
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`${styles.progressStep} ${
                    step <= currentStep ? styles.active : ''
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>

          {/* Form */}
          <div ref={formRef} className={styles.form}>
            <div className={styles.formHeader}>
              <h1>Join the Future of Work</h1>
              <p>Step {currentStep} of 3: {
                currentStep === 1 ? 'Basic Information' :
                currentStep === 2 ? 'Professional Details' :
                'Interests & Preferences'
              }</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className={styles.formStep}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className={styles.formNote}>
                    <p>We'll use this email to send you updates about SimWork and your beta access.</p>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div className={styles.formStep}>
                  <div className={styles.inputGroup}>
                    <label>What's your primary role? *</label>
                    <div className={styles.roleGrid}>
                      {roles.map((role) => (
                        <label
                          key={role.id}
                          className={`${styles.roleCard} ${
                            formData.role === role.id ? styles.selected : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.id}
                            checked={formData.role === role.id}
                            onChange={handleInputChange}
                          />
                          <span className={styles.roleIcon}>{role.icon}</span>
                          <span className={styles.roleLabel}>{role.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="experience">Experience Level *</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Interests */}
              {currentStep === 3 && (
                <div className={styles.formStep}>
                  <div className={styles.inputGroup}>
                    <label>What interests you most about SimWork?</label>
                    <div className={styles.interestsGrid}>
                      {interestOptions.map((interest) => (
                        <label key={interest} className={styles.interestCard}>
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={handleInputChange}
                          />
                          <span className={styles.interestLabel}>{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <span>Subscribe to our newsletter for updates and beta features</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className={styles.formActions}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryBtn}
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={styles.primaryBtn}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.primaryBtn}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Join SimWork'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Side Info */}
        <div className={styles.sideInfo}>
          <div className={styles.infoCard}>
            <h3>🎮 Beta Access Includes</h3>
            <ul>
              <li>Full access to 2.5D office world</li>
              <li>Complete coding and design challenges</li>
              <li>Connect with other professionals</li>
              <li>Early access to new features</li>
              <li>Direct feedback channel to our team</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>👥 Join 500+ Beta Users</h3>
            <p>
              Be part of the community shaping the future of work simulation.
              Your feedback helps us build the platform that will revolutionize
              how talent is discovered and developed.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>🚀 Coming Soon</h3>
            <ul>
              <li>Mobile app for iOS and Android</li>
              <li>VR/AR office environments</li>
              <li>Enterprise team workspaces</li>
              <li>AI-powered career coaching</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
