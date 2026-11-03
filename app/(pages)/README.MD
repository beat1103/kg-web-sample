## Next.js Page 라우터 작성 가이드

### 🚀 라우터 구성이 필요한 상황

- 새로운 페이지 추가
- 동적 라우팅 처리
- 레이아웃 공유

### 📁 디렉토리 구조 및 네이밍 규칙

- 디렉토리명은 소문자 하이픈 만 허용
- 1Depth에 디렉토리 추가시 개발PL/아키텍처 담당자와 논의

```bash
app/
├── (pages)/
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지
│   ├── ability/
│   │   └── page.tsx      # /ability
│   ├── external/
│   │   ├── page.tsx      # /external
│   │   ├── [id]/         # 동적 라우팅
│   │   │   └── page.tsx  # /external/[id]
│   ├── idp/              # idp 라우트
│   │   └── hello/
│   │       └── page.tsx  # /idp/hello
```

### 🔍 주요 컨벤션

1. **파일 명명 규칙**

   - `page.tsx`: 실제 라우트로 사용될 페이지
   - `layout.tsx`: 레이아웃 컴포넌트
   - `loading.tsx`: 로딩 상태 UI
   - `error.tsx`: 에러 처리 UI
   - `route.ts`: API 엔드포인트

2. **동적 라우팅**
   - 단일 세그먼트: `[id]`
   - 전체 세그먼트: `[...slug]`
   - 선택적 세그먼트: `[[...slug]]`

### 🚫 피해야 할 사항

- 일관성 없는 URL 패턴
- 불필요하게 깊은 라우트 구조
- 동적 라우트는 성능에 영향을 줄 수 있으므로 필요한 경우에만 사용

### 💡 예시 코드

```typescript
// app/(pages)/external/[id]/page.tsx
export default async function ExternalPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>External {params.id}</h1>
    </div>
  )
}
```

### 📝 권장 사항

- 의미있는 URL 구조 설계
- 적절한 레이아웃 컴포넌트 활용
- 페이지별 메타데이터 관리
- 성능을 고려한 라우트 그룹핑

## 1Depth 디렉토리별 업무 정보

```bash
app/
├── (pages)/
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 루트 페이지
│   ├── ability/
│   │   └── page.tsx      # /ability (역량진단)
│   ├── external/
│   │   ├── page.tsx      # /external (사외교육과정)
│   ├── idp/
│   │   └── page.tsx      # /idp (IDP 수립)
│   ├── login/
│   │   └── page.tsx      # /login (로그인)
│   ├── main/
│   │   └── page.tsx      # /main (메인)
│   ├── mypage/
│   │   └── page.tsx      # /mypage (마이페이지)
│   ├── notice/
│   │   └── page.tsx      # /notice (새소식)
│   ├── search/
│   │   └── page.tsx      # /search (탐색)
│   ├── social/
│   │   └── page.tsx      # /social (소셜러닝)
│   ├── study/
│   │   └── page.tsx      # /study (학습)
│   ├── subscribe/
│   │   └── page.tsx      # /subscribe (구독)
│   └── support/
│   │   └── page.tsx      # /support (고객센터)
│   └── template/
│       └── page.tsx      # /template (퍼블리싱 파일 전용)
```
