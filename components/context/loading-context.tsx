"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * 로딩 컨텍스트
 */
interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  withLoading: <T>(func: () => Promise<T>) => Promise<T>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false)

  // 비동기 콜백함수 실행 시 알아서 로딩 제어
  const withLoading = async <T, >(func: () => Promise<T>): Promise<T> => {
    setLoading(true)
    try {
      return await func()
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}

      {/*로딩 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center" style={{zIndex: 999}}>
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("로딩이 정의되지 않았습니다.")
  }
  return context
}