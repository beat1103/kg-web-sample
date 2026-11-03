import { NextRequest, NextResponse } from "next/server"
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_COOKIE_MAX_AGE,
} from "@/constants/auth-constants"
import { duplicatedLoginCheck, tokenRefresh } from "@/lib/utils/auth-util"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

/**
 * 전역 미들웨어 함수
 * 보호된 라우트에 대한 인증 토큰 검증을 처리
 * @param request - Next.js 요청 객체
 */
export const middleware = async (request: NextRequest) => {
  try {
    const path: string = request.nextUrl.pathname // 요청 path
    const requestType: string = path.startsWith("/api/") ? "api" : "etc" // 요청 타입
    let access_token: string =
      request.cookies.get(ACCESS_TOKEN_KEY)?.value || "" // 쿠키에서 인증 토큰 추출
    let refresh_token: string =
      request.cookies.get(REFRESH_TOKEN_KEY)?.value || "" // 쿠키에서 인증 갱신 토큰 추출
    let isTokenRefreshed: boolean = false // 토큰 갱신여부
    const isInspectTarget: boolean =
      path.indexOf(".") === -1 && !path.startsWith("/_next") // API 또는 페이지 요청인 경우 (정적 파일 제외)

    // 루트 접근 시 메인으로 리다이렉트
    if (path === "/") {
      return NextResponse.redirect(new URL("/main", request.url))
    }

    /**
     * 인증이 필요하지 않은 퍼블릭 페이지 및 라우트 목록
     * ️️주의 ❗ Link 태그의 href 등 컴포넌트의 prefetch 요청도 검사에 포함됨
     */
    const publicRouteList: string[] = [
      "/health-check/:path*",
      "/api/health-check",
      "/api/login-auth",
      // "/api/test",
    ]

    // 비로그인 페이지 퍼블릭 오픈 리스트
    const publicRouteListForNonLogin: string[] = ["/main", "/api/main/:path*"]

    // 인증이 필요한 경로인지 확인
    const isAuthRequired = !publicRouteList.some(
      (route: string) =>
        path === route ||
        (route.endsWith("/:path*") &&
          path.startsWith(route.replace("/:path*", ""))),
    )

    // 비로그인 페이지 퍼블릭 오픈 리스트
    const isPublicRouteForNonLogin = publicRouteListForNonLogin.some(
      (route: string) =>
        path === route ||
        (route.endsWith("/:path*") &&
          path.startsWith(route.replace("/:path*", ""))),
    )

    // 기존 요청헤더로 새로운 헤더 객체 생성
    const requestHeaders = new Headers(request.headers)

    // 인증 필요 시 (비로그인 퍼블릭 페이지 제외)
    if (isInspectTarget && isAuthRequired && !isPublicRouteForNonLogin) {
      if (access_token) {
        // 토큰 존재
        // User-Agent 헤더에서 브라우저 정보 가져오기
        const userAgent = request.headers.get("user-agent") || ""
        const {
          isValid,
          isRefreshed,
          refreshedAccessToken,
          refreshedRefreshToken,
        } = await tokenRefresh(access_token, refresh_token, userAgent)

        if (!isValid) {
          // 유효하지 않은 토큰
          console.log("팅김!", requestType, path)
          if (requestType === "api") {
            // api 라우팅
            return NextResponse.json(
              { message: "Unauthorized API request" },
              { status: 401 },
            )
          } else {
            // 페이지 라우팅
            if (path !== "/login") {
              // 무한 리디렉션 방지
              return NextResponse.redirect(
                new URL("/login?isTokenExpired=yes", request.url),
              )
            }
          }
        }

        if (isRefreshed) {
          // 토큰 갱신시
          isTokenRefreshed = true
          access_token = refreshedAccessToken
          refresh_token = refreshedRefreshToken
        } else {
          const duplicatedLoginCheckResult: boolean =
            await duplicatedLoginCheck(access_token, userAgent)
          console.log("duplicatedLoginCheckResult", duplicatedLoginCheckResult)
          if (duplicatedLoginCheckResult) {
            if (requestType === "api") {
              // api 라우팅
              return NextResponse.json(
                { message: "Unauthorized API request" },
                { status: 303 },
              )
            } else {
              // 페이지 라우팅
              console.log("리다이렉트 처리 request.url: ", request.url)
              console.log(
                "process.env.NEXT_PUBLIC_API_FRONT_BASE_URL: ",
                process.env.NEXT_PUBLIC_API_FRONT_BASE_URL,
              )
              if (path !== "/login") {
                // 무한 리디렉션 방지
                return NextResponse.redirect(
                  new URL("/login?isDuplicatedLogin=yes", request.url),
                )
              }
            }
          }
        }

        // 인증 헤더 추가
        requestHeaders.append("Authorization", `Bearer ${access_token}`)
      } else {
        // 토큰이 없는 경우 로그인 페이지로 리다이렉트
        console.log("팅김!", requestType, path)
        if (requestType === "api") {
          // api 라우팅
          return NextResponse.json(
            { message: "Unauthorized API request" },
            { status: 401 },
          )
        } else {
          // 페이지 라우팅
          if (path !== "/login") {
            // 무한 리디렉션 방지
            return NextResponse.redirect(
              new URL("/login?isTokenExpired=yes", request.url),
            )
          }
        }
      }
    }

    // 비로그인 퍼블릭 페이지 & 토큰 존재
    if (isInspectTarget && isPublicRouteForNonLogin && access_token) {
      // User-Agent 헤더에서 브라우저 정보 가져오기
      const userAgent = request.headers.get("user-agent") || ""
      const {
        isValid,
        isRefreshed,
        refreshedAccessToken,
        refreshedRefreshToken,
      } = await tokenRefresh(access_token, refresh_token, userAgent)

      if (!isValid) {
        // 유효하지 않은 토큰
        console.log("팅김!", requestType, path)
        if (requestType === "api") {
          // api 라우팅
          return NextResponse.json(
            { message: "Unauthorized API request" },
            { status: 401 },
          )
        } else {
          // 페이지 라우팅
          if (path !== "/login") {
            // 무한 리디렉션 방지
            return NextResponse.redirect(
              new URL("/login?isTokenExpired=yes", request.url),
            )
          }
        }
      }

      if (isRefreshed) {
        // 토큰 갱신시
        isTokenRefreshed = true
        access_token = refreshedAccessToken
        refresh_token = refreshedRefreshToken
      } else {
        const duplicatedLoginCheckResult: boolean = await duplicatedLoginCheck(
          access_token,
          userAgent,
        )
        console.log("duplicatedLoginCheckResult", duplicatedLoginCheckResult)
        if (duplicatedLoginCheckResult) {
          if (requestType === "api") {
            // api 라우팅
            return NextResponse.json(
              { message: "Unauthorized API request" },
              { status: 303 },
            )
          } else {
            // 페이지 라우팅
            console.log("리다이렉트 처리 request.url: ", request.url)
            console.log(
              "process.env.NEXT_PUBLIC_API_FRONT_BASE_URL: ",
              process.env.NEXT_PUBLIC_API_FRONT_BASE_URL,
            )
            if (path !== "/login") {
              // 무한 리디렉션 방지
              return NextResponse.redirect(
                new URL("/login?isDuplicatedLogin=yes", request.url),
              )
            }
          }
        }

        // 인증 헤더 추가
        requestHeaders.append("Authorization", `Bearer ${access_token}`)
      }
    }

    // 새로운 Request 객체 생성
    const modifiedRequest = new Request(request.url, {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
      referrer: request.referrer,
      credentials: "same-origin",
    })

    const nextResponse = NextResponse.next({ request: modifiedRequest })

    // 쿠키에 갱신된 토큰 세팅
    if (isTokenRefreshed) {
      const cookieOptions: Partial<ResponseCookie> = {
        httpOnly: true, // 클라이언트에서 접근 불가 (XSS 방지)
        sameSite: "strict", // CSRF 공격 방지
        maxAge: TOKEN_COOKIE_MAX_AGE, // 하루동안 유지
        path: "/", // 모든 경로에서 접근 가능
      }

      nextResponse.cookies.set(ACCESS_TOKEN_KEY, access_token, cookieOptions)
      nextResponse.cookies.set(REFRESH_TOKEN_KEY, refresh_token, cookieOptions)
    }

    return nextResponse
  } catch (e) {
    console.error("미들웨어 오류:", e)
    return NextResponse.json(
      { state: 500, message: "미들웨어 오류 발생" },
      { status: 500 },
    )
  }
}

/**
 * 미들웨어 설정
 * 모든 경로('/:path*')에 대해 미들웨어 실행
 */
export const config = {
  matcher: ["/:path*"],
}
