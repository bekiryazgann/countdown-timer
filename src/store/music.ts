import { create } from 'zustand'

interface MusicState {
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
}

export const useMusicStore = create<MusicState>()((set) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
}))