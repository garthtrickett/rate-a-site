// store.ts
import { create } from 'zustand'

type State = {
  data: any[]
  actions: {
    setData: (data: any[]) => void
  }
}

// Define your store
export const useStore = create<State>(set => ({
  // State
  data: [],

  // Actions
  actions: {
    setData: data => set(() => ({ data }))
  }
}))
