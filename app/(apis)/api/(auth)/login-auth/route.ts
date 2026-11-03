import { NextResponse } from "next/server"
import { nextErrorResponse } from "@/lib/manager/api-back-error-manager"
import { apiBackClient } from "@/lib/manager/api-back-client-manager"

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_COOKIE_MAX_AGE,
} from "@/constants/auth-constants"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

/**
 * POST 로그인 인증
 * @param request
 * @constructor
 */
export async function POST(request: Request) {
  try {
    console.log("login-auth [POST] REQ >>>>>>>>>>>>>>>> ", request)
    const headers = request.headers
    const body = await request.json()

    const response = await apiBackClient(
      request.method,
      `/fo/api/v1/security/login`,
      headers,
      body,
    )
    console.log("login-auth [POST] RES  >>>>>>>>>>>>>>>> ", response)

    const nextResponse = NextResponse.json(response)

    if (response.state === "201") {
      const access_token = response.result.requestbox.access_token
      const refresh_token = response.result.requestbox.refresh_token

      // 토큰 쿠키 세팅
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
  } catch (error) {
    console.error("login-auth [ERROR] >>>>>>>>>>>>>>>>", error)
    return nextErrorResponse(error)
  }
}
