const NEXT_PUBLIC_API_BACK_BASE_URL =
  process.env.NEXT_PUBLIC_API_BACK_BASE_URL ||
  "https://dev-st-api.firzzle.co.kr:8443"

/**
 * 스탠다드 API 호출 클라이언트
 * @param method 메서드
 * @param endpoint path
 * @param headers 헤더
 * @param body 바디
 */
export const apiBackClient = async (
  method: string,
  endpoint: string,
  headers: Headers,
  body: object | string | FormData,
) => {
  // Header 재정의
  if (body instanceof FormData) {
    headers = new Headers({
      Authorization: headers.get("Authorization") || "",
      Accept: "application/json",
      // Content-Type은 브라우저가 자동으로 설정하도록 제외
    })
  } else {
    // 그대로 사용
  }

  const requestConfig: RequestInit = {
    method,
    headers,
  }

  let apiUrl = NEXT_PUBLIC_API_BACK_BASE_URL + endpoint
  if (method === "GET" && typeof body === "string") {
    apiUrl += body
  } else {
    if (body instanceof FormData) {
      requestConfig.body = body
    } else {
      requestConfig.body = JSON.stringify(body)
    }
  }

  const response = await fetch(apiUrl, requestConfig)
  console.log("back res: ", response)

  return response.json()
}

/**
 * 외부 API 호출 클라이언트
 * @param method 메서드
 * @param url 요청 API
 * @param headers 헤더
 * @param body 바디
 */
export const apiExternalClient = async (
  method: string,
  url: string,
  headers: Headers,
  body: object | string,
) => {
  const requestConfig: RequestInit = {
    method,
    headers,
  }

  let apiUrl = url
  if (method === "GET" && typeof body === "string") {
    apiUrl += body
  } else {
    requestConfig["body"] = JSON.stringify(body)
  }

  const response = await fetch(apiUrl, requestConfig)
  console.log("external res: ", response)

  return response.json()
}
