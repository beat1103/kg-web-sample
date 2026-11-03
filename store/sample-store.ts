import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type Store = {
  count: number
  inc: () => void
  dec: () => void
  reset: () => void
}

export const sampleStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "sample-store", // 스토어 이름(고유해야 함)
      storage: createJSONStorage(() => localStorage), // 스토어 저장소 위치
    },
  ),
)
