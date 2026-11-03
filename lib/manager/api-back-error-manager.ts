import { NextResponse } from "next/server"

interface ErrorResponse {
  data: any
  status: number
  headers?: any
}

const handleApiError = (error: any, context: string = ""): ErrorResponse => {
  if (error.response) {
    console.error(`[${context}] 요청 실패`, {
      status: error.response.status,
      message: error.message,
    })

    return {
      data: error.response.data ?? { message: "서버 오류가 발생했습니다" },
      status: error.response.status ?? 500,
      headers: error.response.headers,
    }
  }

  return {
    data: { message: "서버 오류가 발생했습니다" },
    status: 500,
    headers: {},
  }
}

export const nextErrorResponse = (error: any) => {
  const errorResponse = handleApiError(error, error.message)
  return NextResponse.json(errorResponse.data, {
    status: errorResponse.status,
    headers: errorResponse.headers,
  })
}
