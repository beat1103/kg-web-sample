# API 요청 클라이언트. FETCH 함수 사용
> 백엔드 서버 API 직접 호출하지 않음. 프론트 서버(NEXT) API 호출하여 서버간 통신

### 1. apiFrontClient: 클라이언트 -> 프론트서버
샘플코드
```typescript
const loginReq = {
  p_login_id: userName,
  p_pwd: password,
}

const response = await apiFrontClient(
  "POST",
  "/api/login-auth",
  loginReq,
)
```

### 2. apiBackClient: 프론트서버 -> 백엔드서버 (외부 API)
샘플코드
```typescript
export async function POST(request: Request) {
  try {
    const headers = request.headers
    const body = await request.json()

    const response = await apiBackClient(
      request.method,
      `/fo/api/v1/public/edu/login/loginAuth`,
      headers,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    console.error("ERROR ROUTE login-auth:", error)
    return nextErrorResponse(error)
  }
}

```


 
