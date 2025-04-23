// Project types
export interface Project {
      id: string
      title: string
      description: string
      technologies: string[]
      githubUrl: string
      liveUrl: string
      imageUrl: string
      featured?: boolean
      category?: ProjectCategory
    }
    
    export type ProjectCategory = 'frontend' | 'fullstack' | 'mobile' | 'design' | 'other'
    
    // Experience types
    export interface Experience {
      title: string
      company: string
      period: string
      description: string
      skills: string[]
    }
    
    // Achievement types
    export interface Achievement {
      icon: string
      title: string
      value: string | number
      description: string
    }
    
    // Skill types
    export interface Skill {
      name: string
      icon: string
      description: string
      level: number
      category: SkillCategory
    }
    
    export type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools' | 'languages' | 'other'
    
    // Contact form types
    export interface ContactFormData {
      name: string
      email: string
      message: string
    }
    
    // Theme types
    export type Theme = 'light' | 'dark' | 'system'
    
    // Animation types
    export interface AnimationProps {
      delay?: number
      duration?: number
      direction?: 'up' | 'down' | 'left' | 'right'
      type?: 'fade' | 'slide' | 'scale' | 'rotate'
    }
    
    // Device detection types
    export interface DeviceInfo {
      isMobile: boolean
      isTablet: boolean
      isDesktop: boolean
      isLowEndDevice: boolean
      prefersReducedMotion: boolean
      isTouchDevice: boolean
    }
    
    // 3D model types
    export interface ModelProps {
      path: string
      position?: [number, number, number]
      rotation?: [number, number, number]
      scale?: number | [number, number, number]
      color?: string
    }