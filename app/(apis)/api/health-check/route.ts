import { NextResponse } from "next/server"
import { apiBackClient } from "@/lib/manager/api-back-client-manager"
import { nextErrorResponse } from "@/lib/manager/api-back-error-manager"

export async function GET(request: Request) {
  try {
    console.log("GET 요청 request:", request)
    const headers = request.headers
    const queryParam = new URL(request.url).search as string

    const response = await apiBackClient(request.method, `/fo/api/v1/start/healthCheck`, headers, queryParam)

    console.log("######################################")
    console.log("GET 요청 response:", response)
    console.log("######################################")

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: `서비스에 문제가 발생했습니다. ${error}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log("POST 요청 request:", request)
    const headers = request.headers
    const body = await request.json()

    const response = await apiBackClient(request.method, `/fo/api/v1/start/healthCheck`, headers, body)

    console.log("######################################")
    console.log("response", response)
    console.log("######################################")

    // response 객체에서 필요한 데이터만 추출하여 반환
    return NextResponse.json(response)
  } catch (error) {
    console.error("헬스체크 에러:", error)
    return nextErrorResponse(error)
  }
}
