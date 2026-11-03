"use client"

import { Badge } from "@/components/ui/badge"
import { Home, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useSystemStatusContext } from "../contexts/SystemStatusContext"

export default function Header() {
  const { isSystemHealthy, isLoading, lastUpdated } = useSystemStatusContext()

  const getStatusBadge = () => {
    if (isLoading) {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          확인 중...
        </Badge>
      )
    }

    if (isSystemHealthy === true) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          시스템 정상
        </Badge>
      )
    }

    if (isSystemHealthy === false) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          시스템 오류
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        <AlertCircle className="h-3 w-3 mr-1" />
        상태 불명
      </Badge>
    )
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">연수원 시스템</h1>
              <p className="text-sm text-gray-500">KG Standard User Web</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
