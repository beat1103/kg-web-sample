import { _UNASSIGNED_ } from "@/constants/common-constants"

/**
 * _UNASSIGNED_ 값을 공백으로 치환
 * @param body 최초 파라미터
 * @param seen 순환 참조 방지를 위한 WeakSet
 * @returns 치환된 파라미터
 */
export const replaceUnassigned = (body: any, seen = new WeakSet()): any => {
  if (body === null || typeof body !== "object") {
    return body === _UNASSIGNED_ ? "" : body
  }

  if (seen.has(body)) {  // 순환 참조 방지
    return body
  } else {
    seen.add(body)
  }

  if (Array.isArray(body)) {
    return body.map((item) => replaceUnassigned(item, seen))
  }

  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [
      key,
      replaceUnassigned(value, seen),
    ]),
  )
}

/**
 * 프론트 서버 호출 클라이언트
 * @param method 메서드
 * @param endpoint path
 * @param body 바디
 */
export const apiFrontClient = async (
  method: string,
  endpoint: string,
  body?: any,
) => {
  // Header 정의
  const headers: Record<string, string> = {}
  if (body instanceof FormData) {
    headers["Accept"] = "application/json"
    // Content-Type은 브라우저가 자동으로 설정하도록 제외
  } else {
    headers["Accept"] = "application/json"
    headers["Content-Type"] = "application/json"
  }

  const requestConfig: RequestInit = {
    method,
    headers,
  }

  let apiUrl = endpoint

  try {
    if (method === "GET") {
      // 공백으로 치환
      body = replaceUnassigned(body)
      apiUrl += `?${new URLSearchParams(body).toString()}`
    } else {
      if (body instanceof FormData) {
        requestConfig.body = body
      } else {
        // 공백으로 치환
        body = replaceUnassigned(body)
        requestConfig.body = JSON.stringify(body)
      }
    }

    const response = await fetch(apiUrl, requestConfig)

    const status = response.status

    if (!response.ok) {
      if (status === 303) {
        // 중복로그인 처리
        console.log("api-front-client-manager response : ", response)
        window.location.href = "/login?isDuplicatedLogin=yes"
      }
      if (status === 401) {
        // 인증토큰 없음
        window.location.href = "/login?isTokenExpired=yes"
      }
      if (status === 404) {
        // 잘못된 경로
        window.location.href = "/404"
      } else if (status === 500) {
        // 서버 에러
        // todo 500에러 화면 이동
      }
    }

    return await response.json()
  } catch (e) {
    console.error("프론트 서버 호출 중 오류 발생: ", e)
    // todo 500에러 화면 이동
  }
}
