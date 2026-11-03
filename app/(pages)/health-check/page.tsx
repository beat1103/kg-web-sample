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
import { userStore } from "@/store/user-store"
import { useLoading } from "@/components/context/loading-context"
import { LoginReqType, LoginResType } from "@/type/auth/login-type"
import { StandardRes } from "@/type/response-wrapper/standard-res-type"
import { deleteCookies } from "@/services/auth/auth-service"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/auth-constants"
import { toast } from "sonner"
import { useLocalStorage } from "@/lib/utils/browser-storage-util"
import { useRouter } from "next/navigation"

export default function HealthCheckPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<Array<{ time: string; message: string }>>([])
  const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } =
    useLocalStorage()
  const [apiUrl, setApiUrl] = useState<string>("/api/health-check")
  const { login, setUserInfo, logout } = userStore()
  const { withLoading } = useLoading()
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

  const fetchGetAuth = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchNextGet(apiUrl)
      },
      (duration, data) => `[${duration}ms] GET 응답 : ${JSON.stringify(data)}`,
      formatError,
    )
  }

  const logouttt = async () => {
    await withTimeMeasurement(
      async () => {
        return await logout()
      },
      (duration, data) => `[${duration}ms] GET 응답 : ${JSON.stringify(data)}`,
      formatError,
    )
  }

  const fetchPostAuth = async () => {
    const loginReq: LoginReqType = {
      p_login_id: "",
      p_pwd: "passwordValue",
    }
    await withTimeMeasurement(
      async () => {
        const loginMethod = "0"
        const loginRes: StandardRes<LoginResType> = await withLoading(() =>
          login(loginReq),
        )
        const state = loginRes?.state
        if (state === "201") {
          // setSaveIdStorage(loginReq.p_login_id)

          if (loginRes.result.requestbox?.d_emptyyn === "Y") {
            // 최초로그인 혹은 비밀번호 변경일 초과
            deleteCookies({ key: [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY] }) // 쿠키 제거
            // 환급과정 심사 > 본인인증 페이지로 이동 > 본인인증 완료 시 비밀번호 변경 페이지로 이동
            router.push("/login-certify-phone")

            // 환급과정 심사로 임시 주석
            // router.push("/reset-pwd")
          } else {
            // 정상 로그인
            setLocalStorageItem(
              ACCESS_TOKEN_KEY,
              loginRes.result.requestbox?.access_token || "",
            )
            setLocalStorageItem("lastLogin", loginMethod)
            toast.success(
              `안녕하세요 ${loginRes.result.requestbox?.d_name || ""}님`,
            )
            // router.push("/main")
          }
        }
        // else if (state === "409") {
        //   openAlert(t("MSG_0000007373"), t("MSG_0000020090"))
        // } else {
        //   openAlert(
        //     t("MSG_0000007373"),
        //     `${t("MSG_0000000069")} ${t("MSG_0000000821")}`,
        //   )
        //   setIsLoginSuccess(false)
        // }

        // setUserInfo(loginRes.result.requestbox)

        return loginRes
        // return await login(loginReq)
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

  const backGet2 = async () => {
    await withTimeMeasurement(
      async () => {
        return await fetchNextGet("/api/test")
      },
      (duration, data) => `[${duration}ms] GET 응답 : ${JSON.stringify(data)}`,
      formatError,
    )

    // await withTimeMeasurement(
    //   async () => {
    //     return await fetchBackendGet("/fo/api/v1/user/test", { msg: "hello" })
    //   },
    //   (duration, response) =>
    //     `[${duration}ms] GET 응답 : ${JSON.stringify(response)}`,
    //   (duration) => `[${duration}ms] GET Fetch 요청 실패`,
    // )
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
            <p className="text-muted-foreground text-sm">
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
                <ArrowRight className="text-muted-foreground h-3 w-3 animate-pulse" />
                <Badge
                  variant="default"
                  className="bg-blue-400/80 hover:bg-blue-500/80"
                >
                  Next Server
                </Badge>
                <ArrowRight className="text-muted-foreground h-3 w-3 animate-pulse" />
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
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
              <Button
                variant="secondary"
                onClick={fetchPostAuth}
                className="w-full text-sm"
              >
                Login Fetch
              </Button>
              <Button
                variant="secondary"
                onClick={logouttt}
                className="w-full text-sm"
              >
                Login Out
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
                <ArrowRight className="text-muted-foreground h-3 w-3 animate-pulse" />
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
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
              <Button
                variant="secondary"
                onClick={backGet2}
                className="w-full text-sm"
              >
                api 테스트 해조
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
              <p className="text-muted-foreground text-xs">
                실시간 API 응답 모니터링
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              className="text-muted-foreground hover:text-foreground h-8 text-xs"
            >
              Clear logs
            </Button>
          </CardHeader>
          <CardContent className="p-3">
            <ScrollArea className="bg-muted/50 h-[300px] w-full rounded-md border p-3 font-mono">
              {logs.length === 0 ? (
                <p className="text-muted-foreground text-center text-xs">
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
