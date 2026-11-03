"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface SystemStatusData {
  title: string
  status: string
  statusColor: string
  details: Array<{
    label: string
    value: string
    valueColor?: string
  }>
}

interface EnvironmentGroup {
  name: string
  env: string
  color: string
  icon: string
  status: SystemStatusData[]
  isHealthy: boolean
  responseTime?: number
  lastChecked?: Date
}

interface SystemStatusContextType {
  // 기본 상태
  isSystemHealthy: boolean | null
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null

  // 상세 상태 (SystemStatus 컴포넌트용)
  systemStatus: SystemStatusData[]

  // 환경별 그룹
  environmentGroups: EnvironmentGroup[]

  // 환경 정보
  environmentInfo: {
    currentEnv: string
    envColor: string
    apiEndpoint: string | undefined
    frontendUrl: string | undefined
  }

  // 액션
  refetch: () => void
}

const SystemStatusContext = createContext<SystemStatusContextType | null>(null)

interface SystemStatusProviderProps {
  children: ReactNode
}

export function SystemStatusProvider({ children }: SystemStatusProviderProps) {
  const [isSystemHealthy, setIsSystemHealthy] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [systemStatus, setSystemStatus] = useState<SystemStatusData[]>([])
  const [environmentGroups, setEnvironmentGroups] = useState<
    EnvironmentGroup[]
  >([])

  // 환경 정보 가져오기
  const getEnvironmentInfo = () => {
    const nodeEnv = process.env.NODE_ENV || "development"
    const isLocal = true //'localhost';//typeof window !== 'undefined' && window.location.hostname === 'localhost'

    let currentEnv = "development"
    let envColor = "bg-blue-100 text-blue-800"
    const apiEndpoint = process.env.NEXT_PUBLIC_API_BACK_BASE_URL

    if (nodeEnv === "production") {
      currentEnv = "production"
      envColor = "bg-red-100 text-red-800"
    } else if (nodeEnv === "development") {
      if (isLocal) {
        currentEnv = "local"
        envColor = "bg-green-100 text-green-800"
      } else {
        currentEnv = "development"
        envColor = "bg-yellow-100 text-yellow-800"
      }
    }

    const frontendUrl = process.env.NEXT_PUBLIC_API_FRONT_BASE_URL

    return {
      currentEnv,
      envColor,
      apiEndpoint,
      frontendUrl,
    }
  }

  // 환경별 헬스체크 수행
  const checkEnvironmentHealth = async (env: string, apiUrl: string) => {
    try {
      const startTime = performance.now()
      const response = await fetch(`${apiUrl}/fo/api/v1/start/healthCheck`)
      const responseTime = Math.round(performance.now() - startTime)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      const isHealthy = data.msg === "I'm Okay" && data.isConn === 1

      return {
        isHealthy,
        responseTime,
        data,
        error: null,
      }
    } catch (err) {
      return {
        isHealthy: false,
        responseTime: null,
        data: null,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  // 환경별 그룹 생성
  const createEnvironmentGroups = async () => {
    const environments = [
      {
        name: "로컬 환경",
        env: "local",
        color: "bg-green-100 text-green-800",
        icon: "🏠",
        apiUrl: "http://localhost:8081",
      },
      {
        name: "개발 환경",
        env: "development",
        color: "bg-yellow-100 text-yellow-800",
        icon: "🔧",
        apiUrl: "https://dev-st-api.firzzle.co.kr:8443",
      },
      {
        name: "운영 환경",
        env: "production",
        color: "bg-red-100 text-red-800",
        icon: "🚀",
        apiUrl: "https://st-api.firzzle.co.kr",
      },
    ]

    const groups: EnvironmentGroup[] = []

    for (const env of environments) {
      const healthResult = await checkEnvironmentHealth(env.env, env.apiUrl)

      const group: EnvironmentGroup = {
        name: env.name,
        env: env.env,
        color: healthResult.isHealthy
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800",
        icon: env.icon,
        isHealthy: healthResult.isHealthy,
        responseTime: healthResult.responseTime || undefined,
        lastChecked: new Date(),
        status: [
          {
            title: "API 서버",
            status: healthResult.isHealthy ? "정상" : "오류",
            statusColor: healthResult.isHealthy
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800",
            details: [
              {
                label: "응답 시간",
                value: healthResult.responseTime
                  ? `${healthResult.responseTime}ms`
                  : "N/A",
                valueColor:
                  healthResult.responseTime && healthResult.responseTime < 1000
                    ? "text-green-600"
                    : healthResult.responseTime &&
                        healthResult.responseTime < 3000
                      ? "text-yellow-600"
                      : "text-red-600",
              },
              {
                label: "상태",
                value: healthResult.data?.msg || "연결 실패",
                valueColor: healthResult.isHealthy
                  ? "text-green-600"
                  : "text-red-600",
              },
            ],
          },
          {
            title: "데이터베이스",
            status: healthResult.data?.isConn === 1 ? "연결됨" : "연결 끊김",
            statusColor:
              healthResult.data?.isConn === 1
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800",
            details: [
              {
                label: "연결 상태",
                value: healthResult.data
                  ? `isConn: ${healthResult.data.isConn}`
                  : "연결 실패",
                valueColor:
                  healthResult.data?.isConn === 1
                    ? "text-green-600"
                    : "text-red-600",
              },
              // , { label: "포트", value: "8081" }
            ],
          },
        ],
      }

      groups.push(group)
    }

    return groups
  }

  const fetchSystemStatus = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 환경별 그룹 생성
      const envGroups = await createEnvironmentGroups()
      setEnvironmentGroups(envGroups)

      // 현재 환경의 상태를 기본 시스템 상태로 설정
      const currentEnv = getEnvironmentInfo().currentEnv
      const currentGroup = envGroups.find((group) => group.env === currentEnv)

      if (currentGroup) {
        setIsSystemHealthy(currentGroup.isHealthy)
        setSystemStatus(currentGroup.status)
      }

      setLastUpdated(new Date())
    } catch (err) {
      console.error("시스템 상태 조회 실패:", err)
      setError(
        "시스템 상태를 가져올 수 없습니다. API 서버에 연결할 수 없습니다.",
      )
      setIsSystemHealthy(false)

      // 에러 상태에서도 환경 그룹은 표시
      const envGroups = await createEnvironmentGroups()
      setEnvironmentGroups(envGroups)
    } finally {
      setIsLoading(false)
    }
  }

  // 컴포넌트 마운트 시 데이터 로드 (한 번만)
  useEffect(() => {
    fetchSystemStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue: SystemStatusContextType = {
    isSystemHealthy,
    isLoading,
    error,
    lastUpdated,
    systemStatus,
    environmentGroups,
    environmentInfo: getEnvironmentInfo(),
    refetch: fetchSystemStatus,
  }

  return (
    <SystemStatusContext.Provider value={contextValue}>
      {children}
    </SystemStatusContext.Provider>
  )
}

export function useSystemStatusContext() {
  const context = useContext(SystemStatusContext)
  if (context === null) {
    throw new Error(
      "useSystemStatusContext must be used within a SystemStatusProvider",
    )
  }
  return context
}
