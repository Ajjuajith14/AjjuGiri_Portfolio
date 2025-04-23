import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-primary/70">
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <p className="text-sm">Loading 3D content...</p>
    </div>
  )
}