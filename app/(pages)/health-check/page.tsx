"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import {
  fetchBackendGet,
  fetchBackendPost,
  fetchNextGet,
  fetchNextPost,
} from "@/services/health-check/health-check-service"

export default function HealthCheckPage() {
  const [logs, setLogs] = useState<Array<{ time: string; message: string }>>([])
  const [apiUrl, setApiUrl] = useState<string>("/api/health-check")
  const [backendApiUrl, setBackendApiUrl] = useState<string>(
    "/fo/api/v1/start/healthCheck",
  )

  const fetchGet = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchNextGet(apiUrl)
      },
      (duration, data) => `[${duration}ms] GET 응답 : ${JSON.stringify(data)}`,
      formatError,
    )
  }

  const fetchPost = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchNextPost(apiUrl, { msg: "hello" })
      },
      (duration, data) => `[${duration}ms] POST 응답 : ${JSON.stringify(data)}`,
      formatError,
    )
  }

  const backGet = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchBackendGet(backendApiUrl, { msg: "hello" })
      },
      (duration, response) =>
        `[${duration}ms] GET 응답 : ${JSON.stringify(response)}`,
      (duration) => `[${duration}ms] GET Fetch 요청 실패`,
    )
  }

  const backPost = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchBackendPost(backendApiUrl, { msg: "hello" })
      },
      (duration, response) =>
        `[${duration}ms] POST 응답 : ${JSON.stringify(response)}`,
      formatError,
    )
  }

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [{ time, message }, ...prev])
  }

  const clearLogs = () => {
    setLogs([])
  }

  const withTimeMeasurement = async <T,>(
    operation: () => Promise<T>,
    successFormat: (duration: number, result: T) => string,
    errorFormat: (duration: number, error: unknown) => string,
  ) => {
    const startTime = performance.now()
    try {
      const result = await operation()
      const duration = Math.round(performance.now() - startTime)
      addLog(successFormat(duration, result))
      return result
    } catch (error) {
      const duration = Math.round(performance.now() - startTime)
      addLog(errorFormat(duration, error))
      throw error
    }
  }

  const formatError = (duration: number, error: unknown) => {
    return `[${duration}ms] 요청 실패 : ${error}`
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              System Health Monitor
            </h1>
            <p className="text-sm text-muted-foreground">
              API 엔드포인트 상태 모니터링 및 테스트
            </p>
          </div>
          <Link href="/main">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              홈으로
            </Button>
          </Link>
        </div>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-medium">
                API Endpoints
                <span className="pl-2 text-xs"> (Next Server 사용)</span>
              </CardTitle>
              <div className="flex items-center gap-1">
                <Badge
                  variant="default"
                  className="bg-emerald-400/80 hover:bg-emerald-500/80"
                >
                  Client
                </Badge>
                <ArrowRight className="h-3 w-3 animate-pulse text-muted-foreground" />
                <Badge
                  variant="default"
                  className="bg-blue-400/80 hover:bg-blue-500/80"
                >
                  Next Server
                </Badge>
                <ArrowRight className="h-3 w-3 animate-pulse text-muted-foreground" />
                <Badge
                  variant="default"
                  className="bg-gray-400/80 hover:bg-gray-500/80"
                >
                  Backend Server
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-3">
            <div className="flex w-full items-center space-x-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="API URL 입력"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <Button
                variant="secondary"
                onClick={fetchGet}
                className="w-full text-sm"
              >
                Get Fetch
              </Button>
              <Button
                variant="secondary"
                onClick={fetchPost}
                className="w-full text-sm"
              >
                Post Fetch
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-medium">
                API Endpoints
              </CardTitle>
              <div className="flex items-center gap-1">
                <Badge
                  variant="default"
                  className="bg-emerald-400/80 hover:bg-emerald-500/80"
                >
                  Client
                </Badge>
                <ArrowRight className="h-3 w-3 animate-pulse text-muted-foreground" />
                <Badge
                  variant="default"
                  className="bg-gray-400/80 hover:bg-gray-500/80"
                >
                  Backend Server
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-3">
            <div className="flex w-full items-center space-x-2">
              <input
                type="text"
                value={backendApiUrl}
                onChange={(e) => setBackendApiUrl(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="백엔드 API URL 입력"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <Button
                variant="secondary"
                onClick={backGet}
                className="w-full text-sm"
              >
                Get Fetch
              </Button>
              <Button
                variant="secondary"
                onClick={backPost}
                className="w-full text-sm"
              >
                Post Fetch
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">
                Response Logs
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                실시간 API 응답 모니터링
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear logs
            </Button>
          </CardHeader>
          <CardContent className="p-3">
            <ScrollArea className="h-[300px] w-full rounded-md border bg-muted/50 p-3 font-mono">
              {logs.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground">
                  시스템이 준비되었습니다. API 요청을 시작하세요.
                </p>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-xs"
                    >
                      <span className="whitespace-nowrap text-blue-500 dark:text-blue-400">
                        {`[${log.time}]`}
                      </span>
                      <span className="flex-1">{`> ${log.message}`}</span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
