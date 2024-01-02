// store.ts
import { create } from 'zustand'

type State = {
  professionals: any[]
  actions: {
    setProfessionals: (data: any[]) => void
  }
}

// Define your store
export const useStore = create<State>(set => ({
  // State
  professionals: [],

  // Actions
  actions: {
    setProfessionals: data => set(() => ({ professionals: data }))
  }
}))
