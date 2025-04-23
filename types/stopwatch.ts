export interface StopwatchProps {
      initialTime?: number
      className?: string
      showMilliseconds?: boolean
      autoStart?: boolean
      onTimeUpdate?: (time: number) => void
    }
    
    export interface UseStopwatchOptions {
      initialTime?: number
      autoStart?: boolean
      onTimeUpdate?: (time: number) => void
    }
    
    export interface UseStopwatchReturn {
      time: number
      isRunning: boolean
      start: () => void
      pause: () => void
      reset: () => void
      lap: () => number
      laps: number[]
    }
    
    export interface FormattedTime {
      hours: string
      minutes: string
      seconds: string
      milliseconds: string
    }