## Next.js API 라우터 작성 가이드

### 🚀 API 라우터 구성

- 외부 API 연동을 위한 중계 서버 역할
- 데이터 처리 및 변환
- 인증/인가 처리 (미들웨어 공통 처리)
- 서버 사이드 로직 구현

### 📁 디렉토리 구조

```bash
app/
├── (apis)/
│   ├── api/
│   │   ├── (auth)/
│   │   │   └── user-me/
│   │   │       └── route.ts     # /api/user-me
│   │   ├── users/
│   │   │   └── route.ts         # /api/users
```

### 🔍 공통 유틸리티

1. **apiBackClient**
   - 백엔드 API 호출을 위한 공통 클라이언트
   - 사용법: `apiBackClient(method, endpoint, headers, body)`
   - 인증 토큰 및 공통 헤더 자동 처리
2. **nextErrorResponse**
   - 에러 응답 처리를 위한 공통 유틸리티
   - 백엔드 에러 응답을 클라이언트 형식으로 변환
   - 일관된 에러 포맷 유지

### 💡 라우트 핸들러 예시

```typescript
import { NextResponse } from "next/server"
import { nextErrorResponse } from "@/lib/manager/api-back-error-manager"
import { apiBackClient } from "@/lib/manager/api-back-client-manager"

export async function GET(request: Request) {
  try {
    const headers = request.headers
    const queryParam = new URL(request.url).search as string

    const response = await apiBackClient(
      request.method,
      `/fo/api/v1/user/edu/me`,
      headers, 
      queryParam,
    )

    return NextResponse.json(response)
  } catch (error) {
    return nextErrorResponse(error)
  }
}
```

### 📝 주요 컨벤션

1. **에러 처리**

   - try-catch 구문으로 모든 핸들러 래핑
   - nextErrorResponse 사용하여 일관된 에러 처리
   - 에러 로깅 필수

2. **API 클라이언트 사용**

   - apiBackClient 사용하여 백엔드 통신
   - 메서드, 엔드포인트, 헤더, 바디 순서로 파라미터 전달
   - 응답은 NextResponse.json()으로 래핑

3. **로깅**
   - 요청/응답 로깅
   - 에러 상황 상세 로깅
   - 운영 환경 디버깅을 위한 충분한 정보 포함

### ⚠️ 주의사항

- GET 요청시에도 body 파싱 주의
- 적절한 에러 처리와 로깅
- 보안 헤더 처리
- 응답 데이터 검증
