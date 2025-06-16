# 🛠️ Development Guide - SimWork

## Tech Stack & Setup

### Core Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Three.js**: 3D graphics and world rendering
- **React Three Fiber**: React bindings for Three.js
- **React Three Drei**: Useful helpers and components
- **GSAP**: Advanced animations and effects
- **Phaser3**: 2D/2.5D game interactions

### Development Dependencies
```bash
npm install three @types/three @react-three/fiber @react-three/drei gsap phaser
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── live-preview/      # Demo world page
│   ├── pitch-deck/        # Presentation page
│   ├── why-us/           # About page
│   ├── roadmap/          # Development roadmap
│   └── sign-up/          # Registration page
├── components/            # React components
│   ├── world/            # 3D world components
│   ├── ui/               # Interface components
│   ├── effects/          # GSAP animations
│   └── game/             # Phaser3 integration
├── lib/                  # Utilities and helpers
│   ├── three/           # Three.js utilities
│   ├── gsap/            # Animation helpers
│   └── game/            # Game logic
├── assets/              # 3D models and textures
│   ├── models/          # GLTF/GLB files
│   ├── textures/        # Image assets
│   └── audio/           # Sound effects
└── styles/              # CSS modules
    ├── components/      # Component styles
    └── pages/           # Page-specific styles
```

## Styling Guidelines

### CSS-Only Approach
- **No Tailwind classes** in components
- Use **CSS modules** for component styling
- **Global styles** in `globals.css`
- **GSAP** for animations and effects

### Example Component Structure
```tsx
// components/world/OfficeBuilding.tsx
import styles from './OfficeBuilding.module.css';

export default function OfficeBuilding() {
  return (
    <div className={styles.building}>
      <div className={styles.entrance}>
        {/* Building content */}
      </div>
    </div>
  );
}
```

```css
/* components/world/OfficeBuilding.module.css */
.building {
  position: relative;
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.entrance {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 80px;
  background: #2a2a2a;
  border-radius: 4px 4px 0 0;
}
```

## 3D World Development

### Three.js Scene Setup
```tsx
// components/world/SimWorldScene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function SimWorldScene() {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 60 }}
      style={{ height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* World content */}
      <OfficeDistrict />
      <ResidentialArea />
      <CentralPlaza />
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="city" />
    </Canvas>
  );
}
```

### Asset Loading Strategy
```tsx
// lib/three/AssetLoader.ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class AssetLoader {
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;

  constructor() {
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');
    
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async loadModel(path: string) {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        path,
        (gltf) => resolve(gltf),
        (progress) => console.log('Loading progress:', progress),
        (error) => reject(error)
      );
    });
  }
}
```

## Character System

### Player Movement
```tsx
// components/world/Player.tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function Player() {
  const playerRef = useRef();
  const targetPosition = useRef(new Vector3());
  const currentPosition = useRef(new Vector3());

  useFrame((state, delta) => {
    // Smooth movement towards target
    currentPosition.current.lerp(targetPosition.current, delta * 5);
    if (playerRef.current) {
      playerRef.current.position.copy(currentPosition.current);
    }
  });

  const handleClick = (event) => {
    // Convert screen coordinates to world position
    const intersect = event.intersections[0];
    if (intersect) {
      targetPosition.current.copy(intersect.point);
    }
  };

  return (
    <mesh ref={playerRef} onClick={handleClick}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
```

## Quest System Architecture

### Quest Data Structure
```typescript
// lib/game/QuestSystem.ts
export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'design' | 'management' | 'data';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  location: Vector3;
  requirements: string[];
  rewards: {
    xp: number;
    badges: string[];
    items: string[];
  };
  tasks: QuestTask[];
}

export interface QuestTask {
  id: string;
  description: string;
  type: 'code' | 'design' | 'form' | 'quiz';
  completed: boolean;
  data?: any;
}

export class QuestManager {
  private activeQuests: Quest[] = [];
  private completedQuests: Quest[] = [];

  generateQuest(playerLevel: number, playerSkills: string[]): Quest {
    // AI-powered quest generation logic
    return {
      id: `quest_${Date.now()}`,
      title: "Debug the Authentication System",
      description: "Fix login issues in the user authentication module",
      type: 'coding',
      difficulty: 'intermediate',
      location: new Vector3(5, 0, 10), // Tech Tower location
      requirements: ['javascript', 'react'],
      rewards: {
        xp: 150,
        badges: ['debugger'],
        items: ['coffee_token']
      },
      tasks: [
        {
          id: 'task_1',
          description: 'Identify the bug in the login function',
          type: 'code',
          completed: false
        }
      ]
    };
  }
}
```

## Performance Optimization

### Asset Optimization
1. **Model Compression**: Use Draco compression for GLTF files
2. **Texture Optimization**: WebP format, power-of-2 dimensions
3. **Level of Detail**: Multiple quality versions based on distance
4. **Frustum Culling**: Only render visible objects

### Code Splitting
```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const SimWorldScene = dynamic(() => import('@/components/world/SimWorldScene'), {
  ssr: false,
  loading: () => <div>Loading 3D World...</div>
});
```

## Testing Strategy

### Unit Tests
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### E2E Tests
```bash
npm install --save-dev playwright
```

### Test Structure
```
tests/
├── unit/              # Component unit tests
├── integration/       # Feature integration tests
└── e2e/              # End-to-end tests
    ├── world-navigation.spec.ts
    ├── quest-completion.spec.ts
    └── user-interaction.spec.ts
```

## Deployment

### Build Optimization
```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gltf|glb)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_WORLD_API_URL=https://api.simwork.dev
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Development Workflow

### Git Workflow
1. **Feature branches**: `feature/world-navigation`
2. **Component branches**: `component/office-building`
3. **Bug fixes**: `fix/character-movement`

### Code Quality
- **ESLint**: Automated linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Pre-commit hooks

### Development Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # TypeScript checking
```
