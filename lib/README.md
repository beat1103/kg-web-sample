## 전역 라이브러리 작성 가이드

### 🎯 라이브러리 구성

#### 1. Manager

- 전역적으로 사용되는 공통 로직을 처리하는 함수
- 특정 도메인에 종속되지 않는 범용적인 기능

예시:

```typescript
// 사용자 정보 조회
const getUserInfo = async (userId: string) => {
  // 사용자 정보 처리 로직
  return userInfo
}

// 사용자 정보 업데이트
const updateUserInfo = async (userId: string, data: UserData) => {
  // 사용자 정보 업데이트 로직
  return result
}
```

#### 2. Util

- 공통으로 사용되는 순수 함수들
- 상태를 가지지 않는 함수
- 특정 도메인에 종속되지 않는 범용적인 기능

예시:

```typescript
export const formatNumber = (
  target: number | string | undefined = "",
  delimiter: string = ",",
  fractionDigit: number = 3,
): string => {
  // 숫자 형태 포매팅
  return String(target)
}

const calculateDaysBetween = (start: Date, end: Date): number => {
  // 날짜 차이 계산 로직
  return daysDifference
}
```

### 📁 디렉토리 구조

```bash
├── lib/
│   ├── manager/
│   │   ├── user/
│   │   │   ├── user-manager.ts
│   │   │   ├── auth-manager.ts
│   │   ├── common/
│   │   │   ├── storage-manager.ts
│   ├── utils/
│   │   ├── date-util.ts
│   │   │── string-util.ts
```

### 🚫 피해야 할 사항

- Manager와 Util의 역할 혼용
- 불필요한 의존성 주입
- 과도한 책임 부여

### 💡 작성 규칙

#### Manager

- 파일명 : `명사 + -manager`
- 함수명 : camelCase

#### Util

- 파일명 : `명사 + -util`
- 함수명 : camelCase
- 순수 함수로 구현
- 외부 의존성 최소화

### ⚠️ 예외 파일

- `/utils.ts`: shardcn/ui 참조 파일 (이동 및 수정 금지)
- `/manager/api-**.ts`: API 호출 래퍼 파일 (담당자 외 이동 및 수정 금지)
