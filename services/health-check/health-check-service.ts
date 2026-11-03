import { apiBackClient } from "@/lib/manager/api-back-client-manager"
import { apiFrontClient } from "@/lib/manager/api-front-client-manager"

// Backend Api Base Url
const NEXT_PUBLIC_API_BACK_BASE_URL =
  process.env.NEXT_PUBLIC_API_BACK_BASE_URL || "http://localhost:8081"

/**
 * Backend Get 헬스 체크 서비스
 * (테스트용)
 */
export const fetchBackendGet = async (url: string, body: { msg: string }) => {
  const headers = new Headers({
    Accept: "application/json",
  })
  const queryParam = `?${new URLSearchParams(body).toString()}`

  return await apiBackClient("GET", url, headers, queryParam)
}

/**
 * Backend Post 헬스 체크 서비스
 * (테스트용)
 */
export const fetchBackendPost = async (url: string, body: { msg: string }) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  })

  return await apiBackClient("POST", url, headers, body)
}

/**
 * Get 헬스 체크 서비스
 *
 */
export const fetchNextGet = async (url: string) => {
  const response = await apiFrontClient("GET", url, {})
  return response
}

/**
 * Post 헬스 체크 서비스
 *
 */
export const fetchNextPost = async (url: string, body: { msg: string }) => {
  const response = await apiFrontClient("POST", url, body)
  return response
}
