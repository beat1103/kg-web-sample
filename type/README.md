## 타입 작성 가이드

### 🎯 타입 정의가 필요한 상황

- API 요청/응답 데이터 구조화
- 공통 인터페이스 정의
- 비즈니스 모델 타입 정의
- 재사용 가능한 유틸리티 타입
- 상수 값들의 타입 안정성 확보 (enum)

### 🚫 사용을 피해야 할 경우

- 불필요하게 복잡한 타입 정의
- 중복되는 타입 선언
- 과도한 타입 세분화

### 파일 명명 및 디렉토리 규칙

- 도메인(업무) 기준으로 타입 모듈화 (ex. user, auth, subj 등)
- 파일명은 해당 도메인의 타입을 명확히 설명
- 네이밍 컨벤션:
  - 일반 타입: -type.ts
  - 열거형: -enum.ts
  - 또는 도메인별로 통합하여 관리

```bash
├── types/
│   ├── user/
│   │   ├── user-type.ts
│   │   ├── profile-type.ts
│   │   ├── user-enum.ts     # 유저 관련 enum 모음
│   ├── common/
│   │   ├── response-type.ts
│   │   ├── common-enum.ts   # 공통 enum 모음
```

## 타입 명명 규칙
- API 통신 시 
  - 요청 타입: 도메인 + Req 접미사
  - 응답 타입: 도메인 + Res 접미사

### 💡 샘플 코드

```typescript
interface SampleReq {
  p_param_01: string
  p_param_02: string
}

type SampleRes = {
  d_data_01: string
  d_data_02: string
}

enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export type { SampleReq, SampleRes }
export { StatusEnum }
```

### 📝 enum 사용 가이드

- 상태값, 타입 코드 등 고정된 값들을 관리할 때 사용
- 문자열 enum 사용 권장 (디버깅 용이)
- 네이밍: 명사 + Enum 형식 권장 (예: StatusEnum, RoleEnum)
