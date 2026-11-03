"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle, CheckCircle, Clock, Server, Globe, Database } from "lucide-react"
import { useSystemStatusContext } from "../contexts/SystemStatusContext"

export default function SystemStatus() {
  const { systemStatus, isLoading, error, lastUpdated, refetch, environmentInfo, environmentGroups } = useSystemStatusContext()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h3 className="text-3xl font-bold text-gray-900">시스템 상태</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
            </div>

            {/* 상태 표시 */}
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>데이터 로딩 중...</span>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              
              {!isLoading && !error && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>시스템 정상</span>
                </div>
              )}
              
              {!isLoading && error && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>시스템 오류</span>
                </div>
              )}
              
              {lastUpdated && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>마지막 업데이트: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* 환경별 그룹 섹션 */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">환경별 시스템 상태</h4>
              <p className="text-gray-600">각 환경의 API 서버와 데이터베이스 상태 (새로고침 버튼으로 업데이트)</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {environmentGroups.map((group, index) => (
                <Card key={index} className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{group.icon}</div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{group.name}</h5>
                          <p className="text-sm text-gray-600">{group.env}</p>
                        </div>
                      </div>
                      <Badge className={group.color}>
                        {group.isHealthy ? "정상" : "오류"}
                      </Badge>
                    </div>
                    
                    {group.responseTime && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">응답 시간</span>
                          <span className={`font-medium ${
                            group.responseTime < 1000 ? "text-green-600" : 
                            group.responseTime < 3000 ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {group.responseTime}ms
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {group.status.map((status, statusIndex) => (
                        <div key={statusIndex} className="border-l-4 border-gray-200 pl-3">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-medium text-gray-900">{status.title}</h6>
                            <Badge className={status.statusColor}>{status.status}</Badge>
                          </div>
                          <div className="space-y-1">
                            {status.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex justify-between text-sm">
                                <span className="text-gray-600">{detail.label}</span>
                                <span className={`font-medium ${detail.valueColor || ''}`}>
                                  {detail.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {group.lastChecked && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>마지막 확인: {group.lastChecked.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 현재 환경 정보 */}
          <div className="mb-8">
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <Server className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">현재 환경</h4>
                      <p className="text-sm text-gray-600">실행 중인 환경과 엔드포인트</p>
                    </div>
                  </div>
                  <Badge className={environmentInfo.envColor}>
                    {environmentInfo.currentEnv.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">프론트엔드</p>
                        <p className="text-sm text-blue-600 font-mono">{environmentInfo.frontendUrl}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">API 서버</p>
                        <p className="text-sm text-green-600 font-mono">{environmentInfo.apiEndpoint}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
