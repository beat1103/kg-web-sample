import { apiBackClient } from "@/lib/manager/api-back-client-manager"

/**
 * 토큰 만료시간 확인 및 갱신
 * @param accessToken  기존 토큰
 * @param refreshToken  기존 갱신토큰
 */
export const tokenRefresh = async (accessToken: string, refreshToken: string, userAgent: string) => {
  let isValid: boolean = true  // 유효여부
  let isRefreshed: boolean = false  // 갱신여부
  const remainingExpTime: number = getRemainingExpTime(accessToken)  // 토큰 만료시간
  const remainingRefreshExpTime: number = getRemainingExpTime(refreshToken)  // 토큰 만료시간

  if (remainingExpTime < 1800) {  // 토큰 만료 시간이 30분 이하로 남은 경우 토큰 갱신
    if (remainingRefreshExpTime < 4) {  // 갱신 토큰 만료 시간이 3초 이내이면 갱신안함
      isValid = false
      return { isValid, isRefreshed, refreshedAccessToken: accessToken, refreshedRefreshToken: refreshToken }
    }

    const headers = new Headers()
    headers.append("Authorization", `Bearer ${refreshToken}`)
    headers.append("Content-Type", "application/json")
    const response = await apiBackClient("POST", `/fo/api/v1/public/edu/login/tokenRefresh`, headers, { userAgent })
    const refreshedAccessToken = response.result?.requestbox?.accessToken  // 갱신된 토큰
    const refreshedRefreshToken = response.result?.requestbox?.refreshToken  // 갱신된 갱신토큰
    isRefreshed = true
    return { isValid, isRefreshed, refreshedAccessToken, refreshedRefreshToken }
  }

  return { isValid, isRefreshed, refreshedAccessToken: accessToken, refreshedRefreshToken: refreshToken }
}

/**
 * 토큰 만료시간 계산
 * @param token
 */
export const getRemainingExpTime = (token?: string | null) => {
  try {
    if (!token) {
      return 0
    }

    const base64 = token.split(/\./)[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )

    const payload = JSON.parse(jsonPayload)

    return payload.exp - Math.ceil(new Date().getTime() / 1000)
  } catch (e) {
    console.error(`getRemainingExpTime >>>\n`, e)
    return 0
  }
}

/**
 * 중복 로그인 검사
 * @param accessToken
 * @param refreshToken
 */
export const duplicatedLoginCheck = async (accessToken: string, userAgent: string) => {
  const headers = new Headers()
  headers.append("Authorization", `Bearer ${accessToken}`)
  headers.append("Content-Type", `application/json; charset=UTF-8`)
  const response = await apiBackClient("POST", `/fo/api/v1/public/edu/login/duplicatedLoginCheck`, headers, {
    "userAgent": userAgent,
  })
  return response.result?.duplicatedLoginCheck
}